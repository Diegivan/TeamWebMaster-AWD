const mongoose = require('mongoose');

const { Schema } = mongoose;

const AppointmentSchema = new Schema({
   Name: {type:String, required: true},
   Adress: { type: String, required: true},
   Reference: {type: String, required: true},
   Date: { type: Date, required: true}, 
   Plate: { type: String, required: true},
   cars: {type: String, required: true},
   services: {type: String, required: true},
   hours: {type: String, required: true},
   status: {type: Number, required: true},
   Obs: {type: String, required: true}
})
module.exports = mongoose.model('Appointments',AppointmentSchema)