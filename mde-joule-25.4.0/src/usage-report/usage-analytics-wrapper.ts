import { BASClientFactory, BASTelemetryClient, initTelemetrySettings } from "@sap/swa-for-sapbas-vsx";
import * as path from "path";
import type { ExtensionContext } from "vscode";
import { getLogger } from '@sap/gai-core';


/**
 * A Simple Wrapper for reporting usage analytics
 */
export class AnalyticsWrapper {
  private static readonly EVENT_TYPES = {
    GENERATE_MDK_ACTION: "Start Generating MDK Action",
    GENERATE_MDK_ACTON_SUCCESS: "MDK Action Generation Successful",
    GENERATE_MDK_ACTION_FAIL: "MDK Action Generation Failed",
    GENERATE_MDK_PAGE: "Start Generating MDK Page",
    GENERATE_MDK_PAGE_SUCCESS: "MDK Page Generation Successful",
    GENERATE_MDK_PAGE_FAIL: "MDK Page Generation Failed",
    GENERATE_MDK_I18N: "Start Generating MDK i18n",
    GENERATE_MDK_I18N_SUCCESS: "MDK i18n Generation Successful",
    GENERATE_MDK_I18N_FAIL: "MDK i18n Generation Failed",
    GET_JSON_FAILED: "Failed to get JSON"
  };

  private static startTime: number = Date.now();

  /**
   * Note the use of a getter function so the value would be lazy resolved on each use.
   * This enables concise and simple consumption of the tracker throughout our Extension.
   *
   * @returns { Tracker }
   */
  public static getTracker(): BASTelemetryClient {
    return BASClientFactory.getBASTelemetryClient();
  }

  public static createTracker(context: ExtensionContext): void {
    try {
      const packageJson = require(path.join(context.extensionPath, "package.json"));
      const vscodeExtentionFullName = `${packageJson.publisher}.${packageJson.name}`;
      initTelemetrySettings(vscodeExtentionFullName, packageJson.version);
      getLogger().info(`SAP Web Analytics tracker was created for ${vscodeExtentionFullName}`);
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }

  private static report(opt: { eventName: string; properties?: any }): void {
    // We want to report only if we are not in Local VSCode environment
    const eventName = opt.eventName;
    if (process.env.LANDSCAPE_ENVIRONMENT) {
      void AnalyticsWrapper.getTracker().report(opt.eventName, opt.properties);
      getLogger().info(`SAP Web Analytics tracker was called for ${eventName}`);
      
    } else {
      getLogger().info("SAP Web Analytics tracker was not called because LANDSCAPE_ENVIRONMENT is not set");
    }
  }

  public static GenerateMDKAction(): void {
    try {
      const eventName = AnalyticsWrapper.EVENT_TYPES.GENERATE_MDK_ACTION;
      AnalyticsWrapper.startTime = Date.now();
      //const properties = { actionType };
      AnalyticsWrapper.report({ eventName });
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }

  public static GenerateMDKActionSuccess(): void {
    try {
      const eventName = AnalyticsWrapper.EVENT_TYPES.GENERATE_MDK_ACTON_SUCCESS;
      AnalyticsWrapper.startTime = Date.now();
      //const properties = { projectInfo };
      AnalyticsWrapper.report({ eventName});
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }

  public static GenerateMDKActionFailed(errorMessage: any): void {
    try {
      const eventName = AnalyticsWrapper.EVENT_TYPES.GENERATE_MDK_ACTION_FAIL;
      AnalyticsWrapper.startTime = Date.now();
      const properties = { errorMessage};
      AnalyticsWrapper.report({ eventName, properties});
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }

  public static GenerateMDKPage(): void {
    try {
      const eventName = AnalyticsWrapper.EVENT_TYPES.GENERATE_MDK_PAGE;
      AnalyticsWrapper.startTime = Date.now();
      //const properties = { pageType };
      AnalyticsWrapper.report({ eventName });
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }

  public static GenerateMDKPageSuccess(): void {
    try {
      const eventName = AnalyticsWrapper.EVENT_TYPES.GENERATE_MDK_PAGE_SUCCESS;
      AnalyticsWrapper.startTime = Date.now();
      //const properties = { projectInfo };
      AnalyticsWrapper.report({ eventName});
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }

  public static GenerateMDKPageFailed(errorMessage: any): void {
    try {
      const eventName = AnalyticsWrapper.EVENT_TYPES.GENERATE_MDK_PAGE_FAIL;
      AnalyticsWrapper.startTime = Date.now();
      const properties = { errorMessage};
      AnalyticsWrapper.report({ eventName, properties});
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }

  public static NewMDKI18n(): void {
    try {
      const eventName = AnalyticsWrapper.EVENT_TYPES.GENERATE_MDK_I18N;
      AnalyticsWrapper.startTime = Date.now();
      AnalyticsWrapper.report({ eventName });
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }

  public static NewMDKI18nSuccess(): void {
    try {
      const eventName = AnalyticsWrapper.EVENT_TYPES.GENERATE_MDK_I18N_SUCCESS;
      AnalyticsWrapper.startTime = Date.now();
      AnalyticsWrapper.report({ eventName });
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }

  public static NewMDKI18nFailed(errorMessage: any): void {
    try {
      const eventName = AnalyticsWrapper.EVENT_TYPES.GENERATE_MDK_I18N_FAIL;
      AnalyticsWrapper.startTime = Date.now();
      const properties = { errorMessage};
      AnalyticsWrapper.report({ eventName, properties});
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }

  public static FailedToGetJson(errorMessage: any): void {
    try {
      const eventName = AnalyticsWrapper.EVENT_TYPES.GET_JSON_FAILED;
      AnalyticsWrapper.startTime = Date.now();
      const properties = { errorMessage};
      AnalyticsWrapper.report({ eventName, properties});
    } catch (error) {
      console.error(error);
      getLogger().error((error as Error).message);
    }
  }
}
