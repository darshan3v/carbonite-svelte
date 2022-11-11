use crate::*;

#[derive(BorshDeserialize, BorshSerialize, Clone, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct ContractMetadata {
    pub name: String,           // Name of Government Authority
    pub icon: String,           // UIDAI Icon
    pub description: String,    // Small Description of purpose of Contract
    pub reference: String,      // Link to the site that explains about this Contract
}

#[near_bindgen]
impl Contract{
    pub fn metadata(&self) -> ContractMetadata {
        self.metadata.get().unwrap().clone()
    }
}
