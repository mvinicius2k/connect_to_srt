use crate::{
    actions::{self, get_machine_ipv4, scan, start_runner},
    models::{
        ErrorIdentifier, PlayCommandError, SRTPoint, ScanCommandError, ScanRequestDTO,
        ScanResponseDTO, SupportedMode,
    },
};

#[tauri::command]
pub fn play_command(url: String) -> Result<(), ErrorIdentifier> {
    let res = start_runner("mpv", &url);
    match res {
        Ok(..) => return Ok(()),
        Err(..) => {
            return Err(ErrorIdentifier {
                error: PlayCommandError::ExecutableNotConfigured.to_string(),
                details: None,
            })
        }
    }
}
#[tauri::command]
pub async fn scan_command() -> Result<ScanResponseDTO, ErrorIdentifier> {
    let own_ip = get_machine_ipv4().map_err(|err| match err {
        actions::NotSupportedIpError::LocalIpError(_) => ErrorIdentifier {
            error: ScanCommandError::CannotGetLocalIp.to_string(),
            details: None,
        },
        actions::NotSupportedIpError::Ipv6IsNotSupported => ErrorIdentifier {
            error: ScanCommandError::IPv6NotSupported.to_string(),
            details: None,
        },
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
