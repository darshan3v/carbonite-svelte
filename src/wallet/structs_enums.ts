import type { TaskId, TokenId, AccountId, u64, Option, Vec, Balance, Timestamp, PublicKey_str } from './types';

// for now we are ignoring u64 -> U64 in both rust function input args and also u128

// bigint -> u64 -> rust u64

export type NFTContractMetadata = {
	spec: string;
	name: string;
	symbol: string;
	icon: string;
	base_uri: string;
	reference: string;
	reference_hash: string;
};

export type CarboniteMetdata = {
	xp: number;
	tasks_completed: Vec<TaskId>;
	total_tasks_completed: number;
};

export type Company = {
	name: string;
	icon: string;
	industries: string;
	description: string;
	location: Option<string>;
	reference: string;
};

export type Task = {
	task_details: TaskDetails;
	company_id: AccountId;
	deadline: Timestamp;
	person_assigned: Option<AccountId>;
	task_state: TaskState;
	ft_contract_id: AccountId;
	reward: Balance;
};

export type TaskDetails = {
	title: string;
	description: string;
	required_skills: string;
	task_type: TaskType;
	reference: string;
	reference_hash: string;
};

export type TaskState = 'Open' | 'Pending' | 'Completed' | 'Expired' | 'Overdue' | 'Payed';

export type TaskType =
	| { InviteOnly: { invited_accounts: Vec<AccountId>; valid_till: Timestamp } }
	| 'ForEveryone';

export type Submission = {
	submission_reference: string; // url
	submission_reference_hash: string; // hash
};

export type TokenMetadata = {
	title: string;
	description: Option<string>;
	media: string;
	media_hash: string;
	issued_at: Timestamp;
	updated_at: Option<Timestamp>;
	extra: Option<string>;
	carbonite_metadata: CarboniteMetdata;
	reference: string;
	reference_hash: string;
};

export type CompanyRegDetails = {
	account_id: string;
	company: Company;
	public_key: PublicKey_str;
}

export type JsonCompany = {
	account_id: AccountId;
	details: Company;
};

export type JsonSubmission = {
	task_id: TaskId;
	account_id: AccountId;
	submission: Submission;
};

export type JsonTask = {
	task_id: TaskId;
	task: Task;
};

export type JsonToken = {
	token_id: TokenId;
	owner_id: AccountId;
	metadata: TokenMetadata;
};
