type Post={
    id:string;
    title:string;
    desc:string;
    date:Date;
}


let posts: Post[]=[];



export const getPosts=()=>posts;
export const addPost=(post:Post)=>{
    posts.push(post);
};
export const deletePost=(id:string)=>{
    posts=posts.filter((post:Post)=>post.id!==id);
  
};
export const UpdatePost=(id:string,title:string,
    desc:string
   )=>{
    const updatepost=posts.find((post:Post)=>post.id===id);
    if(updatepost){
        updatepost.title=title;
        updatepost.desc=desc;
    

     
    }else{
        throw new Error('no post found')
    }
};



export const getById=(id:string)=>{
    const post=posts.find((post:Post)=>post.id===id);
    return post
}