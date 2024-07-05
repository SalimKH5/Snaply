const BASE_URL =  process.env.NEXT_PUBLIC_BASE_API_URL
const API_BASE_URL= BASE_URL + "/api"



const login_client=API_BASE_URL+"/Login"
const register_client=API_BASE_URL+"/register"


const User=API_BASE_URL+"/User/"

const posts=API_BASE_URL+"/posts/"


const SearchUser=API_BASE_URL+"/Search"

const FindUser=API_BASE_URL+"/verification"

const CodeVerfication=API_BASE_URL+"/CodeVerfication"
const ResetPassword=API_BASE_URL+"/passwordReset"
export default {
    API_BASE_URL,
    login_client,
    register_client,
    posts,
    User,
    BASE_URL,
    SearchUser,
    FindUser,
    CodeVerfication,
    ResetPassword
    
}