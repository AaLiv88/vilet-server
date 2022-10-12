const jwt = require("jsonwebtoken");

module.exports = (role) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Не авторизован" });
            }
            const decoded = jwt.verify(token, process.env.SICRET_KEY);
            console.log(decoded.role, role);
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет досупа"});
            }
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "Не авторизован" });
        }
    }
}