use crate::{
    actions::{self, get_machine_ipv4, scan, start_runner},
    models::{
        PlayCommandError, SRTPoint, ScanCommandError, ScanRequestDTO, ScanResponseDTO,
        SupportedMode,
    },
};

#[tauri::command]
pub fn play_command(url: String) -> Result<(), String> {
    let res = start_runner("mpv", &url);
    match res {
        Ok(..) => return Ok(()),
        Err(..) => return Err(PlayCommandError::ExecutableNotConfigured.to_string()),
    }
}
#[tauri::command]
pub async fn scan_command(dto: ScanRequestDTO) -> Result<ScanResponseDTO, String> {
    let own_ip = get_machine_ipv4().map_err(|err| match err {
        actions::NotSupportedIpError::LocalIpError(_) => {
            ScanCommandError::CannotGetLocalIp.to_string()
        }
        actions::NotSupportedIpError::Ipv6IsNotSupported => {
            ScanCommandError::IPv6NotSupported.to_string()
        }
    })?;

    let port = 10000; //Substituir por função de obter a porta
    let listener_points = scan(own_ip).await;
    let points = listener_points
        .iter()
        .map(|ipv4addr| SRTPoint {
            ip: ipv4addr.to_string(),
            port,
            mode: SupportedMode::Listener.to_string(),
        })
        .collect::<Vec<_>>();
    Ok(ScanResponseDTO { points })
}
