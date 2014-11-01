Package.describe({
	summary: "Angular and Meteor, so happy together.",
  version: "0.3.2",
	name: "superchris:angular-meteor",
  git: "https://github.com/superchris/ngMeteor.git"
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR@0.9.0");
	// Exports the ngMeteor package scope
	api.export('ngMeteor', 'client');

	api.use("superchris:angular@1.3.2", "client");
	// Files to load in Client only.
	api.add_files([
		'lib/angular-hash-key-copier.js',
		'modules/ngMeteor-collections.js',
		'modules/ngMeteor-template.js',
		'modules/ngMeteor-user.js',
		// Finally load ngMeteor File
		'ngMeteor.js'
	], 'client');
});
