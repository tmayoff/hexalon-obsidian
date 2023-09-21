import { Plugin } from 'obsidian';

import Koa from "koa";
import Router from "koa-router";

interface MyPluginSettings {
}

const DEFAULT_SETTINGS: MyPluginSettings = {
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	server?: Koa;
	router: Router;
	listener: any;

	async onload() {
		await this.loadSettings();
		this.server = new Koa();
		this.router = new Router();

		this.router.get('/ttrpg_data', (ctx, next) => {
			ctx.body = this.app.plugins.plugins["initiative-tracker"].data;
		});

		this.server.use(this.router.routes());

		this.listener = this.server.listen(8080);
		console.log(this.app.plugins.plugins["initiative-tracker"].data);
	}

	onunload() {
		this.listener.close();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
