import {RequestHandler} from 'express'
import {mailGenerator, transporter} from '../../utils/mailHandler'

const resetPassword : RequestHandler = (req : any, res : any, next : any) => {
    const receiver : string = req.body.receiver
    console.log(receiver)
    if(!receiver){
        res.status(400).send("Incomplete data : No receiver")
        return
    }

    const name : string = req.body.name
    if(!name){
        res.status(400).send("Incomplete data : No name")
        return
    }
    var email = {
        body: {
            name: `${name}`,
            intro: 'You have received this email because a password reset request for your account was received.',
            action: {
                instructions: 'Click the button below to reset your password:',
                button: {
                    color: '#DC4D2F',
                    text: 'Reset your password',
                    link: 'https://www.google.com/'
                }
            },
            outro: 'If you did not request a password reset, no further action is required on your part.'
        }
    };
    
    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(email)
    
    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    var emailText = mailGenerator.generatePlaintext(email)

    //Send the e-mail with your favorite mailer
    try{
        transporter.sendMail({
            from: process.env.MAILACCOUNT,
            to: `${receiver}`,
            subject: '[VegaCare] Reset your password',
            html: emailBody,
            text: emailText,
        }, function (err) {
        if (err) return console.log(err);
        console.log('Message sent successfully.');
        res.status(200).send('Message sent successfully.')
        });
    }catch(e){
        console.log(e)
        res.status(400).send('Message failled to be sent')
        next()
        return
    }
    

}

export default resetPassword