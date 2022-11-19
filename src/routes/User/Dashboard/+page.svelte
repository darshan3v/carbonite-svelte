<!-- submit task (inputs:(task_id,(Submission(line 57))) -> outputs(true or false or error)) -->
<script lang="ts">
	import type { Task } from '$src/wallet/structs_enums';
	import { get_all_tasks_list, nft_tokens_for_owner } from '$src/wallet/view';
	import { nearWallet, setupWallet, walletConfig } from '$src/wallet/wallet';
	import { onMount } from 'svelte';

	let taskList: Task[] = [];

	onMount(async () => {
		await setupWallet(walletConfig);
		if (nearWallet.accountId) {
			const metadata = await nearWallet.nft_tokens_for_owner({
				account_id: nearWallet.accountId,
				from_index: null,
				limit: null
			});
			console.log('metadata', metadata);
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

{JSON.stringify(taskList)}
