const mongoose = require('mongoose');

const tofSchema = new mongoose.Schema({
    temperature : {
        type: mongoose.Schema.Types.Decimal128,
        required : true
    },
    time_of_flights : [{
        type : mongoose.Schema.Types.Decimal128
    }]
},{timestamps:true});

const TOFs = mongoose.model('Time_of_Flights',tofSchema);
module.exports = TOFs;