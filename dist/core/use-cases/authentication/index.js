"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.checkEmail = exports.changePhoneNumber = exports.changeEmail = exports.removeAccount = exports.signOut = exports.recoverPassword = exports.updateDriverLicense = exports.updateIdCard = exports.updateAvatar = exports.updateProfile = exports.getProfile = exports.setProfile = exports.changePassword = exports.removePassword = exports.confirmEmail = exports.validateAccount = exports.signUp = exports.confirmOtp = exports.signInWithPhoneNumber = exports.signInWithEmailAndPassword = exports.addEmailAuth = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const db_1 = require("../../../db");
const email_1 = require("../../services/email");
const otp_1 = require("../../services/otp");
const password_1 = require("../../services/password");
const token_1 = require("../../services/token");
const upload_1 = require("../../services/upload");
const change_email_1 = (0, tslib_1.__importDefault)(require("./change-email"));
const change_password_1 = (0, tslib_1.__importDefault)(require("./change-password"));
const change_phone_number_1 = (0, tslib_1.__importDefault)(require("./change-phone-number"));
const confirm_email_1 = (0, tslib_1.__importDefault)(require("./confirm-email"));
const confirm_otp_1 = (0, tslib_1.__importDefault)(require("./confirm-otp"));
const get_profile_1 = (0, tslib_1.__importDefault)(require("./get-profile"));
const recover_password_1 = (0, tslib_1.__importDefault)(require("./recover-password"));
const remove_password_1 = (0, tslib_1.__importDefault)(require("./remove-password"));
const set_profile_1 = (0, tslib_1.__importDefault)(require("./set-profile"));
const sign_in_with_email_and_password_1 = (0, tslib_1.__importDefault)(require("./sign-in-with-email-and-password"));
const sign_in_with_phone_number_1 = (0, tslib_1.__importDefault)(require("./sign-in-with-phone-number"));
const sign_out_1 = (0, tslib_1.__importDefault)(require("./sign-out"));
const sign_up_1 = (0, tslib_1.__importDefault)(require("./sign-up"));
const update_avatar_1 = (0, tslib_1.__importDefault)(require("./update-avatar"));
const update_profile_1 = (0, tslib_1.__importDefault)(require("./update-profile"));
const remove_account_1 = (0, tslib_1.__importDefault)(require("./remove-account"));
const add_email_auth_1 = (0, tslib_1.__importDefault)(require("./add-email-auth"));
const check_email_1 = (0, tslib_1.__importDefault)(require("./check-email"));
const check_password_1 = (0, tslib_1.__importDefault)(require("./check-password"));
const update_id_card_1 = (0, tslib_1.__importDefault)(require("./update-id-card"));
const update_driver_license_1 = (0, tslib_1.__importDefault)(require("./update-driver-license"));
const validate_acount_1 = (0, tslib_1.__importDefault)(require("./validate-acount"));
const prisma = new client_1.PrismaClient();
const userDb = new db_1.UserDb();
const deviceDb = new db_1.DeviceDb();
const addEmailAuth = (0, add_email_auth_1.default)({ userDb, generateToken: token_1.generateToken, saveTmpToken: token_1.saveTmpToken, askToConfirmEmail: email_1.askToConfirmEmail, isValidEmail: email_1.isValidEmail, hashPassword: password_1.hashPassword });
exports.addEmailAuth = addEmailAuth;
const checkEmail = (0, check_email_1.default)({ userDb, generateToken: token_1.generateToken, saveTmpToken: token_1.saveTmpToken, generateOtp: otp_1.generateOtp, saveOtp: otp_1.saveOtp, askToConfirmEmail: email_1.askToConfirmEmail });
exports.checkEmail = checkEmail;
const checkPassword = (0, check_password_1.default)({ userDb, deviceDb, generateToken: token_1.generateToken, saveToken: token_1.saveToken, removeOtp: otp_1.removeOtp, removeTmpToken: token_1.removeTmpToken, comparePasswords: password_1.comparePasswords });
exports.checkPassword = checkPassword;
const signInWithEmailAndPassword = (0, sign_in_with_email_and_password_1.default)({ userDb, comparePasswords: password_1.comparePasswords, generateToken: token_1.generateToken, saveToken: token_1.saveToken });
exports.signInWithEmailAndPassword = signInWithEmailAndPassword;
const signInWithPhoneNumber = (0, sign_in_with_phone_number_1.default)({ generateOtp: otp_1.generateOtp, saveOtp: otp_1.saveOtp, sendOtp: otp_1.sendOtp, generateToken: token_1.generateToken, saveTmpToken: token_1.saveTmpToken, userDb });
exports.signInWithPhoneNumber = signInWithPhoneNumber;
const confirmOtp = (0, confirm_otp_1.default)({ prisma, getOtp: otp_1.getOtp, userDb, deviceDb, generateToken: token_1.generateToken, saveToken: token_1.saveToken, removeOtp: otp_1.removeOtp, removeTmpToken: token_1.removeTmpToken });
exports.confirmOtp = confirmOtp;
const signUp = (0, sign_up_1.default)({ userDb, askToConfirmEmail: email_1.askToConfirmEmail, isValidEmail: email_1.isValidEmail, hashPassword: password_1.hashPassword, generateToken: token_1.generateToken, saveTmpToken: token_1.saveTmpToken, generateOtp: otp_1.generateOtp, saveOtp: otp_1.saveOtp });
exports.signUp = signUp;
const validateAccount = (0, validate_acount_1.default)({ prisma, getOtp: otp_1.getOtp, userDb, deviceDb, generateToken: token_1.generateToken, saveToken: token_1.saveToken, removeOtp: otp_1.removeOtp, removeTmpToken: token_1.removeTmpToken });
exports.validateAccount = validateAccount;
const confirmEmail = (0, confirm_email_1.default)({ removeTmpToken: token_1.removeTmpToken, verifyToken: token_1.verifyToken, emailConfirmationView: email_1.emailConfirmationView, userDb });
exports.confirmEmail = confirmEmail;
const removePassword = (0, remove_password_1.default)({ removeTmpToken: token_1.removeTmpToken, verifyToken: token_1.verifyToken, resetPasswordView: email_1.resetPasswordView, userDb });
exports.removePassword = removePassword;
const changePassword = (0, change_password_1.default)({ removeToken: token_1.removeToken, comparePasswords: password_1.comparePasswords, hashPassword: password_1.hashPassword, userDb });
exports.changePassword = changePassword;
const setProfile = (0, set_profile_1.default)({ userDb });
exports.setProfile = setProfile;
const getProfile = (0, get_profile_1.default)({ userDb });
exports.getProfile = getProfile;
const updateProfile = (0, update_profile_1.default)({ userDb });
exports.updateProfile = updateProfile;
const updateAvatar = (0, update_avatar_1.default)({ userDb, deleteAvatarFile: upload_1.deleteAvatarFile });
exports.updateAvatar = updateAvatar;
const updateIdCard = (0, update_id_card_1.default)({ userDb });
exports.updateIdCard = updateIdCard;
const updateDriverLicense = (0, update_driver_license_1.default)({ userDb });
exports.updateDriverLicense = updateDriverLicense;
const recoverPassword = (0, recover_password_1.default)({ userDb, generateToken: token_1.generateToken, saveTmpToken: token_1.saveTmpToken, askToResetPassword: email_1.askToResetPassword });
exports.recoverPassword = recoverPassword;
const signOut = (0, sign_out_1.default)({ removeToken: token_1.removeToken });
exports.signOut = signOut;
const removeAccount = (0, remove_account_1.default)({ userDb, removeToken: token_1.removeToken });
exports.removeAccount = removeAccount;
const changeEmail = (0, change_email_1.default)({ userDb, generateToken: token_1.generateToken, removeToken: token_1.removeToken, saveTmpToken: token_1.saveTmpToken, askToConfirmEmail: email_1.askToConfirmEmail, isValidEmail: email_1.isValidEmail });
exports.changeEmail = changeEmail;
const changePhoneNumber = (0, change_phone_number_1.default)({ userDb, generateOtp: otp_1.generateOtp, saveOtp: otp_1.saveOtp, sendOtp: otp_1.sendOtp, generateToken: token_1.generateToken, removeToken: token_1.removeToken, saveTmpToken: token_1.saveTmpToken });
exports.changePhoneNumber = changePhoneNumber;
//# sourceMappingURL=index.js.map