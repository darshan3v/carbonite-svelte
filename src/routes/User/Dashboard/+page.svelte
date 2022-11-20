<!-- submit task (inputs:(task_id,(Submission(line 57))) -> outputs(true or false or error)) -->
<script lang="ts">
	import type { JsonToken, Task, TokenMetadata } from '$src/wallet/structs_enums';
	import type { Vec } from '$src/wallet/types';
	import { get_all_tasks_list, nft_metadata, nft_tokens_for_owner } from '$src/wallet/view';
	import { nearWallet, setupWallet, walletConfig } from '$src/wallet/wallet';
	import { onMount } from 'svelte';

	let taskList: Task[] = [];

	let nft: JsonToken;

	let title: string;
	let media: string;
	let xp: number;
	let tasks_completed: Vec<string>;
	let total_tasks_completed: number;

	onMount(async () => {
		await setupWallet(walletConfig);
		if (nearWallet.accountId) {
			const tokens = await nearWallet.nft_tokens_for_owner({
				account_id: nearWallet.accountId,
				from_index: null,
				limit: null
			});
			// console.log('metadata', tokens);
			nft = tokens[0];
	({metadata: {title,media,carbonite_metadata:{xp,tasks_completed,total_tasks_completed}}} = nft);
		}
	});

	// function to get all tasks from the contract by calling get_all_tasks_list(from_index,limit) until it returns empty array
	function getTasks() {
		//do later
	}
</script>

<!-- will have all the taskes (accepted, invited, done)(three different tab views )  -->

<!-- task (
    task_details: TaskDetails;
	company_id: AccountId;
	deadline: Timestamp;
	person_assigned: Option<AccountId>;
	task_state: TaskState;()
	ft_contract_id: AccountId;
	reward: Balance;
    ) 
    (get_all_tasks_list(from_index,limit))-->
<!-- 2 types of tasks (if task is a bounty then ..... else only few ppl are eligable(invite only)) -->

<!-- accept_invite (inputs:(task_id) -> outputs(true or false or error))-->

<!-- -------------------------------------------------------------------------------- -->
<!-- sort and display all the tasks -->

{#if nft}
	<h1>Hi ! {title}</h1>
	<!-- fix showing media use near wallet frontend code as reference to resolve nft media  -->
	<img src="{media}" alt="NFT">
	<h3> XP : {xp}</h3>
	<h3> Tasks Completed : {tasks_completed.length === 0 ? 'No Tasks Completed' : tasks_completed }</h3>
	<h3> Total Tasks Completed : {total_tasks_completed}</h3>
{/if}
