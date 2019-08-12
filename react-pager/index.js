"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./Pager.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PagerOverlay =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PagerOverlay, _React$Component);

  function PagerOverlay() {
    var _this;

    _classCallCheck(this, PagerOverlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PagerOverlay).call(this));
    _this.state = {
      survey: {
        name: '',
        email: '',
        message: ''
      }
    };
    return _this;
  }

  _createClass(PagerOverlay, [{
    key: "handleChange",
    value: function handleChange(event) {
      var surveyField = event.target.name;
      this.setState({
        survey: _objectSpread({}, this.state.survey, _defineProperty({}, surveyField, event.target.value))
      });
    }
    /*
      When the form submit button is clicked, verify that the inputs are valid
      before closing the overlay. If the input is valid, use the handler from props.
    */

  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault(); // prevent form from closing so we can validate the fields

      if (this.checkSubmission(this.state.survey)) this.props.handleClose(this.state.survey);else alert('Error: please populate all fields.');
    }
    /*
      Verify that all of the input fields are populated
    */

  }, {
    key: "checkSubmission",
    value: function checkSubmission(survey) {
      for (var field in survey) {
        if (!survey[field]) return false;
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
      return _react["default"].createElement("div", {
        className: showHideClassName
      }, _react["default"].createElement("div", {
        className: "modal-content"
      }, _react["default"].createElement("h3", null, "Please fill out the form:"), _react["default"].createElement("div", {
        className: "modal-form"
      }, _react["default"].createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this2.handleSubmit(e);
        }
      }, _react["default"].createElement("label", null, "Name: ", _react["default"].createElement("input", {
        type: "text",
        name: "name",
        value: this.state.survey.name,
        onChange: function onChange(e) {
          return _this2.handleChange(e);
        }
      })), _react["default"].createElement("label", null, "Email: ", _react["default"].createElement("input", {
        type: "email",
        name: "email",
        value: this.state.survey.email,
        onChange: function onChange(e) {
          return _this2.handleChange(e);
        }
      })), _react["default"].createElement("label", null, "Message: ", _react["default"].createElement("input", {
        type: "text",
        name: "message",
        value: this.state.survey.message,
        onChange: function onChange(e) {
          return _this2.handleChange(e);
        }
      })), _react["default"].createElement("input", {
        type: "submit",
        value: "Submit"
      })))));
    }
  }]);

  return PagerOverlay;
}(_react["default"].Component);

;
PagerOverlay.propTypes = {
  show: _propTypes["default"].bool.isRequired,
  handleClose: _propTypes["default"].func.isRequired
};

var Pager =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Pager, _React$Component2);

  function Pager(props) {
    var _this3;

    _classCallCheck(this, Pager);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Pager).call(this, props));
    _this3.state = {
      currentPageIndex: 0,
      showOverlay: false,
      page: _this3.props.pages[0],
      goNext: function goNext() {
        return _this3.goNext();
      },
      goPrevious: function goPrevious() {
        return _this3.goPrevious();
      },
      goToLabel: function goToLabel(label) {
        return _this3.goToLabel(label);
      },
      currentPageLabel: _this3.props.getLabel(0),
      pageLabels: [],
      openSupportDialog: function openSupportDialog() {
        return _this3.openSupportDialog();
      },
      pageInfoIsLoading: true,
      pageInfoError: '',
      pageInfo: {}
    };
    _this3.closeSupportDialog = _this3.closeSupportDialog.bind(_assertThisInitialized(_this3));
    return _this3;
  }
  /*
    When the Pager mounts, immediately load all the labels into 
    an array for easy access, and load the page info for the first page
    If supportRequestUrl is null, nullify openSupportDialog
  */


  _createClass(Pager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadLabels(this.props.pages);
      this.loadPageInfo(this.state.currentPageLabel);
      this.checkSupportRequestUrl(this.props.supportRequestUrl);
    }
    /*
      If the pages get updated, reload the labels and return
      to the first page.
      If the getLabel() function is updated, reload the labels.
      If supportRequestUrl becomes non-null, change openSupportDialog
      to be non-null in render.
    */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this4 = this;

      if (prevProps.pages !== this.props.pages) {
        this.loadLabels(this.props.pages);
        this.loadPageInfo(this.props.getLabel(0));
        this.changePage(0);
      }

      if (prevProps.getLabel !== this.props.getLabel) this.loadLabels(this.props.pages);
      if (prevProps.supportRequestUrl !== this.props.supportRequestUrl) this.setState({
        openSupportDialog: function openSupportDialog() {
          return _this4.openSupportDialog();
        }
      });
    }
    /*
      store all of the labels for each individual page
      using the provided getLabel() function from props
    */

  }, {
    key: "loadLabels",
    value: function loadLabels(pages) {
      var pageLabels = [];

      for (var pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        pageLabels.push(this.props.getLabel(pageIndex));
      }

      this.setState({
        pageLabels: pageLabels
      });
    }
    /*
      transition to the next page in the props.pages array. 
      if the current page index is the last page, the pager will
      wrap around to the first page
    */

  }, {
    key: "goNext",
    value: function goNext() {
      var newPageIndex = this.state.currentPageIndex === this.props.pages.length - 1 ? 0 : this.state.currentPageIndex + 1;
      this.changePage(newPageIndex);
    }
    /*
      transition to the previous page in the props.pages array.
      if the current page index is the first page, the pager will
      wrap around to the last page.
    */

  }, {
    key: "goPrevious",
    value: function goPrevious() {
      var newPageIndex = this.state.currentPageIndex === 0 ? this.props.pages.length - 1 : this.state.currentPageIndex - 1;
      this.changePage(newPageIndex);
    }
    /* 
      jump to the page matching @selectedLabel
    */

  }, {
    key: "goToLabel",
    value: function goToLabel(selectedLabel) {
      var newPageIndex = this.state.pageLabels.findIndex(function (label) {
        return label === selectedLabel;
      });
      this.changePage(newPageIndex);
    }
    /*
      Toggle the showOverlay state so that the PagerOverlay component renders
    */

  }, {
    key: "openSupportDialog",
    value: function openSupportDialog() {
      this.setState({
        showOverlay: true
      });
    }
    /*
      Receives the form data stored in @survey from the PagerOverlay 
      child component and attemps to make a POST request
    */

  }, {
    key: "closeSupportDialog",
    value: function closeSupportDialog(survey) {
      this.sendSurveyData(survey);
      this.setState({
        showOverlay: false
      });
    }
    /*
      send the survey data from the overlay to the 
      supportRequestUrl, if it exists
    */

  }, {
    key: "sendSurveyData",
    value: function () {
      var _sendSurveyData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(survey) {
        var fetchOptions, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.props.supportRequestUrl) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                fetchOptions = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(survey)
                };
                _context.prev = 3;
                _context.next = 6;
                return fetch(this.props.supportRequestUrl, fetchOptions);

              case 6:
                response = _context.sent;
                alert(this.handleSupportResponse(response));
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                alert(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 10]]);
      }));

      function sendSurveyData(_x) {
        return _sendSurveyData.apply(this, arguments);
      }

      return sendSurveyData;
    }()
    /*
      utility method to alert the user if the survey was submitted
      successfully to the provided supportRequestUrl
    */

  }, {
    key: "handleSupportResponse",
    value: function () {
      var _handleSupportResponse = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(response) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = response.status;
                _context2.next = _context2.t0 === 200 ? 3 : _context2.t0 === 201 ? 3 : _context2.t0 === 202 ? 3 : _context2.t0 === 204 ? 3 : _context2.t0 === 400 ? 4 : 7;
                break;

              case 3:
                return _context2.abrupt("return", 'Support request received successfully');

              case 4:
                _context2.next = 6;
                return response.json();

              case 6:
                return _context2.abrupt("return", _context2.sent);

              case 7:
                return _context2.abrupt("return", 'Error in support request');

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function handleSupportResponse(_x2) {
        return _handleSupportResponse.apply(this, arguments);
      }

      return handleSupportResponse;
    }()
    /*
      Load the page information using the Url provided by
      props.pageInfoUrl(), if the prop is provided. This function is
      called when the component mounts, as well as every time the user 
      transitions to a different page
    */

  }, {
    key: "loadPageInfo",
    value: function () {
      var _loadPageInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(label) {
        var fetchUrl, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.props.pageInfoUrl) {
                  _context3.next = 3;
                  break;
                }

                this.setState({
                  pageInfoIsLoading: false,
                  pageInfoError: 'no pageInfoUrl prop provided',
                  pageInfo: null
                });
                return _context3.abrupt("return");

              case 3:
                fetchUrl = this.props.pageInfoUrl(label);
                _context3.prev = 4;
                _context3.next = 7;
                return fetch(fetchUrl);

              case 7:
                response = _context3.sent;
                this.handlePageInfoResponse(response);
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](4);
                this.setState({
                  pageInfoIsLoading: false,
                  pageInfoError: 'cannot fetch page info',
                  pageInfo: null
                });

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 11]]);
      }));

      function loadPageInfo(_x3) {
        return _loadPageInfo.apply(this, arguments);
      }

      return loadPageInfo;
    }()
    /*
      if the supportRequestUrl prop is not provided,
      nullify the openSupportDialog child prop as 
      described in the documentation
    */

  }, {
    key: "checkSupportRequestUrl",
    value: function checkSupportRequestUrl(url) {
      if (!url) this.setState({
        openSupportDialog: null
      });
    }
    /*
      Check the response status of a page info request 
      and alert the user of the request status. Also update
      the state accordingly.
    */

  }, {
    key: "handlePageInfoResponse",
    value: function () {
      var _handlePageInfoResponse = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(response) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(response.status >= 200 && response.status <= 299)) {
                  _context4.next = 9;
                  break;
                }

                _context4.t0 = this;
                _context4.next = 4;
                return response.json();

              case 4:
                _context4.t1 = _context4.sent;
                _context4.t2 = {
                  pageInfoIsLoading: false,
                  pageInfoError: null,
                  pageInfo: _context4.t1
                };

                _context4.t0.setState.call(_context4.t0, _context4.t2);

                _context4.next = 10;
                break;

              case 9:
                this.setState({
                  pageInfoIsLoading: false,
                  pageInfoError: 'cannot fetch page info',
                  pageInfo: null
                });

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handlePageInfoResponse(_x4) {
        return _handlePageInfoResponse.apply(this, arguments);
      }

      return handlePageInfoResponse;
    }()
    /*
      utility method to change the current page's data and label to the 
      page and label defined by @newIndex.
      Also attemps to query the url provided by props.pageInfoUrl to load the 
      page info, if it exists
    */

  }, {
    key: "changePage",
    value: function changePage(newIndex) {
      this.setState({
        currentPageIndex: newIndex,
        currentPageLabel: this.state.pageLabels[newIndex],
        page: this.props.pages[newIndex]
      });
      this.loadPageInfo(this.state.pageLabels[newIndex]);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(PagerOverlay, {
        show: this.state.showOverlay,
        handleClose: this.closeSupportDialog
      }), this.props.children(_objectSpread({}, this.props, {}, this.state)));
    }
  }]);

  return Pager;
}(_react["default"].Component);

Pager.propTypes = {
  pages: _propTypes["default"].array.isRequired,
  getLabel: _propTypes["default"].func.isRequired,
  supportRequestUrl: _propTypes["default"].string,
  pageInfoUrl: _propTypes["default"].func,
  children: _propTypes["default"].func
};
Pager.defaultProps = {
  supportRequestUrl: null,
  pageInfoUrl: null,
  children: {
    openSupportDialog: null,
    pageInfoIsLoading: false,
    pageInfoError: null,
    pageInfo: null
  }
};
var _default = Pager;
exports["default"] = _default;
