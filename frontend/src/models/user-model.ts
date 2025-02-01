import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String
    },
    profilePicture: {
      type: String,
      required: false
    },
    bio: {
      type: String,
      required: false
    }
  }, {
    timestamps: true
  }
);

if (mongoose.models?.['users']) {
  mongoose.deleteModel('users');
}

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
