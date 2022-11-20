<!-- (NOT_NOW)approve_ft_tokens_args -->
<script lang="ts">
	import type { Company, CompanyRegDetails } from 'src/wallet/structs_enums';
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
	import type { AccountId, Vec } from '$src/wallet/types';
	import { goto } from '$app/navigation';
	import { KeyPairEd25519 } from 'near-api-js/lib/utils';
	// import {} from '$src/wallet/view';
	let keyPair: KeyPairEd25519;

	let Loading = true;
	let loading_msg: string = 'Loading';

	let pending_companies_list: Vec<CompanyRegDetails> = [];

	onMount(async () => {
		const walletSelector: WalletSelector = await getWalletSelector();
		const isSignedIn: boolean = walletSelector.isSignedIn();

		await setupWallet(walletConfig);

		let accountId: AccountId;

		// TODO: change this
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
		} else {
			loading_msg = 'Please Sign In with a near Account to register @Carbonite.Club';
			await delay(2000);
			goto('/');
		}
		Loading = false;
		pending_companies_list = await get_pending_companies_list();
	});

	async function whitelist_companies(companies: Array<AccountId>) {
		console.log('whitelist_companies(Array<AccountId>)', companies);

		try {
			await nearWallet.whitelist_companies({
				companies: companies
			});
		} catch (e) {
			console.log('ERROR whitelist_companies(Array<AccountId>)', e);
		}
	}

	// get_pending_companies_list_args
	async function get_pending_companies_list(): Promise<Vec<CompanyRegDetails>> {
		try {
			// TODO make loop till you get all companies
			const pending_companies_list = await nearWallet.get_pending_companies_list({
				from_index: '0',
				limit: 10
			});
			console.log('get_pending_companies_list()', pending_companies_list);
			return pending_companies_list;
		} catch (e) {
			console.log('ERROR get_pending_companies_list()', e);
			return [];
		}
	}
</script>

<!-- whitelist_companies_args -->

<h1>Whitelist one by one</h1>
{#if pending_companies_list.length > 0}
	{#each pending_companies_list as company}
		<div>
			{company.account_id}
			<button on:click={() => whitelist_companies([company.account_id])}> Whitelist </button>
		</div>
	{/each}
{:else}
	<div>No Pending Companies</div>
{/if}

<!-- same as above but make a check box to select the company -->
<h1>group whitelist companies</h1>
{#if pending_companies_list.length > 0}
	{#each pending_companies_list as company}
		<div>
			<input type="checkbox" />
			{company.account_id}
		</div>
	{/each}
	<button
		on:click={() =>
			whitelist_companies(pending_companies_list.map((company) => company.account_id))}
	>
		Whitelist
	</button>
{:else}
	<div>No Pending Companies</div>
{/if}
