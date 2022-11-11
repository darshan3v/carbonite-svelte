use crate::*;

#[derive(BorshDeserialize, BorshSerialize,Serialize,Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct M_DrivingLicense {
    has_license: bool,
}

#[near_bindgen]
impl Contract{
    pub fn has_license(&self,id: AccountId) -> bool{
        let m_driving_license = self.m_driving_license_by_id.get(&id.into()).unwrap_or_else(|| env::panic(b"No Corresponding Masked Records found"));

        m_driving_license.has_license
    }
}