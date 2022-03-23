import React from 'react';
import crypto from 'crypto-js';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/* eslint-disable camelcase */
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".styles_buttonSubmit__3Nole {\n  border: none !important;\n  display: inline-block !important;\n  text-align: center !important;\n  padding: 7px 20px !important;\n  color: #fff !important;\n  font-size: 16px !important;\n  font-weight: 600 !important;\n  font-family: OpenSans, sans-serif;\n  cursor: pointer !important;\n  border-radius: 2px !important;\n  background: rgb(122, 183, 43) !important;\n}\n\n.styles_buttonSubmit__3Nole img {\n  margin-right: 7px !important;\n  vertical-align: middle !important;\n}\n\n.styles_buttonSubmit__3Nole span {\n  vertical-align: middle !important;\n}\n\n.styles_buttonSubmit__3Nole:hover {\n  opacity: 0.5;\n}\n\n.styles_buttonSubmit__3Nole:disabled {\n  opacity: 0.5;\n  cursor: default !important;\n}\n";
var styleFile = {"buttonSubmit":"styles_buttonSubmit__3Nole"};
styleInject(css_248z);

var _excluded$1 = ["publicKey", "privateKey", "amount", "currency", "description", "orderId", "title", "style", "disabled", "extra"];

var LiqPayPay = function LiqPayPay(_ref) {
  var publicKey = _ref.publicKey,
      privateKey = _ref.privateKey,
      amount = _ref.amount,
      currency = _ref.currency,
      _ref$description = _ref.description,
      description = _ref$description === void 0 ? 'test' : _ref$description,
      _ref$orderId = _ref.orderId,
      orderId = _ref$orderId === void 0 ? Math.floor(1 + Math.random() * 900000000) : _ref$orderId,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Payment' : _ref$title,
      style = _ref.style,
      disabled = _ref.disabled,
      extra = _ref.extra,
      props = _objectWithoutProperties(_ref, _excluded$1);

  var jsonString = _objectSpread2({
    public_key: publicKey,
    version: '3',
    action: 'pay',
    amount: amount,
    currency: currency,
    description: description,
    order_id: orderId
  }, props);

  var data = utf8_to_b64(JSON.stringify(jsonString));
  var signString = privateKey + data + privateKey;
  var sha1 = crypto.createHash('sha1');
  sha1.update(signString);
  var signature = sha1.digest('base64');
  return /*#__PURE__*/React.createElement("form", {
    method: "POST",
    action: "https://www.liqpay.ua/api/3/checkout",
    acceptCharset: "utf-8",
    style: _objectSpread2({}, style)
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "data",
    value: data
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "signature",
    value: signature
  }), extra || /*#__PURE__*/React.createElement("button", {
    className: classNames(styleFile.buttonSubmit),
    disabled: disabled
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://static.liqpay.ua/buttons/logo-small.png",
    name: "btn_text"
  }), /*#__PURE__*/React.createElement("span", null, title, " ", amount, " ", currency)));
};

LiqPayPay.propTypes = {
  publicKey: PropTypes.string.isRequired,
  privateKey: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  orderId: PropTypes.any.isRequired,
  title: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  extra: PropTypes.object
};

var _excluded = ["publicKey", "privateKey", "amount", "subscribePeriodicity", "currency", "description", "orderId", "title", "style", "disabled", "extra"];

var LiqPaySubscribe = function LiqPaySubscribe(_ref) {
  var publicKey = _ref.publicKey,
      privateKey = _ref.privateKey,
      amount = _ref.amount,
      _ref$subscribePeriodi = _ref.subscribePeriodicity,
      subscribePeriodicity = _ref$subscribePeriodi === void 0 ? 'month' : _ref$subscribePeriodi,
      currency = _ref.currency,
      _ref$description = _ref.description,
      description = _ref$description === void 0 ? 'test' : _ref$description,
      _ref$orderId = _ref.orderId,
      orderId = _ref$orderId === void 0 ? Math.floor(1 + Math.random() * 900000000) : _ref$orderId,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Subscribe' : _ref$title,
      style = _ref.style,
      disabled = _ref.disabled,
      extra = _ref.extra,
      props = _objectWithoutProperties(_ref, _excluded);

  var jsonString = _objectSpread2({
    public_key: publicKey,
    version: '3',
    action: 'subscribe',
    subscribe_date_start: Date.now(),
    subscribe_periodicity: subscribePeriodicity,
    amount: amount,
    currency: currency,
    description: description,
    order_id: orderId
  }, props);

  var data = utf8_to_b64(JSON.stringify(jsonString));
  var signString = privateKey + data + privateKey;
  var sha1 = crypto.createHash('sha1');
  sha1.update(signString);
  var signature = sha1.digest('base64');
  return /*#__PURE__*/React.createElement("form", {
    method: "POST",
    action: "https://www.liqpay.ua/api/3/checkout",
    acceptCharset: "utf-8",
    style: _objectSpread2({}, style)
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "data",
    value: data
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "signature",
    value: signature
  }), extra || /*#__PURE__*/React.createElement("button", {
    className: classNames(styleFile.buttonSubmit),
    disabled: disabled
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://static.liqpay.ua/buttons/logo-small.png",
    name: "btn_text"
  }), /*#__PURE__*/React.createElement("span", null, title, " ", amount, " ", currency)));
};

LiqPaySubscribe.propTypes = {
  publicKey: PropTypes.string.isRequired,
  privateKey: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  subscribePeriodicity: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  orderId: PropTypes.any.isRequired,
  title: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  extra: PropTypes.object
};

export { LiqPayPay, LiqPaySubscribe };
//# sourceMappingURL=index.es.js.map
