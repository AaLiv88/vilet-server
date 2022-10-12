const { Work, Image } = require("../models");
const ApiError = require("./../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class WorksController {
    async create(req, res) {
        try {
            const { name, worksCategoryId, description } = req.body;
            // const { img } = req.files;
            // const fileName = uuid.v4() + ".jpg";

            const work = await Work.create({ name, worksCategoryId, description });

            // img.mv(path.resolve(__dirname, "..", "static", fileName));

            res.json(work.dataValues);
        } catch (error) {
            res.json(error.message);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const work = await Work.findOne({ where: { id } });
            const images = await Image.findAll({ where: { workId: id } })

            const imagesUrls = images.map(img => img.url);

            const result = work ? {
                id: work.id,
                name: work.name,
                description: work.description,
                imagesUrls,
            } : {};

            res.json(result);
        } catch (error) {
            res.json(error.message);
        }
    }

    async getAll(req, res) {
        try {
            let { limit, page } = req.query;
            let { id } = req.params;
            page = page || 1;
            limit = limit || 10;
            const offset = page * limit - limit;

            let works;
            if (id === "0") {
                works = await Work.findAll({
                    limit,
                    offset,
                });
            } else {
                works = await Work.findAll({
                    where: {
                        worksCategoryId: id
                    },
                    limit,
                    offset,
                });
            }

            console.log(works);

            const result = [];
            for (let i = 0; i < works.length; i++) {
                const images = await Image.findAll({
                    where: {
                        workId: works[i].id,
                    }
                });
                //todo сделать картинку если нет картинки
                result[i] = {
                    id: works[i].id,
                    name: works[i].name,
                    mainImageUrl: images[0] ? images[0].url : "нет картинки",
                }
            }

            res.json(result);
        } catch (error) {
            res.json(error.message);
        }
    }
}

module.exports = new WorksController();
