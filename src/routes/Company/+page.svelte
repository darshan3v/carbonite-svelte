<!-- -------------------------------------------------- -->
<script lang="ts">
	import type { Company } from 'src/wallet/structs_enums';
	import Loader from '$src/components/Loader.svelte';
	import { onMount } from 'svelte';
	import type { WalletSelector } from '@near-wallet-selector/core';
	import {
		delay,
		getWalletSelector,
		is_carbonite_company_acc,
		is_carbonite_user_acc,
		nearWallet,
		setupWallet,
		walletConfig
	} from '$src/wallet/wallet';
	import type { AccountId } from '$src/wallet/types';
	import { goto } from '$app/navigation';
	import { KeyPairEd25519 } from 'near-api-js/lib/utils';
	import type { PageData } from './$types';
	// import {} from '$src/wallet/view';
	let keyPair: KeyPairEd25519;

	let Loading = true;
	let loading_msg: string = 'Loading';
	let pending: boolean = false;

	export let data: PageData;

	//TODO: change this
	let other: any = {};

	onMount(async () => {
		const walletSelector: WalletSelector = await getWalletSelector();
		const isSignedIn: boolean = walletSelector.isSignedIn();

		await setupWallet(walletConfig);

		let accountId: AccountId;

		if (isSignedIn) {
			accountId = walletSelector.store.getState().accounts[0].accountId;

			if (is_carbonite_user_acc(accountId)) {
				loading_msg = 'Redirecting to User Dashboard';
				await delay(2000);
				goto('/User/Dashboard');
			} else if (is_carbonite_company_acc(accountId)) {
				loading_msg = 'Redirecting to Company Dashboard';
				await delay(2000);
				goto('/Company/Dashboard');
			}
			// console.log('check if company type then redirect to dashboard or else accordingly');
		} else {
			loading_msg = 'Please Sign In with a near Account to register @Carbonite.Club';
			await delay(2000);
			goto('/');
		}

		if (data.has_company_requested_verification === true) {
			pending = true;
		}

		Loading = false;
	});

	let company: Company = {
		name: 'name',
		icon: 'a',
		industries: 'sa',
		description: 'sa',
		location: 'sa',
		reference: 'sa'
	};

	async function request_verification(company: Company) {
		console.log('request_verification', company);
		keyPair = KeyPairEd25519.fromRandom();
		other.public_key = keyPair.getPublicKey().toString();

		localStorage.setItem('carboniteCompanyAccountId', other.account_id);
		localStorage.setItem('companyPrivateKey', keyPair.secretKey);

		// wallet.request_verification(company); TODO
		try {
			await nearWallet.request_verification({
				company_reg_details: {
					account_id: other.account_id,
					company: company,
					public_key: other.public_key
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	//TODO: Change implementation THIS LATER ASAP
	const onFileSelected = (e: any) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		// console.log('read', reader);
		reader.readAsDataURL(image);
		reader.onload = (e: any) => {
			company.icon = e.target.result;
		};
		// i think we can use reader.result
	};
</script>

{#if Loading}
	<Loader {loading_msg} />
{:else if !pending}
	<!-- company registration (Company(line 23 structs enum)) (call request_verification)  -->

	<form>
		<div>
			<!-- add a view function to check if a request from this name already exists -->
			<label for="account_id">Account Id</label>
			<input type="text" name="account_id" bind:value={other.account_id} />
		</div>

		<h1>Company</h1>

		<div>
			<label for="name">Company Name</label>
			<input type="text" id="name" name="name" bind:value={company.name} />
		</div>

		<div>
			<!-- image picker , then convert image to data URI -->
			<label for="icon">Company Icon</label>
			<img src={company.icon} alt="company icon" />
			<input
				type="file"
				id="icon"
				name="icon"
				on:change={(e) => onFileSelected(e)}
				bind:value={company.icon}
			/>
		</div>

		<div>
			<label for="industries">Company Industries</label>
			<input type="text" id="industries" name="industries" bind:value={company.industries} />
		</div>

		<div>
			<label for="description">Company Description</label>
			<input type="text" id="description" name="description" bind:value={company.description} />
		</div>

		<div>
			<label for="location">Company Location</label>
			<input type="text" id="location" name="location" bind:value={company.location} />
		</div>
		<div>
			<label for="reference">Company Reference</label>
			<input type="text" id="reference" name="reference" bind:value={company.reference} />
		</div>

		<div>
			<button type="button" on:click={() => request_verification(company)}>Submit</button>
		</div>
	</form>
{:else}
	<h1>Pending</h1>
{/if}

<style>
	div {
		margin: 1rem;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
	}

	div label {
		display: block;
		margin: 0.3rem;
	}
</style>
