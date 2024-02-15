/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { createWorkerHandler } from './handler.js';
import { ElizaService } from '@buf/connectrpc_eliza.connectrpc_es/connectrpc/eliza/v1/eliza_connect.js';

export default createWorkerHandler({
	routes({ service }) {
		service(ElizaService, {
			async say(req) {
				return {
					sentence: `You said: ${req.sentence}!`,
				};
			},
		});
	},
});
