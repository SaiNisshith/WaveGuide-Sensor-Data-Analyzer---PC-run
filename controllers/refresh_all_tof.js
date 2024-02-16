const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const TimeofFlight = require('../models/time_of_flight');
const TimeVsTemp = require('../models/timevstemp');
const find_peaks = require('./find_peaks');
const Long_Time_vs_Temp = require('../models/long_time_vs_temp');

async function deleteExisting(){
    try {
        let tof = await TimeofFlight.deleteMany({});
        await Long_Time_vs_Temp.deleteMany({});
        await TimeVsTemp.deleteMany({});
        console.log("Deleted Successfully");
    } catch (error) {
        console.log(error);
    }

}


let results = {};

async function processFiles(non,pat,low_point,high_point,min_height,min_distance) {
    const directoryPath = pat;
    
    try {
        await deleteExisting();
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            try {
                // const fileResults = await a(filePath,non);
                const fileResults = await find_peaks.findPeaks(non,filePath,low_point,high_point,min_height,min_distance);
                let temp = file.split('.')[0];
                // console.log("Results for ",temp, "deg C : " ,fileResults);
                // let sensor = [],w=0,e=1;
                // for(let q=0; q<(non/2); q++){
                //     sensor.push(fileResults[e]-fileResults[w]);
                //     e+=2;
                //     w+=2;
                // }
                let sensor =[];
                for(let q=0; q<(non-1); q++){
                    sensor.push(fileResults[q+1]-fileResults[q]);
                }
                try {
                    let find_tof = await TimeofFlight.create({
                        temperature : parseFloat(temp),
                        time_of_flights : sensor
                    })
                    // console.log(find_tof);
                } catch (error) {
                    console.log("Error in refreshing all tofs ", err);
                }
                results[temp] = sensor;
            } catch (error) {
                console.error("Error processing file:", filePath, error);
            }
            
        }
        return results;
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

module.exports = {
    readTheExcelFiles : function(number_of_notches,filePath,low_point,high_point,min_height,min_distance){
        return processFiles(number_of_notches,filePath,low_point,high_point,min_height,min_distance);
    }
    
};