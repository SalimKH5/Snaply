import jwt from "jsonwebtoken"



const secret=process.env.JWT_SECRET



export  function decrypt(input: string|undefined) {
    
    if(secret && input){
        try {
            const payload =  jwt.verify(input, secret);
         
            if(payload){
                return payload;
            } 
        } catch (error) {
            throw new Error('not authorised')
        }
        
    }else{
        return null;
    }   
  
  }