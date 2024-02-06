const csv = require('csv-parser')
const fs = require('fs');
const path = require('path');


function get_peaks(filePath,notches,low_point,high_point,min_height) {
    return new Promise((resolve, reject) => {
        if(notches%2!=0){
            return reject("Odd number of notches are not accepted");
        }
        let results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                if (data.Time >= low_point && data.Time <= high_point && data["Channel A"] > min_height) {
                    results.push(data);
                }
            })
            .on('end', () => {
                // console.log(results);
                let k = 0;
                results.sort((k1,k2)=>k2["Channel A"]-k1["Channel A"]);
                let peaks = [];
                for(let i=0; i<results.length; i++){
                    let check = true;
                    for(let j=0; j<peaks.length; j++){
                        if(Math.abs(results[i].Time- peaks[j])<=15){
                            check = false;
                            
                            break;
                        }
                    }
                    if(check){
                        peaks.push(results[i].Time);
                    }
                }
                if(peaks.length != (notches)){
                    // console.log("This type of data doesn't support this algorithm, kindly check the data or modify the algorithm");
                    return reject("This type of data doesn't support this algorithm, kindly check the data or modify the algorithm");
                }
                    // console.log(peaks.sort());
                    resolve(peaks.sort());
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = {
    findPeaks : function(no_of_nothches,file_path,low_point,high_point,min_height){
        return get_peaks(file_path,no_of_nothches,low_point,high_point,min_height);
    }
}