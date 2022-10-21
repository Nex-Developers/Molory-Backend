import { PrismaClient } from "@prisma/client"
import { DeviceDb, UserDb } from "../../../db"
import { askToConfirmEmail, askToResetPassword, emailConfirmationView, isValidEmail, resetPasswordView } from "../../services/email"
import { generateOtp, getOtp, removeOtp, saveOtp, sendOtp } from "../../services/otp"
import { comparePasswords, hashPassword } from "../../services/password"
import { generateToken, removeTmpToken, removeToken, saveTmpToken, saveToken, verifyToken } from "../../services/token"
import { deleteAvatarFile } from "../../services/upload"
import makeChangeEmail from "./change-email"

import makeChangePassword from "./change-password"
import makeChangePhoneNumber from "./change-phone-number"
import makeConfirmEmail from "./confirm-email"
import makeConfirmOtp from "./confirm-otp"
import makeGetProfile from "./get-profile"
import makeRecoverPassword from "./recover-password"
import makeRemovePassword from "./remove-password"
import makeSetProfile from "./set-profile"
import makeSignInWithEmailAndPassword from "./sign-in-with-email-and-password"
import makeSignInWithPhoneNumber from "./sign-in-with-phone-number"
import makeSignOut from "./sign-out"
import makeSignUp from "./sign-up"
import makeUpdateAvatar from "./update-avatar"
import makeUpdateProfile from "./update-profile"
import makeRemoveAccount from "./remove-account"
import makeAddEmailAuth from "./add-email-auth"
import makeCheckEmail from "./check-email"
import makeCheckPassword from "./check-password"
import makeUpdateIdCard from "./update-id-card"
import makeUpdateDriverLicense from "./update-driver-license"
import makeValidateAccount from "./validate-acount"
import makeSetPassword from "./set-password"

const prisma = new PrismaClient()
const userDb = new UserDb()
const deviceDb = new DeviceDb()

const addEmailAuth =  makeAddEmailAuth({ userDb, generateToken, saveTmpToken, askToConfirmEmail, isValidEmail, hashPassword })
const checkEmail = makeCheckEmail({ userDb, generateToken, saveTmpToken, generateOtp, saveOtp, askToConfirmEmail })
const checkPassword = makeCheckPassword({  userDb, deviceDb, generateToken, saveToken, removeOtp, removeTmpToken, comparePasswords })
const signInWithEmailAndPassword = makeSignInWithEmailAndPassword({ userDb, comparePasswords, generateToken, saveToken })
const signInWithPhoneNumber = makeSignInWithPhoneNumber({ generateOtp, saveOtp, sendOtp, generateToken, saveTmpToken, userDb })
const confirmOtp = makeConfirmOtp({ prisma, getOtp, userDb, deviceDb, generateToken, saveToken, removeOtp, removeTmpToken })
const signUp = makeSignUp({ userDb, askToConfirmEmail, isValidEmail, hashPassword, generateToken, saveTmpToken, generateOtp, saveOtp})
const validateAccount = makeValidateAccount({ prisma, getOtp, userDb, deviceDb, generateToken, saveToken, removeOtp, removeTmpToken })
const confirmEmail = makeConfirmEmail({ removeTmpToken, verifyToken, emailConfirmationView, userDb })
const removePassword = makeRemovePassword({ removeTmpToken, verifyToken, resetPasswordView, userDb })
const changePassword = makeChangePassword({ removeToken, comparePasswords, hashPassword, userDb })
const setProfile = makeSetProfile({ userDb })
const getProfile = makeGetProfile({ userDb })
const updateProfile = makeUpdateProfile({ userDb })
const updateAvatar = makeUpdateAvatar({ userDb, deleteAvatarFile})
const updateIdCard = makeUpdateIdCard({ userDb })
const updateDriverLicense = makeUpdateDriverLicense({ userDb })
const recoverPassword = makeRecoverPassword({ userDb, generateToken, saveTmpToken, askToResetPassword, generateOtp, saveOtp })
const setPassword = makeSetPassword({ prisma, getOtp, userDb, deviceDb, generateToken, saveToken, removeOtp, removeTmpToken, hashPassword })
const signOut = makeSignOut({ removeToken })
const removeAccount = makeRemoveAccount({ userDb, removeToken})
const changeEmail = makeChangeEmail({ userDb, generateToken, removeToken, saveTmpToken, askToConfirmEmail, isValidEmail })
const changePhoneNumber = makeChangePhoneNumber({ userDb, generateOtp, saveOtp, sendOtp, generateToken, removeToken, saveTmpToken })

export {
    addEmailAuth,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    confirmOtp,
    signUp,
    validateAccount,
    confirmEmail,
    removePassword,
    changePassword,
    setProfile,
    getProfile,
    updateProfile,
    updateAvatar,
    updateIdCard,
    updateDriverLicense,
    recoverPassword,
    setPassword,
    signOut,
    removeAccount,
    changeEmail,
    changePhoneNumber,
    checkEmail,
    checkPassword
}
