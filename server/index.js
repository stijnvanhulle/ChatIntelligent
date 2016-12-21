/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-02T09:44:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-21T23:53:44+01:00
* @License: stijnvanhulle.be
*/

require(`dotenv`).load();
const pluginHandler = require(`./lib/pluginHandler`);
const path = require(`path`);
const mongoose = require("mongoose");
const Server = require('hapi').Server;
//const WebpackPlugin = require('hapi-webpack-plugin');
const port = process.env.PORT;
const mongo = process.env.mongo || '51.254.211.109:27017';
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

const mongodb = {
  options: {
    db: {
      native_parser: true
    },
    server: {
      poolSize: 5
    }
  },
  uri: 'mongodb://' + mongo + '/chat'
};

server.connection({port});
server.register(require(`./modules/`), pluginHandler);
server.register(require(`./routes/`), pluginHandler);

const startServer = () => {
  mongoose.connect(mongodb.uri, mongodb.options, (err) => {
    if (err) {
      console.log(err);
    } else {
      server.start(err => {
        if (err)
          console.error(err);
        console.log(`Server running at: http://localhost:${port} - version:${version}`);
      });
    }

  });

};

startServer();
