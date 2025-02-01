export interface UserType {
  _id: string;
  clerkUserId: string;
  name: string;
  userName: string;
  email: string;
  profilePicture: string;
  createAt: string;
  updateAt: string;
}

export interface MessageType {
  _id: string;
  socketMessageId: string;
  chat: ChatType;
  sender: UserType;
  text: string;
  image: string;
  readBy: UserType[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatType {
  _id: string;
  users: UserType[];
  createdBy: UserType;
  lastMessage: MessageType;
  isGroupChat: boolean;
  groupName: string;
  groupProfilePicture: string;
  groupBio: string;
  groupAdmins: UserType[];
  unreadCounts: any
}
