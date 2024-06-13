import mongoose from "mongoose";

const Message = mongoose.model('Message', {
  userId:String,
  username: String,
  text: String,
  date: Date
});

export default Message;