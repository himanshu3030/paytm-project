import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";

const authmiddleware = (req, res, next) => {
    const authheader = req.headers.authorization;
    console.log("jwt token : "+authheader);
    if (!authheader || !authheader.startsWith('Bearer ')) {
       return res.status(409).json({message: "Authorization header missing or invalid"});
    }

    const token = authheader.split(' ')[1]
    try {
        const decode = jwt.verify(token, JWT_SECRET)
        console.log("after verify : " + decode.userId)
        if (decode.userId) {
            req.userId = decode.userId

           return next()
        } else {
           return res.status(409).json({message: "Invalid token payload"})
        }
    } catch (err) {
       return res.status(409).json({message: "Invalid or expired token"})
    }
}

export default authmiddleware; 