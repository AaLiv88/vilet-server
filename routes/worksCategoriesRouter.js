const Router = require("express");
const router = new Router();
const WorksCategoriesController = require("../controllers/WorksCategoriesController");
const checkRoleMiddleware = require("./../middlewares/checkRoleMiddleware");

router.post("/", checkRoleMiddleware(process.env.ROLE_ADMIN), WorksCategoriesController.create);
router.get("/", WorksCategoriesController.getAll);

module.exports = router;