'use strict';

import * as vscode from 'vscode';

import {I18nTranslateGenie} from './genie-i18n-translate/genie';
import {MDKRuleGenie} from './genie-rule/genie';
import {MDKPageGenie} from './genie-page/genie';
// import {MDKOdataGenie} from './genie-odata/genie';
import {MDKActionGenie} from './genie-action/genie';
import {MDKProjectGenie} from './genie-project/genie';
import {BasToolkit} from '@sap-devx/app-studio-toolkit-types';
import { AnalyticsWrapper } from './usage-report/usage-analytics-wrapper';
// import { fileExtElf } from './action/file-ext-elf';
// import { elfHost } from '@sap/gai-core';
const basAPI: BasToolkit = vscode.extensions.getExtension(
	'SAPOSS.app-studio-toolkit'
)?.exports;

export async function activate(context: vscode.ExtensionContext) {
	basAPI
    .getExtensionAPI<any>('SAPSE.joule')
    .then((jouleAPI: any) => {
		// elfHost.register(fileExtElf);
		AnalyticsWrapper.createTracker(context);
		const oI18nTranslateGenie = new I18nTranslateGenie()
		const oRuleGenie = new MDKRuleGenie();
		const oPageGenie = new MDKPageGenie();
		// const oDataGenie = new MDKOdataGenieGenie();
		const oActionGenie = new MDKActionGenie();
		const oProjectGenie = new MDKProjectGenie();
		return Promise.all([
			jouleAPI.registerGenie(oI18nTranslateGenie),
			jouleAPI.registerGenie(oRuleGenie),
			jouleAPI.registerGenie(oPageGenie),
			// jouleAPI.registerGenie(oDataGenie),
			jouleAPI.registerGenie(oActionGenie),
			jouleAPI.registerGenie(oProjectGenie)
		]);
		
    });
}

export function deactivate() {
	console.info('Deactivating extension!');
}