
export default async (req, res, next) => {
    const token = req.headers['x-fedapay-signature'];
    req.params = { token}
    next()
}
