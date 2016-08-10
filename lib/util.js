var getType, util;

getType = function(obj) {
  return Object.prototype.toString.call(obj);
};

util = module.exports = (function() {
  function exports() {}

  exports.isString = function(obj) {
    return '[object String]' === getType(obj);
  };

  exports.isArray = function(obj) {
    return '[object Array]' === getType(obj);
  };

  exports.isRegExp = function(obj) {
    return '[object RegExp]' === getType(obj);
  };

  exports.isNumber = function(obj) {
    return !isNaN(obj) && '[object Number]' === getType(obj);
  };

  exports.isObject = function(obj) {
    return '[object Object]' === getType(obj);
  };

  exports.isFunction = function(obj) {
    return '[object Function]' === getType(obj);
  };

  exports.isBoolean = function(obj) {
    return '[object Boolean]' === getType(obj);
  };

  exports.isUndefined = function(obj) {
    return '[object Undefined]' === getType(obj);
  };

  exports.isNull = function(obj) {
    return '[object Null]' === getType(obj);
  };

  exports.isDate = function(obj) {
    return '[object Date]' === getType(obj);
  };

  exports.isGlobal = function(obj) {
    return '[object global]' === getType(obj);
  };

  exports.isError = function(obj) {
    return obj instanceof Error && '[object Error]' === getType(obj);
  };

  exports.isBuffer = function(obj) {
    return Buffer.isBuffer(obj);
  };

  exports.isNullOrUndefined = function(obj) {
    return util.isNull(obj) || util.isUndefined(obj);
  };

  exports.isNaN = function(obj) {
    return isNaN(obj);
  };

  exports.isPrimitive = function(obj) {
    return util.isNull(obj) || util.isBoolean(obj) || util.isNumber(obj) || util.isString(obj) || util.isUndefined(obj);
  };

  exports.isGenerator = function(obj) {
    return obj && util.isFunction(obj.next) && util.isFunction(obj["throw"]);
  };

  exports.isGeneratorFunction = function(obj) {
    return obj && obj.constructor && 'GeneratorFunction' === obj.constructor.name;
  };

  exports.isPromise = function(obj) {
    return obj && util.isFunction(obj.then);
  };

  exports.type = getType;

  return exports;

})();
