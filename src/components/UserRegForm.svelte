<script lang="ts">
	import type { nft_mint_args } from '$src/wallet/function_args';
	import type { AccountId, PublicKey_str, Option } from '$src/wallet/types';
	import {
		doesAccountExist,
		is_carbonite_user_acc,
		nearWallet,
		setupWallet,
		walletConfig
	} from '$src/wallet/wallet';
	import { KeyPairEd25519 } from 'near-api-js/lib/utils';
	import { onMount } from 'svelte';
	import Error from './Error.svelte';

	let keyPair: KeyPairEd25519;

	let user: nft_mint_args = {
		title: '',
		description: '',
		receiver_id: '',
		public_key: '' // it's generated
	};

	let title_err_data = {
		is_valid: false,
		err_msg: ''
	};

	let account_id_err_data = {
		is_valid: false,
		err_msg: ''
	};

	onMount(() => {
		setupWallet(walletConfig);
		localStorage.removeItem('privateKey');
		localStorage.removeItem('carboniteAccountId');
	});

	async function validate_form() {
		// sanitize title input

		if (user.title === '') {
			title_err_data.is_valid = false;
			title_err_data.err_msg = 'title is a mandatory field';
		} else {
			title_err_data.is_valid = true;
		}

		// sanitize accountId input

		if (!is_carbonite_user_acc(user.receiver_id)) {
			account_id_err_data.is_valid = false;
			account_id_err_data.err_msg = 'accountId should be of the form username.carbonite.testnet';
			// add exact details of the format of username
		} else if (await doesAccountExist(user.receiver_id)) {
			account_id_err_data.is_valid = false;
			account_id_err_data.err_msg =
				user.receiver_id + ' already exists, so please choose a different one';
		} else {
			account_id_err_data.is_valid = true;
		}
	}

	async function handleSubmit() {
		await validate_form();
		if (title_err_data.is_valid && account_id_err_data.is_valid) {
			keyPair = KeyPairEd25519.fromRandom();
			user.public_key = keyPair.getPublicKey().toString();

			localStorage.setItem('carboniteAccountId', user.receiver_id);
			localStorage.setItem('privateKey', keyPair.secretKey);
			try {
				await nearWallet.nft_mint(user);
			} catch (err) {
				console.log(err);
			}
		}
	}
</script>

<!-- user detailed (title, description(optional), public key(internal),account id(given by user and make sure that account id should not already exist)) -->

<form on:submit|preventDefault={handleSubmit}>
	<div>
		<label for="title">Title</label>
		<input type="text" bind:value={user.title} />
		<Error is_input_valid={title_err_data.is_valid} err_msg={title_err_data.err_msg} />
	</div>

	<div>
		<label for="description">Description</label>
		<input type="text" bind:value={user.description} />
		<Error is_input_valid={true} err_msg="" />
	</div>

	<div>
		<label for="account_id">Account ID</label>
		<input type="text" bind:value={user.receiver_id} />
		<Error is_input_valid={account_id_err_data.is_valid} err_msg={account_id_err_data.err_msg} />
	</div>

	<!-- mint nft button (nft_mint_args) -->
	<div>
		<button type="submit">Submit</button>
	</div>
</form>

<style>
	div {
		margin: 1rem;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
	}

	div label {
		display: block;
		margin-bottom: 0.3rem;
	}
</style>
