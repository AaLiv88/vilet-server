const Router = require("express");
const router = new Router();
const WorksCategoriesRouter = require("./worksCategoriesRouter");
const worksRouter = require("./worksRouter");
const userRouter = require("./userRouter");
const imageRouter = require("./imageRouter");

router.use("/worksCategories", WorksCategoriesRouter);
router.use("/work", worksRouter);
router.use("/image", imageRouter);
router.use("/user", userRouter);

module.exports = router;