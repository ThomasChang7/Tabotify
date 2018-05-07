var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Router = require('koa-router');
var passport = require('koa-passport');

var router = new Router();

router.get('/login', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.redirect('/auth/spotify');

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

router.get('/auth/spotify', passport.authenticate('spotify', {
  scope: 'user-read-email  playlist-modify-private',
  showDialog: true
}));

router.get('/callback', passport.authenticate('spotify', {
  failureRedirect: '/login',
  successRedirect: '/'
}), function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ctx.redirect('/');

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

router.get('/logout', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            ctx.logout();
            ctx.redirect('/');

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());

module.exports = router;
//# sourceMappingURL=auth.js.map