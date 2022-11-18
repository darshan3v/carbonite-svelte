<script lang="ts">
	export let is_input_valid: boolean;
	export let err_msg: string;
</script>

{#if !is_input_valid}
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>{err_msg}</label>
{/if}

<style>
	label {
		display: block;
		padding-top: 0.5rem;
		font-weight: 400;
        font-size: small;
		color: rgb(214, 47, 47);
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
</style>
