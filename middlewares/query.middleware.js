import url  from 'url';

export default function queryMiddleware (req, res, next) {
    res.locals.parsedQuery = url.parse(req.url, true).query;
    next();
};