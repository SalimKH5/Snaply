// types/global.d.ts

export { }


declare global {
  interface ErrType {
    err: boolean,
    message: string,
  }

  interface ErroServer {
    message: string,
    error: {
      message: string,
    }
  }
  // interface Posts {
  //   username: string,
  //   PathFile: string,
  //   _id: string,
  //   postId: string,
  //   title: string,
  //   likes: any[],
  //   comments: any[];
  //   postby: {
  //     _id: string,
  //     username: string,
  //   }
  // }
  interface Post {
    _id: string,
    PathFile: string,
    title: string,
    likes: [
      {
        userId: string,
        _id: string,
      },
    ],
    postby: {
      _id: string,
      username: string
    },
    comments: [
      {
        TextComment: string,
        userId: string,
        _id: string,
        likes: [
          {
            userId: string,
            _id: string,
          }
        ]
      },
    ],
    created: string,
  }


  interface Comments {
    userId: string,
    postId: string,
    comments: any[],
    src: string
    title: string,
    postby: {
      _id: string,
      username: string,
    },
    likes: any[]
  }
  interface PostContent {
    postId: string,
    likes: any[],
    title: string,
    comments: any[],
    src: string,
    postby: {
      _id: string,
      username: string,
    },
    userId: string,
  }
  interface Commented {

    userId: string,
    postId: string
  }
  interface Likes {
    userId: string
    postId: string
    likes?: any[],
    comment_id: string | null
  }
  interface User {
    _id: string,
    email: string,
    hashPassword: string,
    fullName: string,
    username: string,
    saveposts: Post[],
    followers: any[],
    follwing: any[],
    postsLength:number
}

}