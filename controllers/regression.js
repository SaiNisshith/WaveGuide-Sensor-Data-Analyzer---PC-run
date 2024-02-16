const reg = require('regression');
const TimeOfFlight = require('../models/time_of_flight');
async function regressionEquationInserter(){
    
    try {
        let tempFunctions = [];
        let refData = await TimeOfFlight.find().sort({temperature : 1});
        let noOfSensors = refData[0].time_of_flights.length;
        let sub = refData[0].time_of_flights;
        for(let i=0; i<noOfSensors; i++){
            let coordi = [];
            for(let j=0; j<refData.length; j++){
                let point = [];
                point.push(parseFloat(refData[j].time_of_flights[i])-sub[i]);
                point.push(parseFloat(refData[j].temperature));
                coordi.push(point);
            }
            let equ = await reg.polynomial(coordi,{order:6, precision:5});
            // console.log(equ);
            // console.log(sub);
            tempFunctions.push(equ.predict);
        }
        let sendObject = {
            temp_Functions : tempFunctions,
            ref_Tof : sub
        }
        // console.log(tempFunctions);
        return sendObject;
    } catch (error) {
        console.log("Error occured in performing regression analysis ", error);
    }
    
}

module.exports = {
    ToT_Functions : regressionEquationInserter()
}

