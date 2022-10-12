const { Image } = require("../models");
const ApiError = require("./../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class ImageController {
    async create(req, res, next) {
        try {
            const { workId } = req.body
            const { img } = req.files;

            if (!workId || !img) {
                return next(ApiError.badRequest("ошибка"));
            }

            const fileName = uuid.v4() + ".jpg";

            const image = await Image.create({ workId, url: fileName });

            img.mv(path.resolve(__dirname, "..", "static", fileName));

            res.json(fileName)
        } catch (error) {
            res.json(error.message);
        }
    }

    async getForWork(req, res) {
        try {
            res.json("ok")
        } catch (error) {
            res.json(error.message);
        }
    }
}

module.exports = new ImageController();
