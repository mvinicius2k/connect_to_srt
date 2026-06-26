use std::{
    net::{IpAddr, Ipv4Addr, SocketAddrV4},
    time::Duration,
};

use local_ip_address::local_ip;
use srt_tokio::{
    SrtSocket,
    options::{SocketAddress, SocketHost},
};
use tokio::time::timeout;

pub enum NotSupportedIpError {
    LocalIpError(local_ip_address::Error),
    Ipv6IsNotSupported,
}

pub fn get_supported_ip() -> Result<Ipv4Addr, NotSupportedIpError> {
    let ip = local_ip().map_err(|e| NotSupportedIpError::LocalIpError(e))?;

    match ip {
        IpAddr::V4(v4) => Ok(v4),
        IpAddr::V6(_) => Err(NotSupportedIpError::Ipv6IsNotSupported),
    }
}

pub async fn scan(own_ip: Ipv4Addr) -> Vec<Ipv4Addr> {
    let [a, b, c, _] = own_ip.octets();
    let port = 10000;
    let mut avaliable_listeners: Vec<Ipv4Addr> = Vec::new();
    for d in 2..=253 {
        let ip = Ipv4Addr::new(a, b, c, d);
        let host = SocketHost::Ipv4(ip);
        let socket_adress = SocketAddress { host, port };

        if srt_ready(socket_adress, 3000).await {
            avaliable_listeners.push(ip);
        }
    }

    avaliable_listeners
}

async fn srt_ready(socket_adress: SocketAddress, timeout_millis: u64) -> bool {
    let connection_attemp = SrtSocket::builder().call(socket_adress, None);
    let res = timeout(Duration::from_millis(timeout_millis), connection_attemp).await;
    matches!(res, Ok(Ok(_)))
}
