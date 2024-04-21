import prisma from "../../prisma"


export const connectToDatabase=async ()=>{
    try{
        await prisma.$connect();
        console.log("connected")
    }catch(error){
        console.error({error});
        throw new Error('Unable to connect to database')
    }
}