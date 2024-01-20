'use strict';

const glob = require('glob');
module.exports = {
  toUpperCaseFirstLetter,
  toUpperCaseAllFirstLetters,
  toCamelCase,
  replaceAll,
  getFilePaths,
  slugify,
};

function toUpperCaseAllFirstLetters(str) {
  const words = str.split(' ');
  str = words.map((word) => word[0].toUpperCase() + word.substring(1)).join('');
  return str;
}

function toCamelCase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr) {
    return chr.toUpperCase();
  });
}

function toUpperCaseFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function getFilePaths(pathArr) {
  let filePaths = [];
  for (const path of pathArr) {
    const files = glob.sync(path);
    filePaths = filePaths.concat(files);
  }

  return filePaths;
}

function slugify(text = '') {
  let result = replaceAll(text, '\\s+', '-');
  result = replaceAll(result, '_', '-');
  result = replaceAll(result, '\\.', '-');
  result = result.toLowerCase();
  return result;
}
