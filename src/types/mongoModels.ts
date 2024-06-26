import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  //   id: string;
  _id: string | null;
  username: string;
  mail: string;
  password: string;
  name?: string;
  lastName?: string;
  phone?: number;
  avatar?: string;
  zodiac?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface IDream extends Document {
  user: mongoose.Types.ObjectId;
  visibility: {
    isPublic: boolean;
    isVisibleForFriends: boolean;
    othersCanComment: boolean;
    othersCanShare: boolean;
    visibleFor: [mongoose.Types.ObjectId];
  };
  dream: string;
  title?: string;
  date: string;
  category: string;
  image: string;
  people: {
    fromApp: [
      {
        wantedToKnow: boolean;
        person: mongoose.Types.ObjectId;
      }
    ];
    fromNoApp: [string];
  };
  recording: string;
  isLucid: boolean;
}

export interface IMAtchDream extends Document {
  users: [mongoose.Types.ObjectId];
  dreams: [mongoose.Types.ObjectId];
  identifiers: {
    parts: [string];
    unified: string;
  };
}

export interface IMessage extends Document {
  fromUser: mongoose.Types.ObjectId;
  content: {
    message: string;
    media: string;
  };
  conversation: mongoose.Types.ObjectId;
  removed: {
    forMeOnly: boolean;
    forAll: boolean;
  };
}

export interface ITag extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  dreamsRef: [mongoose.Types.ObjectId];
}
export interface ICategory extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  color: string;
  icon: string;
  isDefault: boolean;
}
export interface IComment extends Document {
  user: mongoose.Types.ObjectId;
  dream: mongoose.Types.ObjectId;
  visibility: {
    isPublic: boolean;
    isVisibleForFriends: boolean;
    visibleFor: [mongoose.Types.ObjectId];
  };
  image: string;
  replayTo: mongoose.Types.ObjectId;
  isSubComment: boolean;
  comment: string;
}
export interface IUserFriendList extends Document {
  user: mongoose.Types.ObjectId;
  friends: [mongoose.Types.ObjectId];
}
export interface IUserConversationList extends Document {
  user: mongoose.Types.ObjectId;
  conversationsList: [mongoose.Types.ObjectId];
}
