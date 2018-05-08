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

exports.ddScanGetUserInfo = async (ctx, next) => {
  let query = ctx.query;
  let user = await invoke('GET', 'http://service.funenc.com/api/dingding/sns/getuserinfo', query);
  console.log(user);
  ctx.body = {
    user: user
  }
}