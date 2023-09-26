import { Plugin } from 'obsidian';

import Koa from "koa";
import Router from "koa-router";

class Creature {
	active: boolean;
	name: string;
	modifier: number | number[];
	hp: number;
	hit_dice?: string;
	rollHP?: boolean;
	temp: number;
	ac: number | string;
	current_ac: number | string;
	dirty_ac: boolean;
	note: string;
	enabled: boolean = true;
	hidden: boolean = false;
	max: number;
	current_max: number;
	level: number;
	player: boolean;
	marker: string;
	initiative: number;
	static: boolean = false;
	source: string | string[];
	id: string;
	xp: number;
	viewing: boolean = false;
	number: number = 0;
	display: string;
	friendly: boolean = false;
	cr: string | number;
	path: string;

	constructor(c: any) {
		this.display = c.display;
		this.name = c.name;
		this.number = c.number;
		this.active = c.active;
		this.modifier = c.modifier;
		this.hp = c.hp;
		this.hit_dice = c.hit_dice;
		this.temp = c.temp;
		this.ac = c.ac;
		this.current_ac = c.current_ac;
		this.current_max = c.current_max;
		this.dirty_ac = c.dirty_ac;
		this.note = c.note;
		this.enabled = c.enabled;
		this.hidden = c.hidden;
		this.max = c.max;
		this.level = c.level;
		this.player = c.player;
		this.friendly = c.friendly;
		this.marker = c.marker;
		this.initiative = c.initiative;
		this.static = c.static;
		this.source = c.source;
		this.id = c.id;
		this.xp = c.xp;
		this.viewing = c.viewing;
		this.cr = c.cr;
		this.path = c.path;
	}
}

interface BridgeSettings {
}

const DEFAULT_SETTINGS: BridgeSettings = {
}

export default class TTRPGBridge extends Plugin {
	settings: BridgeSettings;
	server?: Koa;
	router: Router;
	listener: any;

	ordered: Creature[];

	async onload() {
		await this.loadSettings();
		this.server = new Koa();
		this.router = new Router();

		this.router.get('/data', ctx => {
			ctx.body = this.app.plugins.plugins["initiative-tracker"].data;
		});

		this.router.get('/tracker/ordered', ctx => {
			let ordered = this.ordered;
			ctx.body = ordered;
		});

		this.server.use(this.router.routes());
		this.listener = this.server.listen(8080);

		this.app.plugins.plugins["initiative-tracker"].tracker.ordered.subscribe((ordered: Creature[]) => {
			let creatures: Creature[] = [];
			for (let c of ordered) {
				creatures.push(new Creature(c));
			}
			this.ordered = creatures;
		});
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
