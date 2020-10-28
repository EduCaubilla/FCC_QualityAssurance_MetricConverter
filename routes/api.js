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
        res.status(200).send("invalid number")
      }
      if (returnUnit == "invalid unit") {
        res.status(200).send("invalid unit")
      }
      if (returnUnit == "no unit") {
        res.status(200).send({error: "no unit", string: toString})
      }
      if (returnNum == "invalid number" && returnUnit == "invalid unit") {
       res.status(200).send("invalid number & unit")
      }
      
      if (returnNum !== "invalid number" && returnUnit !== "invalid unit" && returnUnit !== "no unit") {
        object = {
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: toString
        }      
        res.status(200).json(object)
      }
      
    });
    
};
