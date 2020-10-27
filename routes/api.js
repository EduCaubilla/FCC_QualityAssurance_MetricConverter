/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')    
    .get(function (req, res) {
      console.log("INTRO QUERY " + req.query.input);
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit, input);

      var object = {};

      if (returnNum == "invalid number") {
        object = {
          error: "invalid number",
          string: toString
        }
      }
      if (returnUnit == "invalid unit") {
        object = {
          error: "invalid unit",
          string: toString
        }
      }
      if (returnUnit == "no unit") {
        object = {
          error: "no unit",
          string: toString
        }
      }
      if (returnNum == "invalid number" && returnUnit == "invalid unit") {
        object = {
          error: "invalid number & unit",
          string: toString
        }
      }
      
      if (returnNum !== "invalid number" && returnUnit !== "invalid unit" && returnUnit !== "no unit") {
        object = {
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: toString
        }
      }

      console.log("BACK OBJECT", object);
      
      res.status(200).json(object)
    });
    
};
