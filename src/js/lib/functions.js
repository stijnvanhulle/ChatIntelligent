/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-14T16:27:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-15T16:43:02+01:00
* @License: stijnvanhulle.be
*/
import global from '../lib/const/global';

export const setUrl = (url, hostname = global.url) => {
  const keys = Object.keys(url);
  const newUrl = {};

  for (let i = 0;i < keys.length;i ++) {
    const key = keys[i];
    newUrl[key] = hostname + url[key];
  }

  return newUrl;
};

export const setSuccessAndFail = item => {
  const keys = Object.keys(item);

  for (let i = 0;i < keys.length;i ++) {
    const key = keys[i];
    if (key.toLowerCase().indexOf(`create`) !== - 1 || key.toLowerCase().indexOf(`load`) !== - 1 || key.toLowerCase().indexOf(`update`) !== - 1 || key.toLowerCase().indexOf(`get`) !== - 1 || key.toLowerCase().indexOf(`add`) !== - 1 || key.toLowerCase().indexOf(`accept`) !== - 1) {
      if (!item[`${key}_SUCCESS`]) {
        item[`${key}_SUCCESS`] = `${item[key]}_success`;

      }
    }
  }

  return item;
};

export const setParams = (item = null, ...params) => {
  if (item) {
    for (let i = 0;i < params.length;i ++) {
      const param = params[i];
      item = item.replace(/{[a-z]+}/, param);
    }
  }

  return item;

};
