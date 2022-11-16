<script lang="ts">
	import { isSignedIn, nearWallet } from '$src/wallet/wallet';
	console.log(isSignedIn);
</script>

<!-- sign in and sign out button -->
{#if !$isSignedIn}
	<button on:click={async () => nearWallet.signIn()}>Sign In</button>
{:else}
	<button on:click={async () => nearWallet.signOut()}>{nearWallet.accountId}</button>

	<!-- {#await nearWallet.fetchMetadata()}
		<p>..... Fetching .....</p>
	{:then metadata} 
		<p>{JSON.stringify(metadata)}</p>
	{/await} -->

	<button on:click={async () => nearWallet.test_contract()}>Test Contract></button>
{/if}
