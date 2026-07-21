use std::{
    io::Error,
    net::{IpAddr, Ipv4Addr},
    time::Duration,
};

use local_ip_address::local_ip;
use srt_tokio::{
    options::{SocketAddress, SocketHost},
    SrtSocket,
};
use strum_macros::Display;
use tokio::{
    process::{Child, Command},
    time::timeout,
};

#[derive(Display)]
pub enum NotSupportedIpError {
    LocalIpError(local_ip_address::Error),
    Ipv6IsNotSupported,
}

pub fn get_machine_ipv4() -> Result<Ipv4Addr, NotSupportedIpError> {
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
    for d in 2..=254 {
        let ip = Ipv4Addr::new(a, b, c, d);
        let host = SocketHost::Ipv4(ip);
        let socket_adress = SocketAddress { host, port };
        println!("Tentando endereço {0}:{1}", ip.to_string(), port);
        if is_adress_srt_ready(socket_adress, 500).await {
            avaliable_listeners.push(ip);
            println!("Endereço adicionado");
            break;
        }
    }

    avaliable_listeners
}

pub async fn is_adress_srt_ready(socket_adress: SocketAddress, timeout_millis: u64) -> bool {
    let connection_attemp = SrtSocket::builder().call(socket_adress, None);
    let res = timeout(Duration::from_millis(timeout_millis), connection_attemp).await;
    matches!(res, Ok(Ok(_)))
}
pub fn start_mpv(ip: Ipv4Addr, port: u16) -> Result<Child, Error> {
    let url = format!("srt://{}:{}", ip, port);
    Command::new("mpv").arg(url).spawn()
}

pub fn start_runner(runner: &str, url: &str) -> Result<Child, Error> {
    println!("Iniciando {0} {1}", runner, url);
    Command::new(runner).arg(url).spawn()
}
