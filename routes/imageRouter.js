const Router = require("express");
const router = new Router();
const imageController = require("./../controllers/imageController");
const checkRoleMiddleware = require("../middlewares/checkRoleMiddleware");

router.post("/", checkRoleMiddleware(process.env.ROLE_ADMIN), imageController.create);
router.get("/", imageController.getForWork);

module.exports = router;