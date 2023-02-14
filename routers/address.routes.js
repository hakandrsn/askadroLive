const router = require("express").Router();
const address = require("../controllers/address.controller");

router.get("/all", address.findAll);
router.get("/account/:id", address.findByAccount);
router.delete("/delete/:id", address.deleteAddress);
router.put("/update/:id", address.update);

module.exports = router;