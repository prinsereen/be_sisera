import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        console.log(decoded)
        req.user = {
            Id: decoded.Id,
            Name: decoded.Name,
            Email: decoded.Email,
        };
        console.log(req.user)
        next();
    });
};
