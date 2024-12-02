import jwt from 'jsonwebtoken';
import config from '../../config.js'; // Update the path as needed

const verifyToken = (req, res, next) => {
    const authHeader = req.header('authorization');
    if (!authHeader) return res.sendStatus(403);

    const token = authHeader.split(" ")[1]; 
    if (!token) return res.sendStatus(403);

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export default verifyToken;