mod m_aadhaar;
mod m_driving_license;
mod metadata;

use near_sdk::{near_bindgen, PublicKey, env, Promise};

use near_sdk::{PanicOnDefault,AccountId};
use near_sdk::json_types::{ValidAccountId, Base58PublicKey};

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Serialize,Deserialize};

use near_sdk::collections::{LookupMap,LazyOption};

pub use m_aadhaar::M_Aadhaar;
pub use m_driving_license::M_DrivingLicense;
pub use metadata::ContractMetadata;

#[derive(BorshSerialize)]
pub enum StorageKey {
    MAadhaar,
    MDrivingLicense,
    Metadata,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub owner_id: AccountId,

    //// LookUp for Aadhar Id
    pub m_aadhaar_by_id: LookupMap<AccountId,M_Aadhaar>,

    //// LookUp for Driving License
    pub m_driving_license_by_id: LookupMap<AccountId,M_DrivingLicense>,

    /// Metadata for the Fungible Token
    pub metadata: LazyOption<ContractMetadata>,
}

#[near_bindgen]
impl Contract {
    /// Initialize The Contract
    #[init]
    pub fn new(
        owner_id: ValidAccountId,
        metadata: ContractMetadata,
    ) -> Self {

        Self { 
            owner_id: owner_id.into(),
            m_aadhaar_by_id: LookupMap::new(StorageKey::MAadhaar.try_to_vec().unwrap()),
            m_driving_license_by_id: LookupMap::new(StorageKey::MDrivingLicense.try_to_vec().unwrap()),
            metadata: LazyOption::new(StorageKey::Metadata.try_to_vec().unwrap(),Some(&metadata)),
        }

    }

    #[payable]
    pub fn add_m_aadhaar_record(&mut self,id: AccountId,m_aadhaar: M_Aadhaar){
        let initial_storage = env::storage_usage();

        // assert_eq!(env::predecessor_account_id(),self.owner_id,"Only government can add aadhaar record");

        if self.m_aadhaar_by_id.insert(&id, &m_aadhaar).is_some(){
            env::panic(b"Invalid! Trying to upload a Duplicate Document");
        }

        let storage_cost = (env::storage_usage() - initial_storage) as u128 * env::storage_byte_cost();

        let refund = env::attached_deposit() - storage_cost;

        if refund > 0 {
            Promise::new(env::predecessor_account_id()).transfer(refund);
        }

    }

    #[payable]
    pub fn add_m_driving_license_record(&mut self,id: AccountId,m_driving_license: M_DrivingLicense){
        let initial_storage = env::storage_usage();

        // assert_eq!(env::predecessor_account_id(),self.owner_id,"Only government can add driving license record");

        if self.m_driving_license_by_id.insert(&id, &m_driving_license).is_some(){
            env::panic(b"Invalid! Trying to upload a Duplicate Document");
        }

        let storage_cost = (env::storage_usage() - initial_storage) as u128 * env::storage_byte_cost();

        let refund = env::attached_deposit() - storage_cost;

        if refund > 0 {
            Promise::new(env::predecessor_account_id()).transfer(refund);
        }

    }
}

