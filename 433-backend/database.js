var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
var reqSchema = mongoose.Schema({
  userId: String,
  requestId: String,
  requestMsg: String,
  reqDT: Date,
});

module.exports = mongoose.model("reqrecord", reqSchema);
