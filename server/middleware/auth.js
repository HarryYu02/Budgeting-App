import jwt from 'jsonwebtoken'; // for authorization (api endpoints which require authentication)

export const verifyToken = async (req, res, next) => {
    try {
        // grab token from header in request
        let token = req.header('Authorization');
        
        // if token doesn't exist
        if (!token) {
            return res.status(403).json({ error: 'Access Denied. ' });
        }

        // if token starts with 'Bearer ', trim it to get the token
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }

        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        // run the next function / middleware
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}