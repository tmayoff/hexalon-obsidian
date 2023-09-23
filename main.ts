import { Plugin } from 'obsidian';

import Koa from "koa";
import Router from "koa-router";
import { get } from 'svelte/store';

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

		this.router.get('/data', ctx => {
			ctx.body = this.app.plugins.plugins["initiative-tracker"].data;
		});

		this.router.get('/tracker/ordered', ctx => {
			let ordered = get(this.app.plugins.plugins["initiative-tracker"].tracker.ordered);
			ctx.body = ordered;
			console.log(ctx.body);
		});

		this.server.use(this.router.routes());
		this.listener = this.server.listen(8080);
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
