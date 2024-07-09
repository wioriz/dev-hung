const router = require("express").Router();
const { readdirSync } = require('fs-extra');
const path = require('path');
try {
    // ------------------------------------------------------------------------//
    // ------------------------/     Fodel public    /-------------------------//
    // ------------------------------------------------------------------------//
    var i, j;
    let srcPath = path.join(__dirname, "/public/");
    const hosting = readdirSync(srcPath).filter((file) => file.endsWith(".js"));
    for (i of hosting) {
        var { index, name } = require(srcPath + i);
        router.get(name, index);
	    console.log(i)
    }
    // ------------------------------------------------------------------------//
    // ----------------------------/     Fodel    /----------------------------//
    // ------------------------------------------------------------------------//
    const getDirs = readdirSync(srcPath).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
    for (var dir of getDirs) {
        fileName = readdirSync(path.join(__dirname, '/public/' + dir + '/')).filter((file) => file.endsWith(".js"));
        for (j of fileName) {
            var { index, name } = require(path.join(__dirname, '/public/' + dir + '/') + j);
            router.get(name, index);
		console.log('[ LOADER ] - Thành Công:' + name)
        }
    }
} catch (e) { console.log(e); }


// -------------------------->      END     <------------------------------//
module.exports = router;