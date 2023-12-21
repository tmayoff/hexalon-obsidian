<script lang="ts" type="module">
	// @ts-ignore
	import init, { run } from "../../hexalon/pkg/hexalon.js";

	let game = init();

	// init()
	// 	.catch((error: { message: string }) => {
	// 		if (
	// 			!error.message.startsWith(
	// 				"Using exceptions for control flow, don't mind me. This isn't actually an error!",
	// 			)
	// 		) {
	// 			throw error;
	// 		}
	// 	})
	// 	.then(() => {
	// 		console.log("HEXALON LOADED");
	// 		run();
	// 	});
</script>

<div>
	<h1>HEXALON</h1>

	{#await game}
		<h1>Loading...</h1>
	{:then g}
		<h1>Loaded.</h1>
	{/await}

	<canvas id="hexalon-canvas" width="1280" height="720"></canvas>
</div>
