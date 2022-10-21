import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    langCheck, 
    tmpAuthCheck, 
    authCheck,
    fileUpload,
    queryParser
} from "../../configs/middlewares"
import { 
    completeInfosController,
    confirmEmailController,
    deleteAccountController,
    editAvatarController,
    editDriverLicense,
    editIdCardController,
    editProfileController,
    enableEmailAuthController,
    forgotPasswordController,
    loginController,
    logoutController,
    newEmailController,
    newPasswordController,
    newPhoneNumberController,
    profileController,
    registerController,
    resetPasswordController,
    sendOtpController,
    setPasswordController,
    uploadDocumentController,
    verifyAccountController,
    verifyEmailController,
    verifyOtpController, 
    verifyPasswordController
} from "../../controllers/auth"

export default () => {
    const router = express.Router()
    router.post('/send-otp', langCheck, expressRouterAdapter(sendOtpController))
    router.post('/verify-otp', langCheck, tmpAuthCheck, expressRouterAdapter(verifyOtpController))
    router.post('/complete-profile', langCheck, authCheck, expressRouterAdapter(completeInfosController))
    router.post('/add-email-auth', langCheck, authCheck, expressRouterAdapter(enableEmailAuthController))
    router.post('/verify-email', langCheck, expressRouterAdapter(verifyEmailController))
    router.post('/verify-password', langCheck,tmpAuthCheck, expressRouterAdapter(verifyPasswordController))
    router.get('/confirm-email', langCheck, queryParser, expressRouterAdapter(confirmEmailController, 'html'))
    router.post('/login', langCheck, expressRouterAdapter(loginController))
    router.post('/register', langCheck, expressRouterAdapter(registerController))
    router.post('/verify-account', langCheck, tmpAuthCheck, expressRouterAdapter(verifyAccountController))
    router.post('/logout', langCheck, authCheck, expressRouterAdapter(logoutController))
    router.get('/profile', langCheck, authCheck, expressRouterAdapter(profileController))
    router.post('/new-password', langCheck, authCheck, expressRouterAdapter(newPasswordController))
    router.post('/forgot-password', langCheck, expressRouterAdapter(forgotPasswordController))
    router.post('/set-password', langCheck, tmpAuthCheck, expressRouterAdapter(setPasswordController))
    router.post('/edit-profile', langCheck, authCheck, expressRouterAdapter(editProfileController))
    router.post('/edit-avatar', langCheck, authCheck, fileUpload.single('avatar'), expressRouterAdapter(editAvatarController))
    router.post('/id-card', langCheck, authCheck, fileUpload.array('idCard', 2), expressRouterAdapter(editIdCardController))
    router.post('/driver-license', langCheck, authCheck, fileUpload.array('driverLicense', 2), expressRouterAdapter(editDriverLicense))
    router.post('/upload-document',langCheck, authCheck, fileUpload.fields([{ name: 'idCard', maxCount: 2}, { name: 'driverLicense', maxCount: 2}]), expressRouterAdapter(uploadDocumentController))
    router.get('/reset-password', langCheck, queryParser, expressRouterAdapter(resetPasswordController))
    router.post('/new-email', langCheck, authCheck, expressRouterAdapter(newEmailController))
    router.post('/new-phonenumber', langCheck, authCheck, expressRouterAdapter(newPhoneNumberController))
    router.post('/delete-account', langCheck, authCheck, expressRouterAdapter(deleteAccountController))
    // 
    return router
    // complete profil
}

