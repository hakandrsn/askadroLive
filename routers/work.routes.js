const work = require("../controllers/work.controller");
const router = require("express").Router();
router.post("/new", work.create);
router.post("/news", work.bulkCreate);
router.get("/all", work.findAll);
router.get("/withPersonel/:id", work.findByPersonel);
router.delete("/delete/:id", work.deleteWork);
router.put("/update/:id", work.update);
module.exports = router;