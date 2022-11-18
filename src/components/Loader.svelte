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
		width: 100vw;
		position: absolute;
		text-align: center;
		font-size: x-large;
		font-weight: 500;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
