import { NewsletterDb } from "../../../db"
import makeAdd from "./add"
import makeList from "./list"

const newsletterDb = new NewsletterDb()

const addNewsletter = makeAdd({ newsletterDb })
const listNewsletters = makeList({ newsletterDb })


export {
    addNewsletter,
    listNewsletters
}