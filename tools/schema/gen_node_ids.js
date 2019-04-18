let _ = require("lodash");
let csv = require("csv-parser");
let fs = require("fs");

let settings = require("./settings");

let status_code_csv = `${settings.schema_dir}/NodeIds.csv`;

let rs_out = fs.createWriteStream(`${settings.rs_node_ids_dir}/node_ids.rs`);

rs_out.write(`// This file was autogenerated from NodeIds.csv by tools/schema/gen_node_ids.js
// DO NOT EDIT THIS FILE

use crate::{
    node_id::{NodeId, ExpandedNodeId},
    string::UAString,
};
`);

let node_ids = {};

function interested_in_node(node) {
    return (!node.name.endsWith("_DefaultXml") && !node.name.startsWith("OpcUa_XmlSchema_"));
}

fs.createReadStream(status_code_csv)
    .pipe(csv(['name', 'id', 'type']))
    .on('data', data => {
        let node = {
            name: data.name,
            id: data.id
        };
        if (_.has(node_ids, data.type)) {
            node_ids[data.type].push(node);
        } else {
            node_ids[data.type] = [node];
        }
    })
    .on('end', () => {
        _.each(node_ids, (value, key) => {
            rs_out.write(
                `
#[allow(non_camel_case_types)]
#[derive(Debug, PartialEq, Eq, Copy, Clone, Hash)]
pub enum ${key}Id {
`);
            _.each(value, node => {
                // Skip Xml junk
                if (interested_in_node(node)) {
                    rs_out.write(`    ${node.name} = ${node.id},\n`);
                }
            });
            rs_out.write(`}\n`);

            rs_out.write(`
impl<'a> From<&'a ${key}Id> for NodeId {
    fn from(r: &'a ${key}Id) -> Self {
        NodeId::new(0, *r as u32)
    }
}

impl Into<NodeId> for ${key}Id {
    fn into(self) -> NodeId {
        NodeId::new(0, self as u32)
    }
}

impl Into<ExpandedNodeId> for ${key}Id {
    fn into(self) -> ExpandedNodeId {
        ExpandedNodeId {
            node_id: NodeId::new(0, self as u32),
            namespace_uri: UAString::null(),
            server_index: 0,
        }
    }
}

impl ${key}Id {
    pub fn from_u32(value: u32) -> Result<${key}Id, ()> {
        match value {
`);
            _.each(value, node => {
                if (interested_in_node(node)) {
                    rs_out.write(`            ${node.id} => Ok(${key}Id::${node.name}),\n`);
                }
            });

            rs_out.write(
                `            _ => Err(())
        }
    }
}
`);

        });
    });

