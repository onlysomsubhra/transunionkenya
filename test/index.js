const onfon = require('../index');

const Username = 'lpesa';
const Password = 'Yb8Cw3gh';
const PhoneNumber = '254720045224';
const message = 'npm test super agent';
const SenderId = 'L-PESA';

const min=1000; 
const max=9999;  
const SmsId = Math.floor(Math.random() * (+max - +min)) + +min; 

onfon({
    username: Username,
    password: Password,
    senderid: SenderId,
    smsid: SmsId,
    recipient: PhoneNumber,
    message: message,
    timeout: 10000
}, function(err,res) {
    if(err){
        console.log('error',err);
        return err;
    }

    console.log(res);  
    return res;
});