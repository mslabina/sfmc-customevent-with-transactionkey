'use strict';

requirejs.config({
	paths: {
		postmonger: 'postmonger'
	},
	shim: {
		'jquery.min': {
			exports: '$'
		},
		'../customEvent': {
			deps: ['jquery.min', 'postmonger']
		}
	}
});

requirejs(['jquery.min', '../customEvent'], function ($, customEvent) {
});

requirejs.onError = function (err) {
	if (err.requireType === 'timeout') {
		console.log('modules: ' + err.requireModules);
	}
	throw err;
};
