import { PrismaClient } from "@prisma/client"
import { PublicationDb, UserDb, WalletDb } from "../../../db"
import { askToConfirmEmail, askToResetPassword, emailConfirmationView, isValidEmail } from "../../services/email"
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
import { saveProfile } from "../../services/firebase"
import { notifyUser } from "../../services/notifications"

const prisma = new PrismaClient()
const userDb = new UserDb()
const walletDb =  new WalletDb()
const publicationDb = new PublicationDb()

const addEmailAuth =  makeAddEmailAuth({ userDb, generateToken, saveTmpToken, askToConfirmEmail, isValidEmail, hashPassword })
const checkEmail = makeCheckEmail({ userDb, generateToken, saveTmpToken, generateOtp, saveOtp, askToConfirmEmail })
const checkPassword = makeCheckPassword({  generateToken, saveToken, removeOtp, removeTmpToken, comparePasswords })
const signInWithEmailAndPassword = makeSignInWithEmailAndPassword({ userDb, comparePasswords, generateToken, saveToken })
const signInWithPhoneNumber = makeSignInWithPhoneNumber({ generateOtp, saveOtp, sendOtp, generateToken, saveTmpToken, userDb })
const confirmOtp = makeConfirmOtp({ prisma, notifyUser, saveProfile, getOtp, generateToken, saveToken, removeOtp, removeTmpToken })
const signUp = makeSignUp({ userDb, askToConfirmEmail, isValidEmail, hashPassword, generateToken, saveTmpToken, generateOtp, saveOtp, saveProfile})
const validateAccount = makeValidateAccount({  saveProfile, getOtp, generateToken, saveToken, removeOtp, removeTmpToken, notifyUser, publicationDb })
const confirmEmail = makeConfirmEmail({ removeTmpToken, verifyToken, emailConfirmationView, userDb })
const changePassword = makeChangePassword({ comparePasswords, hashPassword, userDb })
const setProfile = makeSetProfile({ userDb, notifyUser, publicationDb, saveProfile })
const getProfile = makeGetProfile({ userDb, walletDb })
const updateProfile = makeUpdateProfile({ userDb, saveProfile })
const updateAvatar = makeUpdateAvatar({ saveProfile, userDb, deleteAvatarFile})
const updateIdCard = makeUpdateIdCard({ saveProfile, userDb })
const updateDriverLicense = makeUpdateDriverLicense({ saveProfile, userDb })
const recoverPassword = makeRecoverPassword({ userDb, generateToken, saveTmpToken, askToResetPassword, generateOtp, saveOtp })
const removePassword = makeRemovePassword({ getOtp, verifyToken, userDb, generateToken, saveTmpToken, removeTmpToken })
const setPassword = makeSetPassword({ verifyToken, generateToken, saveToken, removeOtp, removeTmpToken, hashPassword, comparePasswords, getOtp })
const signOut = makeSignOut({ removeToken })
const removeAccount = makeRemoveAccount({saveProfile, userDb, removeToken})
const changeEmail = makeChangeEmail({ userDb, generateOtp, generateToken, removeToken, saveTmpToken, askToConfirmEmail, isValidEmail })
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
