const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: String,
  status: String,
  
})