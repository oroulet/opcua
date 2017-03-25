// This file was autogenerated from Opc.Ua.Types.bsd.xml
// DO NOT EDIT THIS FILE

use std::io::{Read, Write};

#[allow(unused_imports)]
use types::*;
#[allow(unused_imports)]
use services::*;

#[derive(Debug, Clone, PartialEq)]
pub struct MonitoringFilterResult {
}

impl MessageInfo for MonitoringFilterResult {
    fn object_id(&self) -> ObjectId {
        ObjectId::MonitoringFilterResult_Encoding_DefaultBinary
    }
}

impl BinaryEncoder<MonitoringFilterResult> for MonitoringFilterResult {
    fn byte_len(&self) -> usize {
        0
    }

    #[allow(unused_variables)]
    fn encode<S: Write>(&self, stream: &mut S) -> EncodingResult<usize> {
        Ok(0)
    }

    #[allow(unused_variables)]
    fn decode<S: Read>(stream: &mut S) -> EncodingResult<Self> {
        Ok(MonitoringFilterResult {
        })
    }
}