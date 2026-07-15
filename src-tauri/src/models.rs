use serde::{Deserialize, Serialize};
use strum_macros::Display;

#[derive(Display)]
pub enum PlayCommandError {
    ExecutableNotConfigured,
    Unsuported,
}

#[derive(Display)]
pub enum SupportedMode {
    Listener,
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
