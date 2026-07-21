use serde::{Deserialize, Serialize};
use strum_macros::Display;

#[derive(Serialize)]
pub struct ErrorIdentifier<T = ()> {
    pub error: String,
    pub details: Option<T>,
}

#[derive(Display)]
pub enum PlayCommandError {
    ExecutableNotConfigured,
    Unsuported,
}
#[derive(Deserialize)]
pub struct PlayRequestDTO {
    pub url: String,
}
#[derive(Display)]
pub enum SupportedMode {
    #[strum(to_string = "listener")]
    Listener,
    #[strum(to_string = "rendezvous")]
    Rendezvous,
}
#[derive(Serialize)]
pub struct SRTPoint {
    pub ip: String,
    pub port: u16,
    pub mode: String,
}
#[derive(Deserialize)]
pub struct ScanRequestDTO {
    pub listener: bool,
    pub rendezvous: bool,
}
#[derive(Display)]
pub enum ScanCommandError {
    CannotGetLocalIp,
    IPv6NotSupported,
}

#[derive(Serialize)]
pub struct ScanResponseDTO {
    pub points: Vec<SRTPoint>,
}
