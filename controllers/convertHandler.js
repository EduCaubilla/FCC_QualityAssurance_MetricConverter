/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  this.getIndex = function (input) {
    var indexLastNum;
    
    //Convert input to array for handle
    const arr = input.split('');

    arr.forEach((num, i) => {
        if ((/\d/).test(num)) {
          indexLastNum = i;
        }
    })
    return indexLastNum;

  }

  this.getNum = function (input) {
    
    var result;
    var inputNum = 1;

    //Check if there are no numbers
    if (this.getIndex(input) == undefined) {
      inputNum = 1;
    } else {
      // Get number by knowing the index of the last number
      inputNum = input.slice(0, this.getIndex(input) + 1);

      //Check if there are only numbers
      const reNum = /\d/
      if (!reNum.test(input)) {
        inputNum = "invalid number"
      }

      if (reNum.test(input)) {
        //Check if the number is correct and do no have any non digit element besides a dot or a slash
        const reLet = /[^\d\.\/+]/;
        if (reLet.test(inputNum)) {
          inputNum = "invalid number";
        }

        //Check if the number have two slashes
        const secondFraction = inputNum.indexOf('/', inputNum.indexOf('/') + 1);
        if (secondFraction > 0) {
          inputNum = "invalid number";
        }

        if (inputNum.includes('/') || inputNum.includes('.')) {
          inputNum = eval(inputNum).toFixed(5)
        }
      }
    }
    result = inputNum
    console.log("Result initNum: ", result)
    return result;
  };
  
  this.getUnit = function(input) {
    var result;
    var inputUnit;

    const list = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];

    //Check if there are letters
    const reUnit = /[a-zA-Z]/

    if (!reUnit.test(input)) {
      inputUnit = "no unit"
    }

    if (reUnit.test(input)) {
      // Get unit by knowing the index of the last number
      inputUnit = input.slice(this.getIndex(input) + 1);

      if (!list.includes(inputUnit)) {
        inputUnit = 'invalid unit'
      }
    }

    result = inputUnit;

    console.log("Result initUnit: ", result);
    return result;
  };
  

  this.getReturnUnit = function(initUnit) {
    var result;
    switch (initUnit.toLowerCase()) {
      case ("gal"):
        result = "l";
        break;
      case ("l"):
        result = "gal";
        break;
      case ("lbs"):
        result = "kg";
        break;
      case ("kg"):
        result = "lbs";
        break;
      case ("mi"):
        result = "km";
        break;
      case ("km"):
        result = "mi";
        break;
      case ("no unit"):
        result = "no unit";
        break;
      case ("invalid unit"):
        result = "invalid unit";
      break;
    }

    console.log("getReturnUnit result: ", result)
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    switch (unit) {
      case ("gal"):
        result = "gallons";
        break;
      case ("l"):
        result = "liters";
        break;
      case ("lbs"):
        result = "pounds";
        break;
      case ("kg"):
        result = "kilograms";
        break;
      case ("mi"):
        result = "miles";
        break;
      case ("km"):
        result = "kilometers";
        break;
      case ("no unit"):
        result = "no unit";
        break;
      case ("invalid unit"):
        result = "invalid unit";
        break;
    }
    
    console.log("spellOutUnit result: ", result)
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    if (initNum == "invalid number") {
      result = "invalid number"
    }

    if (initNum !== "invalid number" && initUnit !== "no unit" && initUnit !== "invalid unit") {
      switch (initUnit.toLowerCase()) {
        case ("gal"):
          result = parseFloat((initNum * galToL).toFixed(5));
          break;
        case ("l"):
          result = parseFloat((initNum / galToL).toFixed(5));
          break;
        case ("lbs"):
          result = parseFloat((initNum * lbsToKg).toFixed(5));
          break;
        case ("kg"):
          result = parseFloat((initNum / lbsToKg).toFixed(5));
          break;
        case ("mi"):
          result = parseFloat((initNum * miToKm).toFixed(5));
          break;
        case ("km"):
          result = parseFloat((initNum / miToKm).toFixed(5));
          break;
      }
    }
    console.log("Convert result - returnNum: ", result)
    return result;
  };
  
  this.getString = function (initNum, initUnit, returnNum, returnUnit, input) {

    inputUnit = this.spellOutUnit(initUnit.toLowerCase());
    outputUnit = this.spellOutUnit(returnUnit);

    var result;
      
    if (returnUnit !== "invalid unit" && returnNum !== "invalid number") {
      result = `${initNum} ${inputUnit} converts to ${returnNum} ${outputUnit}`
    }
    if (returnUnit === "invalid unit" || returnUnit === "no unit"  || returnNum === "invalid number") {
      result = `Error - ${input}`
    }

    console.log(result);
    
    return result;
  };
  
}

module.exports = ConvertHandler;
