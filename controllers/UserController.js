const ApiError = require("./../error/ApiError");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("./../db");


const generateJwt = async (user) => {
    const { id, login, role } = user;

    return await jwt.sign(
        { id, login, role },
        process.env.SICRET_KEY,
        { expiresIn: "24h" }
    );
}

class UserController {
    async registration(req, res, next) {
        try {
            const { password, login, role } = req.body;
            if (!login || !password) {
                return next(ApiError.badRequest("Введите логин или пароль"));
            }
            const candidate = await User.findOne({ where: { login } });

            if (candidate) {
                return next(ApiError.badRequest("Пользователь с таким именем уже существует"));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ role, login, password: hashPassword });
            const token = await generateJwt(user);

            res.json({ token });
        } catch (error) {
            res.json(error.message);
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;

            // const dbResponse = await sequelize.query("SELECT * FROM users WHERE email = :login OR phone = :login", {
            //     replacements: { login: login },
            // });

            const user = await User.findOne({ where: { login } });

            // const user = dbResponse[0][0];

            if (!user) {
                return next(ApiError.badRequest("Пользователь не найден"));
            }

            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError.badRequest("Не верный пароль"));
            }

            const token = await generateJwt(user);
            res.json({ token });
        } catch (error) {

        }
    }

    async check(req, res, next) {
        try {
            const token = await generateJwt(req.user);
            return res.json({ token });
        } catch (error) {
            return next(ApiError.badRequest("Не верный пароль"));
        }
    }
}

module.exports = new UserController();