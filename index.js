const superagent = require('superagent');
const _ = require('lodash');

const alert = console.error;

function create(username, password, phone_number, message) {

    if (_.isEmpty(username)) {
        throw ("Invalid username");
    }
    if (_.isEmpty(password)) {
        throw ("Invalid password");
    }
    if (_.isEmpty(phone_number)) {
        throw ("Invalid phone number");
    }
    if (_.isEmpty(message)) {
        throw ("Invalid message");
    }

    const URL = 'https://onfon.co.ke:8080/smshttppush/index.php?wsdl';

    var min=1000; 
    var max=9999;  
    var random = Math.floor(Math.random() * (+max - +min)) + +min; 
    const data_obj = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bul="http://www.example.org/bulkSms/"><soapenv:Header/><soapenv:Body><bul:SMSSubmitReq><Username>'+username+'</Username><Password>'+password+'</Password><InterfaceID>bk</InterfaceID><SmsRecord><SmsId>'+random+'</SmsId><SmsRecipient>'+phone_number+'</SmsRecipient><SmsText>'+message+'</SmsText><SmsSenderId>L-PESA</SmsSenderId></SmsRecord><ReportEnabled>true</ReportEnabled></bul:SMSSubmitReq></soapenv:Body></soapenv:Envelope>';

    superagent
        .post(URL)
        .send(data_obj) // query string
        .set('Content-Type', 'text/xml')
        .then((res, err) => {
            // Do something
            if (err) 
            { 
                console.log('err: ' + JSON.stringify(err));
                return err;
            }

            console.log('res: ' + JSON.stringify(res, null, 2));
            return res;
        })
        .catch(err=>console.error(err));
}

module.exports = create;