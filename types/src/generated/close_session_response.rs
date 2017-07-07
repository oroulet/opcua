// This file was autogenerated from Opc.Ua.Types.bsd.xml
// DO NOT EDIT THIS FILE

use std::io::{Read, Write};

#[allow(unused_imports)]
use super::super::*;

/// Closes a session with the server.
#[derive(Debug, Clone, PartialEq)]
pub struct CloseSessionResponse {
    pub response_header: ResponseHeader,
}

impl MessageInfo for CloseSessionResponse {
    fn object_id(&self) -> ObjectId {
        ObjectId::CloseSessionResponse_Encoding_DefaultBinary
    }
}

impl BinaryEncoder<CloseSessionResponse> for CloseSessionResponse {
    fn byte_len(&self) -> usize {
        let mut size = 0;
        size += self.response_header.byte_len();
        size
    }

    #[allow(unused_variables)]
    fn encode<S: Write>(&self, stream: &mut S) -> EncodingResult<usize> {
        let mut size = 0;
        size += self.response_header.encode(stream)?;
        Ok(size)
    }

    #[allow(unused_variables)]
    fn decode<S: Read>(stream: &mut S) -> EncodingResult<Self> {
        let response_header = ResponseHeader::decode(stream)?;
        Ok(CloseSessionResponse {
            response_header,
        })
    }
}