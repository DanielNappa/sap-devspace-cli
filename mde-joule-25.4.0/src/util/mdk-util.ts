import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as os from "os";
import  MDKConst  from './mdk-const';
import exp = require('constants');
import glob = require('glob');
import { getLogger } from '@sap/gai-core';
import { execSync } from 'child_process';

export function getAllFiles(dirPath: string, arrayOfFiles: string[]) {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach(function (file) {
      if (fs.statSync(dirPath + path.sep + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + path.sep + file, arrayOfFiles);
      } else {
          arrayOfFiles.push(path.join(dirPath, path.sep, file));
      }
  })
  return arrayOfFiles;
}

export function writeFileSync(filePath: string, content: string): boolean {
  try {
    const parentDir = path.dirname(filePath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  } catch (err) {
    console.error(err);
    getLogger().error((err as Error).message);
    return false;
  }
}

export function isMDKRule(filePath: string): boolean {
  const MDK_RULE_FOLDER = `${path.sep}${MDKConst.MDK_RULE_FOLDER}${path.sep}`;
  if (filePath.endsWith(".js") && filePath.includes(MDK_RULE_FOLDER)) {
    const mdkAppFile =path.join(filePath.substring(0, filePath.indexOf(MDK_RULE_FOLDER)), MDKConst.MDK_APP_FILE);
    return fs.existsSync(mdkAppFile);
  } 
  return false;
}

export function isMDKPage(filePath: string): boolean {
  const MDK_PAGE_FOLDER = `${path.sep}${MDKConst.MDK_PAGE_FOLDER}${path.sep}`;
  if (filePath.endsWith(".page") && filePath.includes(MDK_PAGE_FOLDER)) {
    const mdkAppFile =path.join(filePath.substring(0, filePath.indexOf(MDK_PAGE_FOLDER)), MDKConst.MDK_APP_FILE);
    return fs.existsSync(mdkAppFile);
  } 
  return false;
}


export function getMDKServiceName(prjPath: string): string {
    const files = fs.readdirSync(path.join(prjPath, MDKConst.MDK_SERVICE_FOLDER));
    const srvFiles: string[] =  [];
      
    files.forEach(function(file) {
      if (file.endsWith(".service")) {
        srvFiles.push(file);
      }
    });

    if (srvFiles.length==0) {
      return "";
    } else if (srvFiles.length>1) {
      console.warn("Currently, only support 1 service.");
    }
    return srvFiles[0];
}


export function getMDKXmlName(srvName: string): string {
  const xmlName = `.${srvName.substring(0,srvName.lastIndexOf("."))}.xml`;
  return xmlName;
}

export function getMDKApplicationJson(filePath: string): any {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch(err) {
    console.error(err);
    getLogger().error((err as Error).message);
  }
  return {};
}

export function geServiceMetadataJson(filePath: string): any {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch(err) {
    console.error(err);
    getLogger().error((err as Error).message);
  }
  return null;
}

export function getResourceFileContent(fileName:string): string{
  return fs.readFileSync(path.join(__dirname, "..","..", "res",fileName)).toString();
}

export function getRelateXMLContent(filePath: string, context?:string): string {
  const content = fs.readFileSync(filePath).toString();
  if (!context) {
    return content;
  }
  return "";
}

export function getRelateClientApiContent(filePath: string, context?:string): string {
  const content = fs.readFileSync(filePath).toString();
  if (!context) {
    return content;
  }
  return "";
}

export function getRelateSchemaContent(filePath: string, context?:string): string {
  const content = fs.readFileSync(filePath).toString();
  if (!context) {
    return content;
  }
  return "";
}

export function getChildrenFullPathsSync(folderFullPath: string): string[] {
  let allSubFileFullPaths: string[] = [];
  try {
    if (fs.existsSync(folderFullPath)) {
      let childrenNames = fs.readdirSync(folderFullPath);
      childrenNames.forEach(childName => {
        let childFullPath = path.join(folderFullPath, childName);
        let isFolder = isFolderSync(childFullPath);
        if (isFolder) {
          allSubFileFullPaths = allSubFileFullPaths.concat(getChildrenFullPathsSync(childFullPath));
        } else {
          allSubFileFullPaths.push(childFullPath);
        }
      });
    }
  } catch (error) {
    console.log(error);
    getLogger().error((error as Error).message);
  }
  return allSubFileFullPaths;
}

export function isFolderSync(fullPath: string): boolean {
  try {
    return fs.lstatSync(fullPath).isDirectory();
  } catch (error) {
    console.log(error);
    getLogger().error((error as Error).message);
    return false;
  }
}

export function getTempFolder(rootPath: string) {
  const jouleTempFolder = path.join(os.tmpdir(), 'mde_joule');
  if (!fs.existsSync(jouleTempFolder)) {
      fs.mkdirSync(jouleTempFolder);
  }

  const projectName = path.basename(rootPath);
  const tempFolder = path.join(jouleTempFolder, projectName);
  if (fs.existsSync(tempFolder)) {
      fs.rmdirSync(tempFolder, { recursive: true });
  }
  fs.mkdirSync(tempFolder);
  return tempFolder;
}

export function normalizeVariableValue(projectPath: string, values: string[]): string[] {
  return values.reduce((acc: string[], value: string) => {
    // if (value && !acc.find((v: string) => path.resolve(projectPath, v) === path.resolve(projectPath, value))) {
    //   acc.push(value);
    // }
    if (value) {
      const relativePath = path.relative(projectPath, value);
      if (!acc.find((v: string) => v === value)) {
        acc.push(relativePath);
      }
    }
    return acc;
  }, []);
}

export function getServiceFilePaths(projectPath: string): string[] {
  return getMatchedFiles(projectPath, "**/Services/**/*.service");
}

export function getMatchedFiles(folderFullPath: string, include: string): string[] {
  let allSubFileFullPaths: string[] = [];
  if (folderFullPath) {
    try {
      if (fs.existsSync(folderFullPath)) {
        let pattern = path.join(folderFullPath, include);
        let files = glob.sync(pattern, {
          ignore: ['**/.*', '**/WebApplicationFactory/**', '**/Web/**', '**/node_modules/**']
        });
        allSubFileFullPaths = allSubFileFullPaths.concat(files);
      }
    } catch (error) {
      console.log(error);
      getLogger().error((error as Error).message);
    }
  }
  
  return allSubFileFullPaths;
}

export async function getMDKToolsPath(): Promise<string> {
  let ret = "";
  try {
    ret = await vscode.commands.executeCommand('mdk.getTool');
  } catch (error) {
    console.error(error);
    getLogger().error((error as Error).message);
  }
  return ret;
}

const MDK_GEN_PKG_NAMES = {
  REL: '@ext-mdkvsc-npm-rel/mdk',
  DEV: '@ext-mdkvsc-npm-dev/mdk'
};

export function findFirstMdkGenerator() {
  try {
    let ret = execSync("yo --generators").toString();
    if (ret) {
      let generatorName = ret.split("\n").find((line: string) => line.trim() === MDK_GEN_PKG_NAMES.DEV);
      if (!generatorName) {
        generatorName = ret.split("\n").find((line: string) => line.trim() === MDK_GEN_PKG_NAMES.REL);
      }
      if (generatorName) {
        generatorName.trim();
      }
      return generatorName;
    }
    return MDK_GEN_PKG_NAMES.DEV;
  } catch (error) {
    console.error(error);
    getLogger().error((error as Error).message);
  }
}