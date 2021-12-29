const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
   name: { type: String, required: true},
   lastname: { type: String, required: true}, 
   CI: { type: String, required: true},
   username: { type: String, required: true},
   password: { type: String, required: true}
})
module.exports = mongoose.model('Admin',AdminSchema)