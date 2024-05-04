
import { model, Schema, Model, Document,Types,models  } from 'mongoose';

interface ILike {
  userId: Types.ObjectId;
}

interface IComment {
  TextComment: string;
  userId: Types.ObjectId;
}

export interface IPost extends Document {
  PathFile: string;
  title: string;
  likes: ILike[];
  comments: IComment[];
  postby: Types.ObjectId;
  created: string;
}

const PostSchema: Schema<IPost> = new Schema<IPost>({
  PathFile: String,
  title: String,
  likes: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' }
    },
  ],
  postby: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  comments: [
    {
      TextComment: String,
      userId: { type: Schema.Types.ObjectId, ref: 'User'}, // Reference to the User model 
      likes: [
        {
          userId: { type: Schema.Types.ObjectId, ref: 'User' }
        },
      ],
    },
  ],
  created: String,
});


export default models.Post || model<IPost>('Post', PostSchema);
