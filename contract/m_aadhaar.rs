use crate::*;

#[derive(BorshDeserialize, BorshSerialize,Serialize,Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct M_Aadhaar {
    is_above_18: bool,
    is_senior_citizen: bool,
}

#[near_bindgen]
impl Contract{
    pub fn is_above_18(&self,id: AccountId) -> bool{
        let m_aadhaar = self.m_aadhaar_by_id.get(&id).unwrap_or_else(|| env::panic(b"No Corresponding Masked Records found"));

        m_aadhaar.is_above_18
    }

    pub fn is_senior_citizen(&self,id: AccountId) -> bool{
        let m_aadhaar = self.m_aadhaar_by_id.get(&id).unwrap_or_else(|| env::panic(b"No Corresponding Masked Records found"));

        m_aadhaar.is_senior_citizen
    }
}
