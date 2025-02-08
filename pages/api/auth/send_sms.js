const accountSid = process.env.NEXT_PUBLIC_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH;
const client = require('twilio')(accountSid, authToken);

export default function sendOTP(req, res) {
    const otp = Math.floor(1000 + Math.random() * 9000)
    console.log("otp",otp);

    client.messages
    .create({
        body: `Your otp is: ${otp}`,
        messagingServiceSid: 'MG205b8c89ee22117368949492cd9b772e',
        to: '+918745948789'
    })
    .then(message => console.log(message.sid));
    res.status(200).json({otp: otp});
}
