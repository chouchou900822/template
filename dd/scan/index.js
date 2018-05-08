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
router.get('/funenc/dd/scan-get-user-info', funenc.ddScanGetUserInfo);

module.exports = router;
