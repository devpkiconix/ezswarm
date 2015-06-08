var clone = require('git-clone');
var BAD_ENV = new Error("Problem in environment")

function nop(err){}

function bootstrap(cb) {
    var repoUrl = process.env.GIT;
    var checkout = process.env.CHECKOUT;
    var script = process.env.SCRIPT;

    if (!cb) {
	cb = nop;
    }

    if (! (repoUrl && checkout && script) ) {
	cb(BAD_ENV);
	return;
    }
    var targetPath = "/usr/src/app/realapp";
    clone(repoUrl, targetPath, {git: '/usr/bin/git', checkout: checkout}, function(err){
	if (err) {
	    console.log(err);
	    return cb(err);
	}
	var fs = require("fs");

	var code = "require('./realapp/" + script + "')";

	fs.writeFile("/usr/src/app/run.js", code, function(err){
	    if (err) {
		console.log("Unable to write run.js. ", err);
		return cb(err);
	    }

	    console.log("Done writing run.js. ", code);
	    fs.readdir(targetPath, function(err, files){
		if (err) {
		    console.log(err);
		    return cb(err);
		}
		try {
		    require("./run")
		}catch(err2) {
		    console.log(err2);
		    return cb(err2);
		}
		cb(null);
	    });
	});
    });
}

bootstrap()
