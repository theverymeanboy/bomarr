'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initialState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _superagentProxy = require('superagent-proxy');

var _superagentProxy2 = _interopRequireDefault(_superagentProxy);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _superagentProxy2.default)(_superagent2.default);

var initialState = exports.initialState = {
	domain: '',
	pages: [],
	started: false,
	proxy: '',
	timer: null,
	delay: 10000
};

var Spider = function (_EventEmitter) {
	_inherits(Spider, _EventEmitter);

	function Spider(options) {
		_classCallCheck(this, Spider);

		var _this = _possibleConstructorReturn(this, (Spider.__proto__ || Object.getPrototypeOf(Spider)).call(this));

		_this.state = Object.assign({}, initialState, options ? options : {});
		return _this;
	}

	_createClass(Spider, [{
		key: 'start',
		value: function start() {
			var _this2 = this;

			if (this.state.started) {
				return false;
			}

			this.emit('crawl-started');

			this.state.started = true;
			this.addPage('/');
			setTimeout(function () {
				return _this2.getNextPage();
			}, this.state.delay);
			return true;
		}
	}, {
		key: 'addPage',
		value: function addPage(page) {
			var validatedPage = _util2.default.validateUrl(this.state.domain, page);

			if (!validatedPage || _util2.default.pageExists(this.state.pages, validatedPage)) {
				return false;
			}

			var newPage = {
				url: validatedPage,
				processed: false,
				processing: false,
				content: ''
			};

			this.emit('page-added', newPage);

			this.state.pages = [].concat(_toConsumableArray(this.state.pages), [newPage]);
		}
	}, {
		key: 'getNextPage',
		value: function getNextPage() {
			var unprocessedPages = this.state.pages.filter(function (p) {
				return !p.processed && !p.processing;
			});
			if (unprocessedPages.length > 0) {
				console.log('crawling', unprocessedPages[0].url);
				this.getPage(unprocessedPages[0]);
			} else {
				this.finishCrawl();
			}
		}
	}, {
		key: 'getPage',
		value: function getPage(page) {
			var _this3 = this;

			var pageIndex = _util2.default.pageIndex(this.state.pages, page.url);

			this.state.pages[pageIndex].processing = true;

			if (this.state.proxy) {
				_superagent2.default.get(page.url).proxy(this.state.proxy).end(function (err, res) {
					return _this3.processPage(res, page);
				});
			} else {
				_superagent2.default.get(page.url).end(function (err, res) {
					return _this3.processPage(res, page);
				});
			}
		}
	}, {
		key: 'processPage',
		value: function processPage(res, page) {
			var _this4 = this;

			if (!res) {
				this.state.timer = setTimeout(function () {
					return _this4.getNextPage();
				}, this.state.delay);
				return;
			}

			var pages = this.state.pages;
			var nowPageIndex = _util2.default.pageIndex(pages, page.url);
			var newPage = {
				url: page.url,
				processed: true,
				processing: false,
				content: res.text
			};
			this.emit('crawl-page', newPage);
			pages[nowPageIndex] = newPage;
			this.state.pages = pages;

			try {
				var $ = _cheerio2.default.load(res.text);
				$('a').each(function (key, a) {
					_this4.addPage($(a).attr('href'));
				});
			} catch (err) {}

			this.state.timer = setTimeout(function () {
				return _this4.getNextPage();
			}, this.state.delay);
		}
	}, {
		key: 'finishCrawl',
		value: function finishCrawl() {
			this.emit('crawl-finished', this.state.pages);
			this.state.started = false;
		}
	}]);

	return Spider;
}(_events.EventEmitter);

exports.default = Spider;
