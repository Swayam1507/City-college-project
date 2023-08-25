const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    console.log('fecth user')
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ success: false, msg: "Please authenticate using a valid token." })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = { name: data.name };
        next();
    } catch (error) {
        res.status(401).send({ success: false, msg: "Please authenticate using a valid token." })
    }

}


module.exports = fetchuser;