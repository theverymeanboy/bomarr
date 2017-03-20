'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
	function Util() {
		_classCallCheck(this, Util);
	}

	_createClass(Util, null, [{
		key: 'validateUrl',
		value: function validateUrl(domain, page) {
			var pageWithDomain = false;
			if (!page || page == '#') {
				return false;
			}
			page = page.trim();

			if (page.substring(0, 1) == '/' && page.substring(0, 2) != '//') {
				pageWithDomain = '' + domain + page;
			} else if (page.substring(0, 4) == 'http' && page.indexOf(domain) >= 0) {
				pageWithDomain = page;
			} else if (page.substring(0, 2) == '//' && (('https:' + page).indexOf(domain) == 0 || ('http:' + page).indexOf(domain) == 0)) {
				pageWithDomain = domain.indexOf('https:') == 0 ? 'https:' + page : 'http:' + page;
			}

			if (pageWithDomain && pageWithDomain != domain && pageWithDomain.split('/').reverse()[0].indexOf('.') >= 0) {
				return pageWithDomain;
			}

			if (pageWithDomain && pageWithDomain.indexOf('?') < 0 && pageWithDomain.split('').reverse()[0] != '/') {
				pageWithDomain += '/';
			}

			if (pageWithDomain && pageWithDomain.indexOf('?') >= 0) {
				var baseUrlParts = pageWithDomain.split('?');
				if (baseUrlParts[0].split('').reverse()[0] != '/') {
					pageWithDomain = baseUrlParts[0] + '/?' + baseUrlParts[1];
				}
			}

			return pageWithDomain;
		}
	}, {
		key: 'pageIndex',
		value: function pageIndex(pages, page) {
			return pages.map(function (p) {
				return p.url;
			}).indexOf(page);
		}
	}, {
		key: 'pageExists',
		value: function pageExists(pages, page) {
			return this.pageIndex(pages, page) >= 0;
		}
	}]);

	return Util;
}();

exports.default = Util;
