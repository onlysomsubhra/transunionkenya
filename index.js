const superagent = require('superagent');
const _ = require('lodash');
const xmlParse = require("xml-parse");

const config = {
    username: null, 
    password: null, 
    senderid: null, 
    smsid: null, 
    recipient: null, 
    message: null, 
    timeout: 5000
}

function create(obj, cb) {

    const url = 'https://onfon.co.ke:8080/smshttppush/index.php?wsdl';

    const headers = {
        'user-agent': 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)',
        'Content-Type': 'text/xml;charset=UTF-8',
        'soapAction': ''
    };
    
    obj = Object.assign(config,obj);
    
    let username = obj.username,
        password = obj.password,
        senderid = obj.senderid,
        smsid = obj.smsid,
        recipient = obj.recipient,
        message = obj.message,
        timeout = obj.timeout;
    
    //smsid = obj.senderid.toLower()+smsid;
    //console.log(smsid)
    if (_.isEmpty(username)) {
        throw ("Invalid username");
    }
    if (_.isEmpty(password)) {
        throw ("Invalid password");
    }
    if (_.isEmpty(senderid)) {
        throw ("Invalid sms sender id");
    }
    if (_.isEmpty(smsid)) {
        throw ("Invalid sms id");
    }
    if (_.isEmpty(recipient)) {
        throw ("Invalid recipient no");
    }
    if (_.isEmpty(message)) {
        throw ("Invalid message");
    }

    const xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bul="http://www.example.org/bulkSms/">'+
                '<soapenv:Header/>'+
                '<soapenv:Body>'+
                '<bul:SMSSubmitReq>'+
                '<Username>'+username+'</Username>'+
                '<Password>'+password+'</Password>'+
                '<InterfaceID>bk</InterfaceID>'+
                '<SmsRecord>'+
                '<SmsId>'+smsid+'</SmsId>'+
                '<SmsRecipient>'+recipient+'</SmsRecipient>'+
                '<SmsText>'+message+'</SmsText>'+
                '<SmsSenderId>'+senderid+'</SmsSenderId>'+
                '</SmsRecord>'+
                '<ReportEnabled>true</ReportEnabled>'+
                '</bul:SMSSubmitReq>'+
                '</soapenv:Body>'+
                '</soapenv:Envelope>';

    superagent
        .post(url)
        .send(xml) // query string
        .timeout({
            response: timeout,  // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
        })
        .set(headers)
        .then((res) => {
            // Do something
            const apiRes = res.text;
        
            var xmlDoc = new xmlParse.DOM(xmlParse.parse(apiRes));
            var StatusRecord = xmlDoc.document.getElementsByTagName("StatusRecord")[0];
            var StatusCode = StatusRecord.childNodes[0].innerXML;
            var StatusError = StatusRecord.childNodes[1].innerXML;
            var StatusMessage = StatusRecord.childNodes[2].innerXML;
            //console.log('res: ' + JSON.stringify(StatusRecord, null, 2));
            if(StatusCode == 0) {
                cb(null,{type : 'success', code : StatusCode})
            } else {
                cb({type : 'error', code : StatusCode, message: StatusError},null)
            }
        })
        .catch(err=>{
            cb({type : 'error', code : err, message: err},null)
        });
}

module.exports = create;