import { getCDSFromOData } from '../util/xml-tool';
import * as fs from 'fs';
import * as path from 'path';

function updateCds() {

    let xmlFiles: string[] = [];
    getAllFiles(path.join(__dirname,"..","..","test","xml"), xmlFiles);

    xmlFiles.forEach(xmlFile => {
        getCDSFromOData(xmlFile, true);
    });
}

function getAllFiles(dirPath: string, arrayOfFiles: string[]) {
    const files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || []
    files.forEach(function (file) {
        if (fs.statSync(dirPath + path.sep + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + path.sep + file, arrayOfFiles);
        } else {
            if (file.endsWith(".xml")) {
                arrayOfFiles.push(path.join(dirPath, path.sep, file));
            }
        }
    })
    return arrayOfFiles
}
updateCds();
