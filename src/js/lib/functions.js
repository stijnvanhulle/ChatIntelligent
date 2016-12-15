/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-14T16:27:31+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-15T11:26:18+01:00
* @License: stijnvanhulle.be
*/

export const setUrl = (url, hostname = `http://localhost:3000`) => {
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
<<<<<<< HEAD
    if (key.toLowerCase().indexOf(`create`) != - 1 || key.toLowerCase().indexOf(`load`) != - 1 || key.toLowerCase().indexOf(`update`) != - 1 || key.toLowerCase().indexOf(`get`) != - 1 || key.toLowerCase().indexOf(`add`) != - 1) {
      if (!item[`${key}_SUCCESS`]) {
        item[`${key}_SUCCESS`] = `${item[key]}_success`;
=======
    if (key.toLowerCase().indexOf(`create`) !== - 1 || key.toLowerCase().indexOf(`load`) !== - 1 || key.toLowerCase().indexOf(`update`) !== - 1 || key.toLowerCase().indexOf(`get`) !== - 1 || key.toLowerCase().indexOf(`add`) !== - 1) {
      if (!item[`${key  }_SUCCESS`]) {
        item[`${key  }_SUCCESS`] = `${item[key]  }_success`;
>>>>>>> 87f917326a56014f379fcc8684151dde028090d1
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
