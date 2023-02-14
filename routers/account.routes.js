const router = require("express").Router();
const account = require("../controllers/account.controller");
router.post("/newpersonel", account.createWithPersonel);
router.post("/newcompany", account.createWithCompany);
router.get("/all", account.findAllWithAddressAndPersonel);
router.get("/companys", account.findAllCompany)
router.get("/admins", account.findAllAdmin);;
router.get("/one/:id", account.findOne);
router.delete("/delete/:id", account.deleteAccount);
router.put("/update/:id", account.update);

module.exports = router;