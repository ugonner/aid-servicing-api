"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationContext = exports.NotificationEventType = void 0;
var NotificationEventType;
(function (NotificationEventType) {
    NotificationEventType["AID_SERVICE_PROFILE_APPLICATION"] = "Aid Service Profile Application";
    NotificationEventType["AID_SERVICE_PROFILE_VERIFICATION_UPDATE"] = "Aid Service Profile Verification Update";
    NotificationEventType["AID_SERVICE_PROFILE_APPLICATION_UPDATE"] = "Aid Service Profile Application Update";
    NotificationEventType["AID_SERVICE_PROFILE_APPLICATION_APPROVED"] = "Aid Service Profile Application Approved";
    NotificationEventType["AID_SERVICE_BOOKING_CREATION"] = "Aid Service Booking Creation";
    NotificationEventType["AID_SERVICE_BOOKING_UPDATE"] = "Aid Service Booking Update";
    NotificationEventType["AID_SERVICE_BOOKING_PROVIDER_MATCH"] = "Aid Service Booking Provider Match";
    NotificationEventType["PAYMENT_MADE"] = "Payment Made";
    NotificationEventType["REVIEW_AND_RATING_MADE"] = "Review Rating Made";
    NotificationEventType["REPORT"] = "Reported";
    NotificationEventType["REPORT_COMMENT"] = "Report Response";
    NotificationEventType["REPORT_RESOLUTION"] = "Report resolution";
})(NotificationEventType || (exports.NotificationEventType = NotificationEventType = {}));
var NotificationContext;
(function (NotificationContext) {
    NotificationContext["SERVICE_PROFILE"] = "Service Profile";
    NotificationContext["SERVICE"] = "Service";
    NotificationContext["SERVICE_BOOKING"] = "Service Booking";
    NotificationContext["PAYMENT"] = "Payment";
    NotificationContext["REPORT"] = "Report";
    NotificationContext["REVIEW_RATING"] = "Review Rating";
    NotificationContext["USER"] = "User";
})(NotificationContext || (exports.NotificationContext = NotificationContext = {}));
//# sourceMappingURL=notification.enum.js.map