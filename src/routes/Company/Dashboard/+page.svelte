<script lang="ts">
	import type { Company, Task } from 'src/wallet/structs_enums';
	// import {} from 'src/wallet/view';
	// import { edit_company_details } from 'src/wallet/write';
	import type { NearWallet } from 'src/wallet/near-wallet';
	let wallet: NearWallet; //TODO
	let company: Company;

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

	function get_company() {
		console.log('get_company', company);
		company = {
			name: 'Company Name',
			icon: '',
			industries: 'Industries',
			description: 'Description',
			location: 'Location',
			reference: 'Reference'
		};
	}
	get_company();

	function edit_company_detailes(company: Company) {
		console.log('edit_company', company);
		// pass wallet and company to edit_company_details
		wallet.edit_company_details(company);
	}

	function add_task_in_near_token(task: Task) {
		console.log('add_task_in_near_token', task);
		wallet.add_task_in_near_token(task);
	}
</script>

<!-- edit company detailes (function: edit_company_details_args ) -->
<!-- if company exists then -->
{#if company}
	<form>
		<label for="name">Company Name</label>
		<input type="text" id="name" bind:value={company.name} />

		<label for="icon">Company Icon(url)</label>
		<input type="text" id="icon" bind:value={company.icon} />

		<label for="industries">Company Industries</label>
		<input type="text" id="industries" bind:value={company.industries} />

		<label for="description">Company Description</label>
		<input type="text" id="description" bind:value={company.description} />

		<label for="location">Company Location</label>
		<input type="text" id="location" bind:value={company.location} />

		<label for="reference">Company Reference</label>
		<input type="text" id="reference" bind:value={company.reference} />

		<button type="button" on:click={() => edit_company_detailes(company)}>Submit</button>
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
