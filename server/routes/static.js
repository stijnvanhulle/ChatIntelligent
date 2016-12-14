/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-14T17:00:12+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T17:00:14+01:00
* @License: stijnvanhulle.be
*/



module.exports = [

  {
    method: `GET`,
    path: `/{param*}`,
    config: {
      auth: false
    },
    handler: {
      file: `index.html`
    }
  },

  {
    method: `GET`,
    path: `/css/{param*}`,
    config: {
      auth: false
    },
    handler: {
      directory: {
        path: `./css`
      }
    }
  },

  {
    method: `GET`,
    path: `/js/{param*}`,
    config: {
      auth: false
    },
    handler: {
      directory: {
        path: `./js`
      }
    }
  },

  {
    method: `GET`,
    path: `/assets/{param*}`,
    config: {
      auth: false
    },
    handler: {
      directory: {
        path: `./assets`
      }
    }
  },
  {
    method: `GET`,
    path: `/audio/{param*}`,
    config: {
      auth: false
    },
    handler: {
      directory: {
        path: `./audio`
      }
    }
  }

];
