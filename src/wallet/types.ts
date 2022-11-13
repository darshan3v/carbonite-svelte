// Gas is of type u64 , not sure of deposit's type

// Balance -> u128 -> string

export type Gas = U64;
export type Deposit = U64;

export type Balance = U128;

export type Timestamp = u64;

export type ContractId = AccountId;

export type TaskId = string;
export type TokenId = string;

// add checks to validate if anytihngs is truly account or not
export type AccountId = string;

// add checks to validate if anything is truly U128
export type U128 = string;
export type U64 = string;

// add checks to validate
export type u64 = bigint;

export type Option<T> = T | null;

export type Vec<T> = Array<T>;

export type PublicKey_str = string;

export type viewMethods =
	| 'nft_metadata'
	| 'nft_total_supply'
	| 'nft_tokens'
	| 'nft_supply_for_owner'
	| 'nft_tokens_for_owner'
	| 'nft_token'
	| 'get_owner'
	| 'get_recognised_skills_list'
	| 'get_company_details'
	| 'get_whitelisted_companies_list'
	| 'get_approved_ft_tokens_list'
	| 'get_task_details'
	| 'get_all_tasks_list'
	| 'get_tasks_from_company_list'
	| 'get_submission_details'
	| 'get_submissions_for_task_list';

// init -> new
export type writeMethods =
	| 'init'
	| 'approve_ft_tokens'
	| 'whitelist_companies'
	| 'edit_company_details'
	| 'nft_mint'
	| 'accept_invite'
	| 'select_task'
	| 'claim_refund'
	| 'add_task_in_near_token'
	| 'ping_task'
	| 'extend_deadline'
	| 'submit_task';
