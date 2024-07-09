const { readdirSync } = require('fs-extra');
const path = require('path');
async function loadhomepage(){
  return new Promise(async(resolve, reject) => {
  var array = []
  try {
    // ------------------------------------------------------------------------//
    // ------------------------/     Fodel public    /-------------------------//
    // ------------------------------------------------------------------------//
    var i, j;
    let srcPath = path.join(__dirname, "/public/");
    const hosting = readdirSync(srcPath).filter((file) => file.endsWith(".js"));
    for (i of hosting) {
        var { index, name } = require(srcPath + i);
        array.push({
          name: name
        })
    }
    // ------------------------------------------------------------------------//
    // ----------------------------/     Fodel    /----------------------------//
    // ------------------------------------------------------------------------//
    const getDirs = readdirSync(srcPath).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
    for (var dir of getDirs) {
        fileName = readdirSync(path.join(__dirname, '/public/' + dir + '/')).filter((file) => file.endsWith(".js"));
        for (j of fileName) {
            var { index, name } = require(path.join(__dirname, '/public/' + dir + '/') + j);
            array.push({
          name: name
        })
        }
    }
    return resolve(array);
} catch (e) { console.log(e); }
})
}
module.exports = {
  loadhomepage
}