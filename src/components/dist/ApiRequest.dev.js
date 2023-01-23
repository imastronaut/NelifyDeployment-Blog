"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var apiRequest = function apiRequest() {
  var url,
      optionsObj,
      errMsg,
      response,
      _args = arguments;
  return regeneratorRuntime.async(function apiRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = _args.length > 0 && _args[0] !== undefined ? _args[0] : '';
          optionsObj = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
          errMsg = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(url, optionsObj));

        case 6:
          response = _context.sent;

          if (response.ok) {
            _context.next = 9;
            break;
          }

          throw Error("Please reload the page");

        case 9:
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          errMsg(_context.t0.message);

        case 14:
          _context.prev = 14;
          return _context.abrupt("return", errMsg);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 11, 14, 17]]);
};

var _default = apiRequest;
exports["default"] = _default;
//# sourceMappingURL=ApiRequest.dev.js.map
