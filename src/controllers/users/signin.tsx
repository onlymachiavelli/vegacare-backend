import * as Express from 'express'
import * as Services from './../../services/users.services'

const SignIn : Express.RequestHandler = async (req, res) =>{
    //get the username and the password 
    if (!req.body.email ||!req.body.password ) {
        res.status(400).send("didn't get the email or the passowrd")
        return 
    }

    const email = req.body.email
    const password = req.body.password



    //get the user 
    const target : any = await Services.GetOne("email" , email)
    if (!target) {
        res.status(400).send("user not found")
        return 
    }
    console.log(target)

}       

export default SignIn