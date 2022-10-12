const Router = require("express");
const router = new Router();
const worksController = require("./../controllers/WorksController");
const checkRoleMiddleware = require("./../middlewares/checkRoleMiddleware");

router.post("/", checkRoleMiddleware(process.env.ROLE_ADMIN), worksController.create);
router.get("/item/:id", worksController.getById);
router.get("/:id", worksController.getAll);

module.exports = router;