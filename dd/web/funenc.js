const request = require('request-promise');

async function invoke(method, uri, qs, body) {
  var result = await request({
    method: method,
    uri: uri,
    qs: qs,
    body: body,
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache'
    },
    json: true
  });
  return result;
}

exports.ddGetUserInfo = async (ctx, next) => {
  let query = ctx.query;
  let simpileRes = await invoke('GET', 'http://service.funenc.com/api/dingding/getuserinfo', query);
  query.targetuserid = simpileRes.userid;
  let user = await invoke('GET', 'http://service.funenc.com/api/dingding/get', query);
  console.log(user);
  ctx.body = {
    user: user
  }
}

exports.ddSign = async (ctx, next) => {
  let query = ctx.query;
  query.signedUrl = ctx.header.origin;
  let configJson = await invoke('GET', 'http://service.funenc.com/api/dingding/sign', query);
  ctx.body = {
    config: configJson.config
  }
}