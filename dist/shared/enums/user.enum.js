"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisabilityType = exports.UserCallState = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "Male";
    Gender["FEMALE"] = "Female";
})(Gender || (exports.Gender = Gender = {}));
var UserCallState;
(function (UserCallState) {
    UserCallState["INCOMING"] = "Incoming";
    UserCallState["ONGOING"] = "Ongoing";
    UserCallState["DROPPED"] = "Dropped";
    UserCallState["CALLING"] = "Calling";
    UserCallState["NONE"] = "None";
})(UserCallState || (exports.UserCallState = UserCallState = {}));
var DisabilityType;
(function (DisabilityType) {
    DisabilityType["VISUAL"] = "Visual";
    DisabilityType["HEARING"] = "Hearing";
    DisabilityType["PHYSICAL"] = "Physical";
    DisabilityType["MENTAL"] = "Mental";
    DisabilityType["INTELLECTUAL"] = "Intellectual";
    DisabilityType["ALBINISM"] = "Albinism";
})(DisabilityType || (exports.DisabilityType = DisabilityType = {}));
//# sourceMappingURL=user.enum.js.map