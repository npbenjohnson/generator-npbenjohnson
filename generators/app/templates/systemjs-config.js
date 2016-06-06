System.config({
	defaultJSExtensions: true,
	transpiler: "babel",
	babelOptions: {
		"optional": [
			"runtime",
			"optimisation.modules.system"
		]
	},
	paths: {
		"github:*": "jspm_packages/github/*",
		"npm:*": "jspm_packages/npm/*"
	},<% if(angular) { %>
	meta: {
		"angular/angular.js": {
			"deps": [
				"jquery/dist/jquery.js"
			],
			"globals": {
				"jQuery": "jquery/dist/jquery.js"
			}
		}
	},<% } %>
	map: {}
});
