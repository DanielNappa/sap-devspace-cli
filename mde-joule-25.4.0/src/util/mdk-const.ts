import * as path from 'path';

const MDKConst = {
    MDK_RULE_FOLDER : `Rules`,
    MDK_PAGE_FOLDER : `Pages`,
    MDK_ACTION_FOLDER: "Actions",
    MDK_SERVICE_FOLDER : `Services`,
    MDK_I18N_FOLDER: "i18n",
    MDK_APP_FILE : "Application.app",
    MDK_API_FILE: `IClientAPI.d.ts`,
    MDK_SERVICE_METADATA_FILE: ".service.metadata",
    MDK_XML:  "Service.Xml",
    MDK_EXAMPLE_CREATEENTITY_ACTION: "CreateODataEntity.md",
    MDK_EXAMPLE_CREATEMEDIA_ACTION: "CreateODataMedia.md",
    MDK_EXAMPLE_DELETEENTITY_ACTION: "DeleteODataEntity.md",
    MDK_EXAMPLE_DOWNLOADOFFLINE_ACTION: "DownloadOfflineOData.md",
    MDK_EXAMPLE_INITIALIZEOFFLINE_ACTION: "InitializeOfflineOData.md",
    MDK_EXAMPLE_UPDATEENTITY_ACTION: "UpdateODataEntity.md",
    MDK_EXAMPLE_UPLOADOFFLINE_ACTION: "UploadOfflineOData.md",
    MDK_BASE_FOLDER: ".base"
}

export const I18nFilePerformType = {
    Overwrite: "Overwrite",
    Merge: "Merge"
};

export default MDKConst;