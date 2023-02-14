const personel = require("../controllers/personel.controller");
const router = require("express").Router();
router.get("/all", personel.findAll);
router.get("/one/:id", personel.findById);
router.delete("/delete/:id", personel.deletePersonel);
router.put("/update/:id", personel.updatePersonel);
module.exports = router;