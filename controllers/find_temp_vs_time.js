const Long_Time_vs_Temp = require('../models/long_time_vs_temp');
const Time_vs_Temp = require('../models/timevstemp');
const find_tof = require('../controllers/find_tof');

async function del_morethan_3_days_records(){
    try {
        let cutoffDate = new Date(Date.now() - (3 * 24 * 60 * 60 * 1000));
        await Long_Time_vs_Temp.deleteMany({ createdAt: { $lt: cutoffDate } });
        // console.log("Successfully removed the past 3 day records from the db" , remove_the_long_records);
        return;
    } catch (error) {
        console.log("Error occured while deleting the documents from db");
        return;
    }
}

async function del_past_2000_records(){
    try {
        let count = await Time_vs_Temp.countDocuments({});
        if(count>=12000){
            let first_find = await Time_vs_Temp.find().sort({createdAt:1}).limit(2000);
            console.log(first_find);
            await Time_vs_Temp.deleteMany({ createdAt: { $lte: first_find[first_find.length - 1].createdAt } });
            // console.log("Successfully deleted the last 2000 documents ",del_2000_documents);
        }
        return;
    } catch (error) {
        console.log("Error occured while removing the last 2000 records ");
    }
}

async function insetIntoDb(non,pat,low_point,high_point,min_height,regFunctions,ref_Tof){
    try {
            non = parseInt(non),
            low_point = parseFloat(low_point),
            high_point = parseFloat(high_point),
            min_height = parseFloat(min_height);
        await del_morethan_3_days_records();
        await del_past_2000_records();
        let tof = await find_tof.readTheExcelFile(non,pat,low_point,high_point,min_height);
        let sub = ref_Tof;
        let deltof = [];
        for(let i=0; i<tof.length; i++){
            deltof.push(tof[i]-sub[i]);
        }
        let findTemp = [];
        for(let i=0; i<deltof.length; i++){
            findTemp.push(regFunctions[i](deltof[i])[1]);
        }
        await Long_Time_vs_Temp.create({
            temperature : findTemp
        });
        await Time_vs_Temp.create({
            temperature: findTemp
        })
        return findTemp;

    } catch (error) {
        console.log("Error occured while insering into the db");
        
    }
    
}


module.exports = {
    fillintoDB : function(non,pat,low_point,high_point,min_height,regFunctions,ref_Tof){
        return insetIntoDb(non,pat,low_point,high_point,min_height,regFunctions,ref_Tof);
    }
}

