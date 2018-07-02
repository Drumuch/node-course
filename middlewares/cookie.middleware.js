export default function cookieMiddleware (req, res, next) {
    res.locals.parsedCookies = req.cookies;
    next();
};