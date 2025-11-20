const mongoose = require('mongoose');
let conn = null;
const connectDb = async ()=>{
  if(conn) return conn;
  const url = process.env.MONGO_URL || 'mongodb://localhost:27017/student-chat';
  conn = await mongoose.connect(url, { useNewUrlParser:true, useUnifiedTopology:true });
  return conn;
};
const UserSchema = new mongoose.Schema({
  username:{type:String,unique:true,required:true},
  email:String,
  passwordHash:String,
  role:{type:String,default:'user'},
  status:{type:String,default:'pending'},
  adminNotes:[{text:String,createdBy:mongoose.Types.ObjectId,createdAt:Date}],
  mutedUntil:Date,
  badges:[String],
  reputation:{type:Number,default:0},
  createdAt:Date
});
const ChatMessageSchema = new mongoose.Schema({
  userId:mongoose.Types.ObjectId,
  username:String,
  text:String,
  moderated:Boolean,
  reason:String,
  channel:String,
  createdAt:Date
});
const AuditLogSchema = new mongoose.Schema({
  actorId:mongoose.Types.ObjectId,
  action:String,
  targetId:mongoose.Types.ObjectId,
  details:String,
  createdAt:Date
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);
const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
module.exports = { connectDb, User, ChatMessage, AuditLog };
