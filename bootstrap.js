var fs = require("fs");
var Q = require("q");
var clone = require('git-clone');
var BAD_ENV = new Error("Problem in environment")
var RUN_SCRIPT = "/usr/src/app/run.js";

function qCheckCloneNeeded(){
    var deferred = Q.defer();
    fs.exists(RUN_SCRIPT, function(exists) {
	deferred.resolve(! exists); // clone needed if the file does not exist
    });
    return deferred.promise;
}

function qFetchGit(){
    var repoUrl = process.env.GIT;
    var checkout = process.env.CHECKOUT;
    var script = process.env.SCRIPT;
    if (! (repoUrl && checkout && script) ) {
	return Q.reject(BAD_ENV);
    }
    var deferred = Q.defer();
    var targetPath = "/usr/src/app/realapp";
    clone(repoUrl, targetPath, {git: '/usr/bin/git', checkout: checkout}, function(err){
	if (err) {
	    return deferred.reject(err);
	}
	deferred.resolve();
    });
    return deferred.promise;
}

function qGenRunScript(){
    var deferred = Q.defer();
    var code = "require('./realapp/" + process.env.SCRIPT + "')";

    fs.writeFile(RUN_SCRIPT, code, function(err){
	if (err) {
	    return deferred.reject(err);
	}
	deferred.resolve();
    });
    return deferred.promise;
}

function qExecRunScript(){
    var deferred = Q.defer();
    try {
	require("./run")
	deferred.resolve();
    }catch(err2) {
	console.log(err2);
	deferred.reject(err);
    }
    return deferred.promise;
}

function bootstrap(){
    return qCheckCloneNeeded()
	.then(function(cloneNeeded){
	    if (cloneNeeded){
		return qFetchGit().then(qGenRunScript);
	    }
	})
    	.then(qExecRunScript)
        .fail(function(err){
	    console.error(err);
	    process.exit(1);
	});
}

bootstrap()
