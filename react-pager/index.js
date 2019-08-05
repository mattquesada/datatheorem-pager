"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var Pager =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Pager, _React$Component);

  function Pager(props) {
    var _this;

    _classCallCheck(this, Pager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pager).call(this, props));
    _this.state = {
      currentPageIndex: 0,
      page: _this.props.pages[0],
      goNext: function goNext() {
        return _this.goNext();
      },
      goPrevious: function goPrevious() {
        return _this.goPrevious();
      },
      goToLabel: function goToLabel(label) {
        return _this.goToLabel(label);
      },
      currentPageLabel: _this.props.getLabel(0),
      pageLabels: [],
      loading: true,
      error: false
    };
    return _this;
  }

  _createClass(Pager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadLabels(this.props.pages);
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
      utility method to change the current page's data and label to the 
      page and label defined by @newIndex
    */

  }, {
    key: "changePage",
    value: function changePage(newIndex) {
      this.setState({
        currentPageIndex: newIndex,
        currentPageLabel: this.state.pageLabels(newIndex),
        page: this.props.pages[newIndex]
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, this.props.children(_objectSpread({}, this.props, {}, this.state)));
    }
  }]);

  return Pager;
}(_react["default"].Component);

Pager.propTypes = {
  pages: _propTypes["default"].element.isRequired,
  getLabel: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node.isRequired,
  supportRequestUrl: _propTypes["default"].string,
  pageInfoUrl: _propTypes["default"].string
};
Pager.defaultProps = {
  supportRequestUrl: null,
  pageInfoUrl: null
};
var _default = Pager;
exports["default"] = _default;
