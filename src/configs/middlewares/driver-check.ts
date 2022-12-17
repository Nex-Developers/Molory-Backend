import { HttpResponse } from "../../utils/helpers"

export default (req, res, next) => {
  const ref = req.params.ref
  if (!ref) {
      const httpResponse = HttpResponse.serverError(req.params.lang)
      res.status(200).json(httpResponse.body) 
    } else if (ref.role !== 'driver') {
    const httpResponse = HttpResponse.unauthorizedError(req.params.lang)
    res.status(200).json(httpResponse.body) 
  } else next()
}
  