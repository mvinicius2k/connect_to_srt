#[cfg(test)]
mod tests {
    use super::*;
    use mpv_to_vmix::actions::{get_machine_ipv4, is_adress_srt_ready, scan};
    use srt_tokio::options::{SocketAddress, SocketHost};
    use std::net::Ipv4Addr;

    const OWN_IP: Ipv4Addr = Ipv4Addr::new(192, 168, 0, 13);
    const VMIX_IP: Ipv4Addr = Ipv4Addr::new(192, 168, 0, 12);
    const VMIX_SRT_PORT: u16 = 10000;

    #[test]
    fn get_machine_ipv4_can_be_executed() {
        let res = get_machine_ipv4();
        match res {
            Err(_) => panic!("Erro ao obter IP"),
            Ok(data) => assert_eq!(data, OWN_IP),
        }
    }

    #[tokio::test]
    async fn is_adress_srt_ready_can_see_vmix() {
        let socket_adress = SocketAddress {
            host: SocketHost::Ipv4(VMIX_IP),
            port: VMIX_SRT_PORT,
        };
        let is_ready = is_adress_srt_ready(socket_adress, 500).await;
        assert!(is_ready)
    }
    #[tokio::test]
    async fn scan_can_discovery_first_srt_caller() {
        let all = scan(OWN_IP, 1).await;
        assert_eq!(all.len(), 1);
    }
}
