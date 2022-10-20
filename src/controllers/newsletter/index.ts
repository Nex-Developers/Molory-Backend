import { addNewsletter, listNewsletters } from "../../core/use-cases/newsletter"
import makeGetItemsController from "./get-items"
import makePostController from "./post"


const postNewsletterController = makePostController({ addNewsletter })
const getNewslettersController = makeGetItemsController({ listNewsletters })

export {
    postNewsletterController,
    getNewslettersController
}
