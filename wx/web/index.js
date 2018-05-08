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
router.get('/funenc/wx/get-user-info', funenc.wxGetUserInfo);

module.exports = router;
