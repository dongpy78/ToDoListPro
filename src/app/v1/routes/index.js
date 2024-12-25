const express = require('express');
const router = express.Router();


router.use("/users", require("./users")); //! Tuyến đường lớn đi vào nhánh nhỏ
router.use("/auth", require("./auth")); //! Tuyến đường lớn đi vào nhánh nhỏ

module.exports = router;