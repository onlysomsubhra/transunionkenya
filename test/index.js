const onfon = require('../index');

const Username = 'xxxx';
const Password = 'xxxx';
const PhoneNumber = '254xxxxxxxxx';
const message = 'npm test super agent';
const SenderId = 'YYYYY';

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