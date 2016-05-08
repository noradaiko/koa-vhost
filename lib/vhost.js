const util = require('jistype')
const debug = require('debug')('koa-vhost')
const compose = require('koa-compose')


module.exports = function (vhosts, app) {
  if(util.isObject(vhosts)) {
    vhosts = [vhosts]
  }
  else if ((util.isString(vhosts) || util.isRegExp(vhosts)) && !util.isUndefined(app)) {
    vhosts = [{
      host: vhosts
            , app: app
    }]
  }

  if (!util.isArray(vhosts)) {
    throw new Error('vhost define error')
    process.exit(1)
  }

  // trim host's leading `http://` or `https://`
  vhosts.forEach(function (vhost) {
    if(util.isString(vhost.host)) {
      vhost.host = vhost.host.replace(/^https?:\/\//, '')
    }
  })

  // compose the app's middleware to one middleware
  vhosts.forEach(function (vhost) {
    vhost.middleware = compose(vhost.app.middleware)
  })

  return (ctx, next)=> {
    var hostname, vhost, match, length

    hostname = ctx.hostname
    length = vhosts.length

    for(var i = 0; i < length; i++){
      vhost = vhosts[i]
      debug('test host: %s', vhost.host)
      if((util.isString(vhost.host) && hostname === vhost.host) || (util.isRegExp(vhost.host) && hostname.match(vhost.host))){
        match = true
        debug('matched host: %s', vhost.host)
        break
      }
    }

    if(match){
      // matched specific host, so run the server,
      // without invoke the next server's middlewares or next middleware
      return vhost.middleware(ctx/*, next*/)
    }else{
      // none server is matched,
      // so to next middleware or next server
      return next()
    }
  }
}
