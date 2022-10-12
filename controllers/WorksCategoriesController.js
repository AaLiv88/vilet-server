const { WorksCategories } = require("../models");
const ApiError = require("./../error/ApiError");

class WorksCategoriesController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const category = await WorksCategories.create({ name });
            res.json(category.dataValues);
        } catch (error) {
            res.json(error.message);
        }
    }

    async getAll(req, res) {
        try {
            const categories = await WorksCategories.findAll();
            res.json(categories);
        } catch (error) {
            res.json(error.message);
        }
    }
}

module.exports = new WorksCategoriesController();
