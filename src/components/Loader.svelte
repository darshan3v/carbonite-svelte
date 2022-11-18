<script lang="ts">
	import { DoubleBounce } from 'svelte-loading-spinners';
</script>

<div class="loader">
	<DoubleBounce />
	<p><br /><br /><br /><br />Carbon &nbsp; ‣‣‣‣ &nbsp; Diamond</p>
</div>

<style>
	.loader {
		height: 90vh;
		display: grid;
		justify-content: center;
		align-items: center;
	}

	.loader p {
		text-align: center;
		width: 100vw;
		position: absolute;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: x-large;
		font-weight: 500;
	}
</style>
