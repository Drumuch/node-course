import jwt from 'jsonwebtoken';
import CONST from '../constants/constants';

export default function checkToken (req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, CONST.secret, (err, decoded) => {
            console.log(err, decoded);
            if (err) {
                res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ success: false, message: 'No token provided.' });
    }
};