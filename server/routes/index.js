/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-13T21:05:38+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T16:46:27+01:00
* @License: stijnvanhulle.be
*/



const fs = require(`fs`);
const path = require(`path`);

module.exports.register = (server, options, next) => {

  fs.readdirSync(__dirname).forEach(file => {

    if (file === `index.js` || !file.endsWith(`.js`) || file.startsWith(`_`)) return;

    const mod = {};
    mod[path.basename(file, `.js`)] = require(path.join(__dirname, file));

    for(const route in mod) {
      server.route(mod[route]);
    }

  });

  next();

};

module.exports.register.attributes = {
  name: `routes`,
  version: `0.1.0`
};
