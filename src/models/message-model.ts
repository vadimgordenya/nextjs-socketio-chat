import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  readBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'users',
  }
}, { timestamps: true });

if (mongoose.models?.['messages']) {
  mongoose.deleteModel('messages');
}

const MessageModel = mongoose.model('messages', messageSchema);

export default MessageModel;
