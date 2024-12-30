const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[0];
    if (!token) return res.status(401).json({ message: 'request Error', error: 'Token is missing from the headers' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};


exports.validateBody = (requiredFields) => {
    return (req, res, next) => {
        // Check if any required field is missing in the request body

        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        
        if (missingFields.length) {
            return res.status(400).json({
                message: `Invalid Input values`,
                error : `Missing required fields: {${missingFields.join(', ')}}`
            });
        }
        
        
        // If all fields are present, proceed to the next middleware or controller
        next();
    };
};


