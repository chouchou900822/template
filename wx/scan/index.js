const router = require('koa-router')()
const home = require('../controllers/home');
const funenc = require('../controllers/funenc');

router.prefix('/api')
/**
 * 测试路由
 */
router.get('/test', home.test);
/**
 * api路由
 */
router.get('/funenc/wx/scan-get-user-info', funenc.wxScanGetUserInfo);

module.exports = router;
