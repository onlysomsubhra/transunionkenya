const onfon = require('../index');

const Username = 'lpesa'; //'xxxx';
const Password = 'Yb8Cw3gh'; //'xxxx';
const PhoneNumber = '254720045224'; // '254xxxxxxxxx'
const Message = 'npm test sms';
const SenderId = 'L-PESA';

//const min=1000; 
//const max=9999;  
//const SmsId = Math.floor(Math.random() * (+max - +min)) + +min; 
const SmsId = Math.random().toString(36).replace('0.', '');

const obj = {
    username: Username,
    password: Password,
    senderid: SenderId,
    smsid: SmsId,
    recipient: PhoneNumber,
    message: Message
};

onfon(obj, function(err,res) {
    if(err){
        console.log('error',err);
        return;
    }

    console.log('success',res);
});