"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fedapay_1 = require("fedapay");
class FedapayManager {
    static connect() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            FedapayManager.app = fedapay_1.FedaPay;
            fedapay_1.FedaPay.setApiKey("sk_live_5XEQoAGhvm4J0B5bX79A0Qqc");
            fedapay_1.FedaPay.setEnvironment("sandbox");
            return;
        });
    }
    static createTransaction(amount, firstname, lastname, email, phoneNumber) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                fedapay_1.FedaPay.setApiKey("sk_live_5XEQoAGhvm4J0B5bX79A0Qqc");
                fedapay_1.FedaPay.setEnvironment("live");
                const transaction = yield fedapay_1.Transaction.create({
                    description: 'Description',
                    amount,
                    callback_url: 'https://molory.xyz/backend/api/validate-payment',
                    currency: {
                        iso: 'XOF'
                    },
                    customer: {
                        firstname,
                        lastname,
                        email: email || 'aroamadou@gmail.com',
                        phone_number: {
                            number: phoneNumber || '90000000',
                            country: 'TG'
                        }
                    }
                });
                const token = yield transaction.generateToken();
                return { url: token.url, transactionId: transaction.id };
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    static verifyTransaction(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            fedapay_1.FedaPay.setApiKey("sk_live_5XEQoAGhvm4J0B5bX79A0Qqc");
            fedapay_1.FedaPay.setEnvironment("live");
            const transaction = yield fedapay_1.Transaction.retrieve(id);
            return !!(transaction.status == "approved");
        });
    }
}
exports.default = FedapayManager;
//# sourceMappingURL=fedapay.js.map