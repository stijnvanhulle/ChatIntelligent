/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-02T09:44:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-09T14:43:21+01:00
* @License: stijnvanhulle.be
*/



require(`dotenv`).load();
const pluginHandler = require(`./lib/pluginHandler`);
const path = require(`path`);
const Server = require('hapi').Server;
//const WebpackPlugin = require('hapi-webpack-plugin');
const port = process.env.PORT || 3000;
const {version} = require('../package.json');

const server = new Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, `/public`)
      }
    }
  }
});

server.connection({port});
server.register(require(`./modules/`), pluginHandler);
server.register(require(`./routes/`), pluginHandler);

const startServer = () => {
  server.start(err => {
    if (err)
      console.error(err);
    console.log(`Server running at: http://localhost:${port} - version:${version}`);
  });

};

startServer();
