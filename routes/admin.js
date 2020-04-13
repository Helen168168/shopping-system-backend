const express = require('express');
const Admin = require('../controller/admin/admin')
const router = express.Router();

router.post('/login', Admin.login) //登录接口

module.exports = router;
