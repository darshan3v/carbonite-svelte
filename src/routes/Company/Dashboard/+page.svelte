<script lang="ts">
	import type { Company, JsonCompany, Task } from '$src/wallet/structs_enums';
	// import {} from 'src/wallet/view';
	// import { edit_company_details } from 'src/wallet/write';
	import { NearWallet, type WalletConfig } from '$src/wallet/near-wallet';
	import { TESTNET_CONTRACT_ID, TESTNET_NETWORK_ID } from '$src/wallet/constants';
	import type { WalletSelector } from '@near-wallet-selector/core';
	import type { Option } from '$src/wallet/types';
	let nearWallet: NearWallet; //TODO
	let company: Option<JsonCompany>;

	let tasks: Task = {
		task_details: {
			title: 'Task 1',
			description: 'Task 1 description',
			required_skills: 'Task 1 required skills',
			task_type: 'ForEveryone',
			reference: 'Task 1 reference',
			reference_hash: 'Task 1 reference hash'
		},
		company_id: 'company_id',
		deadline: 10000, //unix timestamp
		person_assigned: 'person_assigned',
		task_state: 'Open',
		ft_contract_id: 'ft_contract_id',
		reward: 'reward'
	};

	async function get_company() {
		company = await nearWallet.get_company_details({ account_id: nearWallet.accountId as string });
	}

	function edit_company_details(company: Company) {
		console.log('edit_company', company);
		// pass wallet and company to edit_company_details
		nearWallet.edit_company_details({ new_company_details: company });
	}

	let walletConfig: WalletConfig = {
		network: TESTNET_NETWORK_ID,
		contractId: TESTNET_CONTRACT_ID,
		createAccessKeyFor: TESTNET_CONTRACT_ID
	};

	async function setuptWallet(walletConfig: WalletConfig): Promise<void> {
		const walletSelector: WalletSelector = await NearWallet.WithWalletSelector(walletConfig);

		nearWallet = new NearWallet(walletConfig, walletSelector);

		await nearWallet.startUp();
	}

	function add_task_in_near_token(task: Task) {
		console.log('add_task_in_near_token', task);
		nearWallet.add_task_in_near_token({
			task_id: '',
			task_details: {
				title: '',
				description: '',
				required_skills: '',
				task_type: 'ForEveryone',
				reference: '',
				reference_hash: ''
			},
			deadline: 0,
			reward: ''
		});
	}
</script>

<!-- edit company detailes (function: edit_company_details_args ) -->
<!-- if company exists then -->
{#if company}
	<form>
		<label for="name">Company Name</label>
		<input type="text" id="name" bind:value={company.details.name} />

		<label for="icon">Company Icon(url)</label>
		<input type="text" id="icon" bind:value={company.details.icon} />

		<label for="industries">Company Industries</label>
		<input type="text" id="industries" bind:value={company.details.industries} />

		<label for="description">Company Description</label>
		<input type="text" id="description" bind:value={company.details.description} />

		<label for="location">Company Location</label>
		<input type="text" id="location" bind:value={company.details.location} />

		<label for="reference">Company Reference</label>
		<input type="text" id="reference" bind:value={company.details.reference} />

		{#if company !== null}
			<button
				type="button"
				on:click={() => {
					if (company) {
						edit_company_details(company.details);
					}
				}}>Submit</button
			>
		{/if}
	</form>
{:else}
	<p>Company not found/Loading</p>
{/if}
<!-- else -->

<!-- add_task_in_near_token (function: add_task_in_near_token_args ) -->
<h1>ADD_Task----------------</h1>
<form>
	<h1>task_details</h1>
	<label for="title">Task Title</label>
	<input type="text" id="title" bind:value={tasks.task_details.title} />

	<label for="description">Task Description</label>
	<input type="text" id="description" bind:value={tasks.task_details.description} />

	<label for="required_skills">Task Required Skills</label>
	<input type="text" id="required_skills" bind:value={tasks.task_details.required_skills} />

	<label for="task_type">Task Type(WRONG)</label>
	<input type="text" id="task_type" bind:value={tasks.task_details.task_type} />

	<label for="reference">Task Reference</label>
	<input type="text" id="reference" bind:value={tasks.task_details.reference} />

	<label for="reference_hash">Task Reference Hash</label>
	<input type="text" id="reference_hash" bind:value={tasks.task_details.reference_hash} />

	<h3>task</h3>
	<label for="company_id">Company Id</label>
	<input type="text" id="company_id" bind:value={tasks.company_id} />

	<label for="deadline">Deadline</label>
	<input type="datetime-local" id="deadline" bind:value={tasks.deadline} />

	<label for="person_assigned">Person Assigned</label>
	<input type="text" id="person_assigned" bind:value={tasks.person_assigned} />

	<label for="task_state">Task State</label>
	<!-- dropdown of 'Open' | 'Pending' | 'Completed' | 'Expired' | 'Overdue' | 'Payed'; -->
	<select bind:value={tasks.task_state}>
		<option value="Open">Open</option>
		<option value="Pending">Pending</option>
		<option value="Completed">Completed</option>
		<option value="Expired">Expired</option>
		<option value="Overdue">Overdue</option>
		<option value="Payed">Payed</option>
	</select>

	<label for="ft_contract_id">FT Contract Id(remove)</label>
	<input type="text" id="ft_contract_id" bind:value={tasks.ft_contract_id} />

	<label for="reward">Reward</label>
	<input type="number" step="any" id="reward" bind:value={tasks.reward} />

	<button type="button" on:click={() => add_task_in_near_token(tasks)}>Submit</button>
</form>
<!-- extend deadline of task -->

<!-- get_tasks_from_company_list  -->
<!-- select_task_args -->

<!-- claim_refund_args -->
<style>
	form {
		display: flex;
		flex-direction: column;
	}
</style>
