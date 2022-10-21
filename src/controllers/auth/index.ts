import { 
    confirmOtp, 
    setProfile,
    signInWithPhoneNumber,
    confirmEmail,
    signInWithEmailAndPassword,
    signUp,
    signOut,
    getProfile,
    changePassword,
    updateProfile,
    recoverPassword,
    removePassword,
    changeEmail,
    changePhoneNumber,
    removeAccount,
    updateAvatar,
    addEmailAuth,
    checkEmail,
    checkPassword,
    updateIdCard,
    updateDriverLicense,
    validateAccount,
    setPassword
} from "../../core/use-cases/authentication"
import makeCompleteInfosController from "./complete-infos"
import makeConfirmEmailController from "./confirm-email"
import makeDeleteAccountController from "./delete-account"
import makeEditAvatarController from "./edit-avatar"
import makeEditDriverLicenseController from "./edit-driver-license"
import makeEditIdCardController from "./edit-id-card"
import makeEditProfileController from "./edit-profile"
import makeEnableEmailAuthController from "./enable-email-auth"
import makeForgotPasswordController from "./forgot-password"
import makeLoginController from "./login"
import makeLogoutController from "./logout"
import makeNewEmailController from "./new-email"
import makeNewPasswordController from "./new-password"
import makeNewPhoneNumberController from "./new-phone"
import makeProfileController from "./profile"
import makeRegisterController from "./register"
import makeResetPasswordController from "./reset-password"
import makeSendOtpController from "./send-otp"
import makeSetPasswordController from "./set-password"
import makeUploadDocumentController from "./upload-document"
import makeVerifyAccountController from "./verify-account"
import makeVerifyEmailController from "./verify-email"
import makeVerifyOtpController from "./verify-otp"
import makeVerifyPasswordController from "./verify-password"

const enableEmailAuthController = makeEnableEmailAuthController({ addEmailAuth })
const sendOtpController = makeSendOtpController({ signInWithPhoneNumber })
const verifyOtpController = makeVerifyOtpController({ confirmOtp })
const completeInfosController = makeCompleteInfosController({ setProfile })
const confirmEmailController = makeConfirmEmailController({ confirmEmail })
const verifyEmailController = makeVerifyEmailController({ checkEmail })
const verifyPasswordController = makeVerifyPasswordController({ checkPassword })
const loginController = makeLoginController({ signInWithEmailAndPassword })
const registerController = makeRegisterController({ signUp })
const verifyAccountController = makeVerifyAccountController({ validateAccount })
const logoutController = makeLogoutController({  signOut })
const profileController = makeProfileController({ getProfile })
const newPasswordController = makeNewPasswordController({ changePassword })
const editProfileController = makeEditProfileController({ updateProfile })
const editAvatarController = makeEditAvatarController({ updateAvatar })
const editIdCardController = makeEditIdCardController({ updateIdCard })
const editDriverLicense = makeEditDriverLicenseController({ updateDriverLicense })
const forgotPasswordController = makeForgotPasswordController({ recoverPassword })
const resetPasswordController = makeResetPasswordController({ removePassword })
const setPasswordController = makeSetPasswordController({ setPassword })
const newEmailController = makeNewEmailController({ changeEmail })
const newPhoneNumberController = makeNewPhoneNumberController({ changePhoneNumber })
const deleteAccountController = makeDeleteAccountController({ removeAccount })
const uploadDocumentController = makeUploadDocumentController({ updateIdCard, updateDriverLicense })
export {
    sendOtpController,
    verifyOtpController,
    completeInfosController,
    confirmEmailController,
    verifyEmailController,
    verifyPasswordController,
    loginController,
    registerController,
    verifyAccountController,
    logoutController,
    profileController,
    newPasswordController,
    editProfileController,
    editAvatarController,
    editIdCardController,
    editDriverLicense,
    forgotPasswordController,
    setPasswordController,
    resetPasswordController,
    newEmailController,
    newPhoneNumberController,
    deleteAccountController,
    enableEmailAuthController,
    uploadDocumentController
}