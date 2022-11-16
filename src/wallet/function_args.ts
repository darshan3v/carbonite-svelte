import type {
	Company,
	NFTContractMetadata,
	Submission,
	TaskDetails,
	CompanyRegDetails
} from './structs_enums';
import type {
	AccountId,
	Balance,
	Option,
	PublicKey_str,
	TaskId,
	Timestamp,
	U128,
	u64,
	Vec
} from './types';

// view calls

// export type nft_metadata_args = Record<string, never>; // means empty object

// export type nft_total_supply_args = Record<string, never>;

export type nft_tokens_args = {
	from_index: Option<U128>;
	limit: Option<u64>;
};

export type nft_supply_for_owner_args = {
	account_id: AccountId;
};

export type nft_tokens_for_owner_args = {
	account_id: AccountId;
	from_index: Option<U128>;
	limit: Option<u64>;
};

export type nft_token_args = {
	account_id: AccountId;
};

// export type get_owner_args = Record<string, never>;

export type get_recognised_skills_list_args = {
	from_index: Option<U128>;
	limit: Option<u64>;
};

export type get_company_details_args = {
	account_id: AccountId;
};

export type get_pending_companies_list_args = {
	from_index: Option<U128>;
	limit: Option<u64>;
};

export type get_whitelisted_companies_list_args = {
	from_index: Option<U128>;
	limit: Option<u64>;
};

export type get_approved_ft_tokens_list_args = {
	from_index: Option<U128>;
	limit: Option<u64>;
};

export type get_task_details_args = {
	task_id: TaskId;
};

export type get_all_tasks_list_args = {
	from_index: Option<U128>;
	limit: Option<u64>;
};

export type get_invited_tasks_for_user_list_args = {
	account_id: AccountId;
	from_index: Option<U128>;
	limit: Option<u64>;
};

export type get_tasks_from_company_list_args = {
	company_id: AccountId;
	from_index: Option<U128>;
	limit: Option<u64>;
};

export type get_submission_details_args = {
	task_id: TaskId;
	account_id: AccountId;
};

export type get_submissions_for_task_list_args = {
	task_id: TaskId;
	from_index: Option<U128>;
	limit: Option<u64>;
};

//write calls

export type init_args = {
	owner_id: AccountId;
	metadata: NFTContractMetadata;
};

export type approve_ft_tokens_args = {
	ft_tokens_contract_ids_args: Vec<AccountId>;
};

export type request_verification_args = {
	company_reg_details: CompanyRegDetails;
};

export type whitelist_companies_args = {
	companies: Array<AccountId>;
};

export type edit_company_details_args = {
	new_company_details: Company;
};

export type nft_mint_args = {
	receiver_id: AccountId;
	title: string;
	description: Option<string>;
	public_key: PublicKey_str;
};

export type accept_invite_args = {
	task_id: TaskId;
};

export type select_task_args = {
	task_id: TaskId;
	user_id: AccountId;
};

export type claim_refund_args = {
	task_id: TaskId;
};

export type add_task_in_near_token_args = {
	task_id: TaskId;
	task_details: TaskDetails;
	deadline: Timestamp;
	reward: Balance;
};

export type ping_task_args = {
	task_id: TaskId;
};

export type extend_deadline_args = {
	task_id: TaskId;
	new_deadline: Timestamp;
};

export type submit_task_args = {
	task_id: TaskId;
	submission: Submission;
};
