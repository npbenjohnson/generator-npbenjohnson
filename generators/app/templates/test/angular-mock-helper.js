 /* eslint-disable */
import _ from 'lodash';
export default function() {
	beforeEach(function() {
		try {
			module(function($exceptionHandlerProvider) {
				$exceptionHandlerProvider.mode("log");
			});
			var that = this;
			this.providers = {};
			this.inject = function(providers) {
				inject(function($injector) {
					that.providers.$injector = $injector;
				});
				_.each(providers, function(provider) {
					that.providers[provider] = that.providers.$injector.get(provider);
				});
			};
			this.flush = function() {
				// Inject these by default to simplify flush
				this.inject(['$rootScope', '$timeout']);
				that.providers.$rootScope.$apply(); // must be called to resolve promises
				try {
					that.providers.$timeout.flush(); // must be called to resolve timeouts
				} catch(notarealexception) {
					// nomnomnom
				}
			}
			this.fail = function(done) {
				return function(error) {
					done.fail(error);
				}
			}
			this.compile = function($scope, html) {
				this.inject(['$compile']);
				return this.providers.$compile(html)($scope);
			}
		} catch(ex) {
			console.error(ex.stack)
		}
	});
	afterEach(function() {
		try {
			this.inject(['$exceptionHandler']);
			_.each(this.providers.$exceptionHandler.errors, function(e) {
				console.log('Swallowed: ' + e);
			});
		} catch(ex) {
			console.error(ex.stack)
		}
	});
}
