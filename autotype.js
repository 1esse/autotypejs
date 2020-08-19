"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var AutoType = /*#__PURE__*/function () {
  function AutoType(dom_selector) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, AutoType);
    this.task_queue = [];
    /** 任务队列 */

    this.type_content = '';
    /** 打印内容 */

    this.history_stack = [];
    /** 历史内容栈 */

    this._task_queue = [];
    /** 任务队列2-收集已执行的任务 */

    this._task_count = 0;
    /** 计算任务数量 */

    this.doneAction = null;
    /** 打字完成执行动作 */

    this.config(config);
    if (typeof dom_selector === 'string') this.dom = document.querySelector(dom_selector);else throw TypeError('请传入正确的dom节点选择器');
  }

  (0, _createClass2["default"])(AutoType, [{
    key: "config",
    value: function config(_ref) {
      var _ref$cursor_typing = _ref.cursor_typing,
          cursor_typing = _ref$cursor_typing === void 0 ? 'cursor_typing' : _ref$cursor_typing,
          _ref$cursor_stay = _ref.cursor_stay,
          cursor_stay = _ref$cursor_stay === void 0 ? 'cursor_stay' : _ref$cursor_stay,
          _ref$loop = _ref.loop,
          loop = _ref$loop === void 0 ? false : _ref$loop,
          _ref$show_cursor = _ref.show_cursor,
          show_cursor = _ref$show_cursor === void 0 ? true : _ref$show_cursor,
          _ref$show_end_cursor = _ref.show_end_cursor,
          show_end_cursor = _ref$show_end_cursor === void 0 ? true : _ref$show_end_cursor,
          _ref$enable_delete = _ref.enable_delete,
          enable_delete = _ref$enable_delete === void 0 ? false : _ref$enable_delete;
      this.cursor_typing = cursor_typing;
      this.cursor_stay = cursor_stay;
      this.loop = loop;
      this.show_cursor = show_cursor;
      this.show_end_cursor = show_end_cursor;
      this.enable_delete = enable_delete;
    } // 描述一段内容的展示方式

  }, {
    key: "setStage",
    value: function setStage(_ref2) {
      var _ref2$media = _ref2.media,
          media = _ref2$media === void 0 ? 'text' : _ref2$media,
          _ref2$text = _ref2.text,
          text = _ref2$text === void 0 ? '' : _ref2$text,
          _ref2$duration = _ref2.duration,
          duration = _ref2$duration === void 0 ? 0 : _ref2$duration,
          _ref2$type = _ref2.type,
          type = _ref2$type === void 0 ? 'add' : _ref2$type,
          _ref2$delete_count = _ref2.delete_count,
          delete_count = _ref2$delete_count === void 0 ? 0 : _ref2$delete_count,
          _ref2$src = _ref2.src,
          src = _ref2$src === void 0 ? '' : _ref2$src,
          _ref2$line_wrap = _ref2.line_wrap,
          line_wrap = _ref2$line_wrap === void 0 ? false : _ref2$line_wrap,
          _ref2$style = _ref2.style,
          style = _ref2$style === void 0 ? '' : _ref2$style;

      if (style instanceof Object) {
        var orz = '';

        for (var _i = 0, _Object$entries = Object.entries(style); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              val = _Object$entries$_i[1];

          orz += "".concat(key, ": ").concat(val, ";");
        }

        style = orz;
      }

      var stage = {
        media: media,
        text: text,
        duration: duration,
        type: type,
        delete_count: parseInt(delete_count),
        src: src,
        line_wrap: line_wrap,
        style: style
      };
      this.task_queue.push(stage);
      this._task_count++;
      return this;
    } // 执行任务

  }, {
    key: "runTask",
    value: function () {
      var _runTask = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var stage, _delay, stage_text, _iterator, _step, item, delay, i;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                stage = this.task_queue.shift();

                if (stage) {
                  _context.next = 3;
                  break;
                }

                throw Error('执行任务失败，空任务');

              case 3:
                _context.t0 = stage.type;
                _context.next = _context.t0 === 'add' ? 6 : _context.t0 === 'delete' ? 42 : 62;
                break;

              case 6:
                // 换行
                if (stage.line_wrap) {
                  this.type_content += '<br>';

                  this._render(this.type_content);
                } // 增加文本


                if (!(stage.media === 'text')) {
                  _context.next = 36;
                  break;
                }

                _delay = Math.floor(stage.duration / (stage.text.length || 1));
                _context.t1 = stage.text.length === 0;

                if (!_context.t1) {
                  _context.next = 13;
                  break;
                }

                _context.next = 13;
                return this._sleep(_delay);

              case 13:
                stage_text = '';
                _iterator = _createForOfIteratorHelper(stage.text);
                _context.prev = 15;

                _iterator.s();

              case 17:
                if ((_step = _iterator.n()).done) {
                  _context.next = 25;
                  break;
                }

                item = _step.value;
                _context.next = 21;
                return this._sleep(_delay);

              case 21:
                stage_text += item;

                this._render("".concat(this.type_content, "<span style=\"").concat(stage.style, "\">").concat(stage_text, "</span>"));

              case 23:
                _context.next = 17;
                break;

              case 25:
                _context.next = 30;
                break;

              case 27:
                _context.prev = 27;
                _context.t2 = _context["catch"](15);

                _iterator.e(_context.t2);

              case 30:
                _context.prev = 30;

                _iterator.f();

                return _context.finish(30);

              case 33:
                this.type_content += "<span style=\"".concat(stage.style, "\">").concat(stage.text, "</span>"); // 增加图片

                _context.next = 41;
                break;

              case 36:
                if (!(stage.media === 'image')) {
                  _context.next = 41;
                  break;
                }

                _context.next = 39;
                return this._sleep(stage.duration);

              case 39:
                this.type_content += "<img style=\"".concat(stage.style, "\" src=").concat(stage.src, " >");

                this._render(this.type_content);

              case 41:
                return _context.abrupt("break", 62);

              case 42:
                if (this.enable_delete) {
                  _context.next = 45;
                  break;
                }

                console.warn('删除功能未开启，如需删除，请添加配置 enable_delete: true;');
                return _context.abrupt("break", 62);

              case 45:
                if (stage.delete_count > this.history_stack.length) stage.delete_count = this.history_stack.length;
                delay = Math.floor(stage.duration / (stage.delete_count || 1));
                _context.t3 = stage.delete_count === 0;

                if (!_context.t3) {
                  _context.next = 51;
                  break;
                }

                _context.next = 51;
                return this._sleep(delay);

              case 51:
                i = 0;

              case 52:
                if (!(i < stage.delete_count)) {
                  _context.next = 61;
                  break;
                }

                _context.next = 55;
                return this._sleep(delay);

              case 55:
                this.history_stack.pop();
                this.type_content = this.history_stack[this.history_stack.length - 1] || '';

                this._render(this.type_content, false);

              case 58:
                i++;
                _context.next = 52;
                break;

              case 61:
                return _context.abrupt("break", 62);

              case 62:
                this._task_queue.push(stage);

                this.task_queue.length > 0 && this.runTask();

                if (this._task_queue.length === this._task_count) {
                  this.history_stack = [];

                  if (this.show_cursor) {
                    this.dom.classList.remove(this.cursor_typing);
                    if (this.show_end_cursor) this.dom.classList.add(this.cursor_stay);else this.dom.classList.remove(this.cursor_stay);
                  }

                  if (this.loop) {
                    this.type_content = '';
                    this.task_queue = this._task_queue;
                    this._task_queue = [];
                    this.runTask();
                  }

                  this.doneAction && this.doneAction();
                }

              case 65:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[15, 27, 30, 33]]);
      }));

      function runTask() {
        return _runTask.apply(this, arguments);
      }

      return runTask;
    }()
  }, {
    key: "onceDone",
    value: function onceDone() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (cb) this.doneAction = cb;
    }
  }, {
    key: "_render",
    value: function _render(content) {
      var save_step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.show_cursor) {
        this.dom.classList.remove(this.cursor_stay);
        this.dom.classList.add(this.cursor_typing);
      }

      this.dom.innerHTML = content;
      if (this.enable_delete && save_step) this.history_stack.push(content);
    }
  }, {
    key: "_sleep",
    value: function _sleep(delay) {
      if (this.show_cursor && delay >= 1000) {
        this.dom.classList.remove(this.cursor_typing);
        this.dom.classList.add(this.cursor_stay);
      }

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve();
        }, delay);
      });
    }
  }]);
  return AutoType;
}();

module.exports = AutoType;