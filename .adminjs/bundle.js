(function (React, designSystem) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var ImageUploadButton = function ImageUploadButton() {
    var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      selectedImage = _useState2[0],
      setSelectedImage = _useState2[1];
    var _useState3 = React.useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      imageUrl = _useState4[0],
      setImageUrl = _useState4[1];
    var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isCopied = _useState6[0],
      setIsCopied = _useState6[1];
    var handleImageChange = function handleImageChange(event) {
      var file = event.target.files[0];
      // You can perform additional validation or processing here if needed

      setSelectedImage(file);
    };
    var handleUpload = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var formData, currentUrl, currentUrlParts, postUrl, response, responseData;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // You can implement the logic to upload the selectedImage here
              console.log("Upload logic goes here:", selectedImage);
              _context.prev = 1;
              formData = new FormData();
              formData.append('image', selectedImage);
              currentUrl = window.location.href;
              currentUrlParts = currentUrl.split('/');
              postUrl = currentUrlParts.slice(0, currentUrlParts.length - 1).join('/') + '/uploadImage';
              console.log(postUrl);
              _context.next = 10;
              return fetch(postUrl, {
                method: 'POST',
                body: formData
              });
            case 10:
              response = _context.sent;
              if (!response.ok) {
                _context.next = 20;
                break;
              }
              _context.next = 14;
              return response.json();
            case 14:
              responseData = _context.sent;
              console.log(responseData);
              setImageUrl(responseData.imageUrl);
              console.log('Image uploaded successfully:', responseData);
              _context.next = 21;
              break;
            case 20:
              console.error('Error uploading image:', response.statusText);
            case 21:
              _context.next = 26;
              break;
            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](1);
              console.error('Error uploading image:', _context.t0);
            case 26:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 23]]);
      }));
      return function handleUpload() {
        return _ref.apply(this, arguments);
      };
    }();
    var handleCopyToClipboard = function handleCopyToClipboard() {
      navigator.clipboard.writeText(imageUrl).then(function () {
        setIsCopied(true);
        setTimeout(function () {
          return setIsCopied(false);
        }, 2000);
      })["catch"](function (error) {
        return console.error('Failed to copy text:', error);
      });
    };
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "20px"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Input, {
      type: "file",
      accept: "image/*",
      onChange: handleImageChange
    }), selectedImage && /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      marginTop: "10px",
      padding: "10px",
      border: "2px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      maxWidth: "80%",
      wordBreak: "break-all",
      textAlign: "center"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Text, {
      margin: "0 0 10px 0",
      fontSize: "16px",
      color: "#333"
    }, "Preview:"), /*#__PURE__*/React__default["default"].createElement("img", {
      src: URL.createObjectURL(selectedImage),
      alt: "Preview",
      style: {
        maxWidth: '100%',
        maxHeight: '300px',
        marginBottom: '10px'
      }
    }), /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      display: "block",
      marginTop: "10px"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Button, {
      variant: "primary",
      onClick: handleUpload
    }, "Upload Image"))), imageUrl && /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      marginTop: "10px",
      padding: "10px",
      border: "2px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      maxWidth: "80%",
      wordBreak: "break-all",
      textAlign: "center"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Text, {
      margin: "0 0 10px 0",
      fontSize: "16px",
      color: "#333"
    }, "Image URL: ", imageUrl), /*#__PURE__*/React__default["default"].createElement(designSystem.Button, {
      variant: "primary",
      onClick: handleCopyToClipboard
    }, isCopied ? 'Copied!' : 'Copy to Clipboard')));
  };
  var Dashboard = function Dashboard() {
    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, {
      marginBottom: "200px"
    }, /*#__PURE__*/React__default["default"].createElement("section", {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "32px"
      }
    }, /*#__PURE__*/React__default["default"].createElement("p", {
      style: {
        // fontSize: "3rem",
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        fontSize: "3rem",
        fontWeight: "700"
      }
    }, "OneStop"), /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        fontSize: "3rem",
        fontWeight: "normal",
        color: "#282828"
      }
    }, " ", "Admin"))), /*#__PURE__*/React__default["default"].createElement(ImageUploadButton, null));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = Dashboard;

})(React, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9hZG1pbl9wYW5lbC91aS9wYWdlcy9kYXNoYm9hcmQuanN4IiwiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZVN0YXRlfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtCb3gsIEJ1dHRvbiwgSW5wdXQsIFRleHR9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XHJcblxyXG5cclxuY29uc3QgSW1hZ2VVcGxvYWRCdXR0b24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBbc2VsZWN0ZWRJbWFnZSwgc2V0U2VsZWN0ZWRJbWFnZV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICAgIGNvbnN0IFtpbWFnZVVybCwgc2V0SW1hZ2VVcmxdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgICBjb25zdCBbaXNDb3BpZWQsIHNldElzQ29waWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVJbWFnZUNoYW5nZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgICAgLy8gWW91IGNhbiBwZXJmb3JtIGFkZGl0aW9uYWwgdmFsaWRhdGlvbiBvciBwcm9jZXNzaW5nIGhlcmUgaWYgbmVlZGVkXHJcblxyXG4gICAgICAgIHNldFNlbGVjdGVkSW1hZ2UoZmlsZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVVwbG9hZCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICAvLyBZb3UgY2FuIGltcGxlbWVudCB0aGUgbG9naWMgdG8gdXBsb2FkIHRoZSBzZWxlY3RlZEltYWdlIGhlcmVcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlVwbG9hZCBsb2dpYyBnb2VzIGhlcmU6XCIsIHNlbGVjdGVkSW1hZ2UpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCBzZWxlY3RlZEltYWdlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFVybFBhcnRzID0gY3VycmVudFVybC5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3N0VXJsID0gY3VycmVudFVybFBhcnRzLnNsaWNlKDAsIGN1cnJlbnRVcmxQYXJ0cy5sZW5ndGggLSAxKS5qb2luKCcvJykgKyAnL3VwbG9hZEltYWdlJztcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocG9zdFVybCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocG9zdFVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBmb3JtRGF0YSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBzZXRJbWFnZVVybChyZXNwb25zZURhdGEuaW1hZ2VVcmwpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ltYWdlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseTonLCByZXNwb25zZURhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBsb2FkaW5nIGltYWdlOicsIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBsb2FkaW5nIGltYWdlOicsIGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVDb3B5VG9DbGlwYm9hcmQgPSAoKSA9PiB7XHJcbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoaW1hZ2VVcmwpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldElzQ29waWVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRJc0NvcGllZChmYWxzZSksIDIwMDApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY29weSB0ZXh0OicsIGVycm9yKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoPEJveCBkaXNwbGF5PVwiZmxleFwiIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgbWFyZ2luVG9wPVwiMjBweFwiPlxyXG4gICAgICAgIDxJbnB1dCB0eXBlPVwiZmlsZVwiIGFjY2VwdD1cImltYWdlLypcIiBvbkNoYW5nZT17aGFuZGxlSW1hZ2VDaGFuZ2V9Lz5cclxuICAgICAgICB7c2VsZWN0ZWRJbWFnZSAmJiAoXHJcbiAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgIG1hcmdpblRvcD1cIjEwcHhcIlxyXG4gICAgICAgICAgICAgICAgcGFkZGluZz1cIjEwcHhcIlxyXG4gICAgICAgICAgICAgICAgYm9yZGVyPVwiMnB4IHNvbGlkICNjY2NcIlxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiOHB4XCJcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcj1cIiNmOWY5ZjlcIlxyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg9XCI4MCVcIlxyXG4gICAgICAgICAgICAgICAgd29yZEJyZWFrPVwiYnJlYWstYWxsXCJcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbj1cImNlbnRlclwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxUZXh0IG1hcmdpbj1cIjAgMCAxMHB4IDBcIiBmb250U2l6ZT1cIjE2cHhcIiBjb2xvcj1cIiMzMzNcIj5cclxuICAgICAgICAgICAgICAgICAgICBQcmV2aWV3OlxyXG4gICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9e1VSTC5jcmVhdGVPYmplY3RVUkwoc2VsZWN0ZWRJbWFnZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlByZXZpZXdcIlxyXG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT17e21heFdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogJzMwMHB4JywgbWFyZ2luQm90dG9tOiAnMTBweCd9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxCb3ggZGlzcGxheT1cImJsb2NrXCIgbWFyZ2luVG9wPVwiMTBweFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVVcGxvYWR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBVcGxvYWQgSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICApfVxyXG4gICAgICAgIHtpbWFnZVVybCAmJiAoXHJcbiAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgIG1hcmdpblRvcD1cIjEwcHhcIlxyXG4gICAgICAgICAgICAgICAgcGFkZGluZz1cIjEwcHhcIlxyXG4gICAgICAgICAgICAgICAgYm9yZGVyPVwiMnB4IHNvbGlkICNjY2NcIlxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiOHB4XCJcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcj1cIiNmOWY5ZjlcIlxyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg9XCI4MCVcIlxyXG4gICAgICAgICAgICAgICAgd29yZEJyZWFrPVwiYnJlYWstYWxsXCJcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbj1cImNlbnRlclwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxUZXh0IG1hcmdpbj1cIjAgMCAxMHB4IDBcIiBmb250U2l6ZT1cIjE2cHhcIiBjb2xvcj1cIiMzMzNcIj5cclxuICAgICAgICAgICAgICAgICAgICBJbWFnZSBVUkw6IHtpbWFnZVVybH1cclxuICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVDb3B5VG9DbGlwYm9hcmR9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtpc0NvcGllZCA/ICdDb3BpZWQhJyA6ICdDb3B5IHRvIENsaXBib2FyZCd9XHJcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgKX1cclxuICAgIDwvQm94Pik7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCIyMDBweFwiPlxyXG4gICAgICAgICAgICA8c2VjdGlvblxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcclxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogXCIzMnB4XCJcclxuICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb250U2l6ZTogXCIzcmVtXCIsXHJcbiAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIzcmVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IFwiNzAwXCJcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICBPbmVTdG9wIFxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIzcmVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IFwibm9ybWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiMyODI4MjhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH19PntcIiBcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgQWRtaW5cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgICAgIDxJbWFnZVVwbG9hZEJ1dHRvbi8+XHJcblxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDsiLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vYWRtaW5fcGFuZWwvdWkvcGFnZXMvZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmQiXSwibmFtZXMiOlsiSW1hZ2VVcGxvYWRCdXR0b24iLCJfdXNlU3RhdGUiLCJ1c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInNlbGVjdGVkSW1hZ2UiLCJzZXRTZWxlY3RlZEltYWdlIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJpbWFnZVVybCIsInNldEltYWdlVXJsIiwiX3VzZVN0YXRlNSIsIl91c2VTdGF0ZTYiLCJpc0NvcGllZCIsInNldElzQ29waWVkIiwiaGFuZGxlSW1hZ2VDaGFuZ2UiLCJldmVudCIsImZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsImhhbmRsZVVwbG9hZCIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsImZvcm1EYXRhIiwiY3VycmVudFVybCIsImN1cnJlbnRVcmxQYXJ0cyIsInBvc3RVcmwiLCJyZXNwb25zZSIsInJlc3BvbnNlRGF0YSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJjb25zb2xlIiwibG9nIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzcGxpdCIsInNsaWNlIiwibGVuZ3RoIiwiam9pbiIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInNlbnQiLCJvayIsImpzb24iLCJlcnJvciIsInN0YXR1c1RleHQiLCJ0MCIsInN0b3AiLCJhcHBseSIsImFyZ3VtZW50cyIsImhhbmRsZUNvcHlUb0NsaXBib2FyZCIsIm5hdmlnYXRvciIsImNsaXBib2FyZCIsIndyaXRlVGV4dCIsInRoZW4iLCJzZXRUaW1lb3V0IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiQm94IiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwibWFyZ2luVG9wIiwiSW5wdXQiLCJ0eXBlIiwiYWNjZXB0Iiwib25DaGFuZ2UiLCJwYWRkaW5nIiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwiYmFja2dyb3VuZENvbG9yIiwibWF4V2lkdGgiLCJ3b3JkQnJlYWsiLCJ0ZXh0QWxpZ24iLCJUZXh0IiwibWFyZ2luIiwiZm9udFNpemUiLCJjb2xvciIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImFsdCIsInN0eWxlIiwibWF4SGVpZ2h0IiwibWFyZ2luQm90dG9tIiwiQnV0dG9uIiwidmFyaWFudCIsIm9uQ2xpY2siLCJEYXNoYm9hcmQiLCJqdXN0aWZ5Q29udGVudCIsImZvbnRXZWlnaHQiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFJQSxJQUFNQSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQWlCQSxHQUFTO0VBQzVCLEVBQUEsSUFBQUMsU0FBQSxHQUEwQ0MsY0FBUSxDQUFDLElBQUksQ0FBQztNQUFBQyxVQUFBLEdBQUFDLGNBQUEsQ0FBQUgsU0FBQSxFQUFBLENBQUEsQ0FBQTtF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
