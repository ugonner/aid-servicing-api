export declare enum CallState {
    INCOMING = "Incoming",
    ONGOING = "Ongoing",
    DROPPED = "Dropped",
    CALLING = "Calling",
    NONE = "None"
}
export declare enum RoomType {
    PEER_TO_PEER = "Peer_to_peer",
    CONFERENCE = "Conference"
}
export declare enum CallType {
    AUDIO = "Audio",
    VIDEO = "Video"
}
export declare enum SDPType {
    ANSWER = "Answer",
    OFFER = "Offer",
    DATA = "Data"
}
export declare enum CallQuality {
    HIGH = "High",
    LOW = "Low",
    VERY_LOW = "Very_low"
}
export declare enum IceConnectionState {
    NEW = "new",
    CONNECTING = "connecting",
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    FAILED = "failed",
    CLOSED = "closed"
}
export declare enum CallStage {
    DIALING = "Dialing",
    DIALING_IN = "Dialing In",
    RINGING = "Ringing",
    RECONNECTING = "Reconnecting",
    ENDED = "Ended",
    DROPPED = "Dropped",
    NONE = "None"
}
export declare enum callPurpose {
    AID_SERVICE = "Aid_service",
    NORMAL = "Normal"
}
