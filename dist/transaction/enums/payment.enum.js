"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPurpose = exports.PaymentStatus = exports.PaymentMethod = void 0;
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["PAYSTACK"] = "Paystack";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PAID"] = "Paid";
    PaymentStatus["PENDING"] = "Pending";
    PaymentStatus["REFUND"] = "Refund";
    PaymentStatus["CANCELLED"] = "Cancelled";
    PaymentStatus["NOT_PAID"] = "Not Paid";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentPurpose;
(function (PaymentPurpose) {
    PaymentPurpose["FUND_DEPOSIT"] = "Fund Deposit";
    PaymentPurpose["FUND_WITHDRAWAL"] = "Fund Withdrawal";
    PaymentPurpose["SERVICE_PAYMENT"] = "Service Payment";
})(PaymentPurpose || (exports.PaymentPurpose = PaymentPurpose = {}));
//# sourceMappingURL=payment.enum.js.map