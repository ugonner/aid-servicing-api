"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callPurpose = exports.CallStage = exports.IceConnectionState = exports.CallQuality = exports.SDPType = exports.CallType = exports.RoomType = exports.CallState = void 0;
var CallState;
(function (CallState) {
    CallState["INCOMING"] = "Incoming";
    CallState["ONGOING"] = "Ongoing";
    CallState["DROPPED"] = "Dropped";
    CallState["CALLING"] = "Calling";
    CallState["NONE"] = "None";
})(CallState || (exports.CallState = CallState = {}));
var RoomType;
(function (RoomType) {
    RoomType["PEER_TO_PEER"] = "Peer_to_peer";
    RoomType["CONFERENCE"] = "Conference";
})(RoomType || (exports.RoomType = RoomType = {}));
var CallType;
(function (CallType) {
    CallType["AUDIO"] = "Audio";
    CallType["VIDEO"] = "Video";
})(CallType || (exports.CallType = CallType = {}));
var SDPType;
(function (SDPType) {
    SDPType["ANSWER"] = "Answer";
    SDPType["OFFER"] = "Offer";
    SDPType["DATA"] = "Data";
})(SDPType || (exports.SDPType = SDPType = {}));
var CallQuality;
(function (CallQuality) {
    CallQuality["HIGH"] = "High";
    CallQuality["LOW"] = "Low";
    CallQuality["VERY_LOW"] = "Very_low";
})(CallQuality || (exports.CallQuality = CallQuality = {}));
var IceConnectionState;
(function (IceConnectionState) {
    IceConnectionState["NEW"] = "new";
    IceConnectionState["CONNECTING"] = "connecting";
    IceConnectionState["CONNECTED"] = "connected";
    IceConnectionState["DISCONNECTED"] = "disconnected";
    IceConnectionState["FAILED"] = "failed";
    IceConnectionState["CLOSED"] = "closed";
})(IceConnectionState || (exports.IceConnectionState = IceConnectionState = {}));
var CallStage;
(function (CallStage) {
    CallStage["DIALING"] = "Dialing";
    CallStage["DIALING_IN"] = "Dialing In";
    CallStage["RINGING"] = "Ringing";
    CallStage["RECONNECTING"] = "Reconnecting";
    CallStage["ENDED"] = "Ended";
    CallStage["DROPPED"] = "Dropped";
    CallStage["NONE"] = "None";
})(CallStage || (exports.CallStage = CallStage = {}));
var callPurpose;
(function (callPurpose) {
    callPurpose["AID_SERVICE"] = "Aid_service";
    callPurpose["NORMAL"] = "Normal";
})(callPurpose || (exports.callPurpose = callPurpose = {}));
//# sourceMappingURL=call.enum.js.map