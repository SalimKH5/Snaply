import { models, model, Schema, Model, Document, Types } from 'mongoose';

// Define types for TypeScript
export interface IUser extends Document {
  email: string;
  hashPassword: string;
  fullName: string;
  username: string;
  token?: string;
  thumbnail?: string;
  gender?: string;
  bio?: string;
  saveposts: SavedPost[];
  followers: Followers[];
  follwing: Follwing[];
  code?:string;

}

interface SavedPost {
  postId: Types.ObjectId;
}
interface Followers {
  userId: Types.ObjectId;
}
interface Follwing {
  userId: Types.ObjectId;
}



const UserSchema: Schema<IUser> = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  followers: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' }
    },
  ],
  follwing: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' }
      
    }
  ],
  thumbnail: {
    type: String,
    default:"/profile-icon.png"
  },
  bio: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  code:{
    type:String,
    
  },
  saveposts: [
    {
      postId: { type: Schema.Types.ObjectId, ref: 'Post' }
    },
  ],
  token: String,
});



export default models.User || model<IUser>('User', UserSchema);
