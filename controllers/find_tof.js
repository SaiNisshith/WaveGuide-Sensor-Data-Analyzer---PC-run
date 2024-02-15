const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const find_peaks = require('./find_peaks');


async function processFiles(non,pat,low_point,high_point,min_height,min_distance) {
    const directoryPath = pat;
    try {
        const fileResults = await find_peaks.findPeaks(non,directoryPath,low_point,high_point,min_height,min_distance);
        // console.log("Results for ",temp, "deg C : " ,fileResults);
        let sensor = [],w=0,e=1;
        for(let q=0; q<(non/2); q++){
            sensor.push(fileResults[e]-fileResults[w]);
            e+=2;
            w+=2;
        }
        return sensor;
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

module.exports = {
    readTheExcelFile : function(number_of_notches,filePath,low_point,high_point,min_height,min_distance){
        return processFiles(number_of_notches,filePath,low_point,high_point,min_height,min_distance);
    }
    
};