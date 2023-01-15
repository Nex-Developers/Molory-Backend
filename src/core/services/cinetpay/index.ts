import { makeCheckCinetpayTransfert } from './check-transfert';
import { makeGetCinetpayBalance } from './get-balance';
import axios from 'axios';
import { makeCinetpayLogin } from './login';
import { makeAddCinetpayContacts } from './add-contacts';
import { makeCinetpayTransfert } from './transfert';
const cinetpayLogin = makeCinetpayLogin({ axios })
const getCinetpayBalance = makeGetCinetpayBalance({ axios, cinetpayLogin})
const addCinetpayContacts = makeAddCinetpayContacts({ axios, cinetpayLogin })
const cinetpayTransfert = makeCinetpayTransfert({ axios, cinetpayLogin })
const checkCinetpayTransfert = makeCheckCinetpayTransfert({ axios, cinetpayLogin })
export {
    cinetpayLogin,
    getCinetpayBalance,
    addCinetpayContacts,
    cinetpayTransfert,
    checkCinetpayTransfert
}
