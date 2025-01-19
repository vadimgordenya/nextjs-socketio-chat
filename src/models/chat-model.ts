import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'users'
  },
  createdBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'users'
  },
  lastMessage: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'messages'
  },
  isGroupChat: {
    type: Boolean,
    default: false
  },
  groupName: {
    type: String,
    default: ''
  },
  profilePicture: {
    type: String,
    default: ''
  },
  groupBio: {
    type: String,
    default: ''
  },
  groupAdmins: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'users'
  },
  unreadCounts: {
    type: Object,
    ref: {}
  }
}, { timestamps: true });

if (mongoose.models?.['chats']) {
  mongoose.deleteModel('chats');
}

const ChatModel = mongoose.model('chats', chatSchema);

export default ChatModel;
