const mongoose = require('mongoose');

const long_tvst_schema = new mongoose.Schema({
    temperature : [{
        type: mongoose.Schema.Types.Decimal128
    }]
},{timestamps:true});

const LongTvsT = mongoose.model('Long_Time_vs_Temp',long_tvst_schema);
module.exports = LongTvsT;