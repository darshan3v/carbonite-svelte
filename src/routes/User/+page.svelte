<!-- have to register himself by minting nft  -->
<script>
	import { writable } from 'svelte/store';
	let user = {
		title: '',
		description: '',
		account_id: '',
		_public_key: ''
	};
</script>

<!-- This is user page -->

<!-- create a svelte form with  -->
<!-- nft image selection -->
<svg>
	<rect width="150" height="150" fill="red" />
</svg>
<!-- user detailed (title, description(optional), public key(internal),account id(given by user and make sure that account id should not already exist)) -->
<form>
	<label for="title">Title</label>
	<input type="text" bind:value={user.title} />
	<label for="description">Description</label>
	<input type="text" bind:value={user.description} />
	<label for="account_id">Account ID</label>
	<input type="text" bind:value={user.account_id} />

	<!-- mint nft button (nft_mint_args) -->
	<button type="submit">Submit</button>
</form>

{#if user.title}
	<h1>{JSON.stringify(user)}</h1>
{/if}
