"use strict";

module.exports = function (query) {
  var objectSearch = {
    keyword: ""
  };

  if (query.keyword) {
    objectSearch.keyword = query.keyword;
    var regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;
  }

  return objectSearch;
};