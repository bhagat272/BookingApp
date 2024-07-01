const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (authHeader && authHeader.startsWith('Bearer ')) {
            // Extract the token from the 'Bearer ' prefix
            const token = authHeader.split(' ')[1];
            console.log(token)
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Jd3!u#@zKL$7qwej21!js0D!8@&d93n#76@x0');
            // Attach decoded user data to the request object
            req.user = decoded;
            
            // Proceed to the next middleware or route handler
            next();
        } else {
            return res.status(401).json({ error: "Unauthorized" });
        }
    } catch (error) {
        return res.status(401).json({ error: "Token verification failed or invalid token" });
    }
};

module.exports = protect;
