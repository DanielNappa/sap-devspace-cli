import * as fs from 'fs';
import * as path from 'path';
import { AbstractAct, ActResult, IActParams, IElf, IGenieSession, elfHost } from '@sap/gai-core';
import { I18nFilePerformType } from '../util/mdk-const';
import { getChildrenFullPathsSync } from '../util/mdk-util';

export class CopyI18nFileContentActParams implements IActParams {
  constructor(
    public response: string,
    public perform: string,
    public src: string,
    public dest: string
  ) { }
}

export class CopyI18nFileContentAct extends AbstractAct {
  constructor(elf: IElf) {
    super(elf);
  }

  public getName(): string {
    return 'copyI18nFileContent';
  }

  public async act(session: IGenieSession, params: CopyI18nFileContentActParams): Promise<ActResult> {
    const prompt = `Copy i18n file content from ${params.src} to ${params.dest}`;
    let response = 'Copying completed successful';
    let status = 200;

    if (!fs.existsSync(params.dest)) {
      response = `Cannot find the destination folder ${params.dest}`;
      status = 0;
    } else {
      if (params.perform === I18nFilePerformType.Overwrite) {
        // overwrite files
        const fileElf = elfHost.getElf('file');
        if (fileElf) {
          const copyFolderAct = fileElf.getAct('copyFolder');
          if (copyFolderAct) {
            const copyResult = await copyFolderAct.act(session, {
              response: params.response,
              src: params.src,
              dest: params.dest
            } as IActParams);
            if (!copyResult) {
              response = `Failed to copy i18n file from ${params.src} to ${params.dest}`;
              status = 0;
            }
          } else {
            response = 'Cannot find the copyFolder act';
            status = 0;
          }
        } else {
          response = 'Cannot find the file elf';
          status = 0;
        }
      } else if (params.perform === I18nFilePerformType.Merge) {
        // merge files
        const mergeFolderRst = this.merge(params);
        if (!mergeFolderRst) {
          response = `Failed to merge i18n file from ${params.src} to ${params.dest}`;
          status = 0;
        }
      }
    }

    return {
      prompt: prompt,
      response: response,
      status: status
    }
  }

  private merge(params: CopyI18nFileContentActParams): Boolean {
    try {
      const srcFilesFullPaths = getChildrenFullPathsSync(params.src);
      srcFilesFullPaths.forEach(fileFullPath => {
        const relativePath = path.relative(params.src, fileFullPath);
        const destFullPath = path.join(params.dest, relativePath);
        if (fs.existsSync(destFullPath)) {
          // merge the content
          const srcContent = fs.readFileSync(fileFullPath, "utf8");
          const destContent = fs.readFileSync(destFullPath, "utf8");
          const mergedContent = this.mergeContent(srcContent, destContent);
          fs.writeFileSync(destFullPath, mergedContent);
        } else {
          // copy the file
          fs.copyFileSync(fileFullPath, destFullPath);
        }
      });
    } catch (error) {
      console.log(error);
      return false;
    }    

    return true;
  }

  private mergeContent(srcContent: string, destContent: string): string {
    // Helper function to parse key=value pairs into an object
    const parseKeyValuePairs = (content: string): Record<string, string> => {
      return content.split('\n').reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) {
          acc[key.trim()] = value.trim();
        }
        return acc;
      }, {} as Record<string, string>);
    };
  
    // Helper function to convert an object back to key=value pairs
    const convertToKeyValuePairs = (obj: Record<string, string>): string => {
      return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('\n');
    };
  
    // Parse the key=value pairs from source and destination
    const srcObj = parseKeyValuePairs(srcContent);
    const destObj = parseKeyValuePairs(destContent);
  
    // Merge the objects
    const mergedObj = { ...destObj, ...srcObj };
  
    // Convert the merged object back to key=value pairs
    return convertToKeyValuePairs(mergedObj);
  }
}