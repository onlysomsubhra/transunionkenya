const onfon = require('../index');

const username = 'lpesa';
const password = 'Yb8Cw3gh';
const phone_number = '+254720045224';
const message = 'npm test super agent';

const url = 'https://onfon.co.ke:8080/smshttppush/index.php?wsdl';

const min=1000; 
const max=9999;  
const random = Math.floor(Math.random() * (+max - +min)) + +min; 
const xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bul="http://www.example.org/bulkSms/"><soapenv:Header/><soapenv:Body><bul:SMSSubmitReq><Username>'+username+'</Username><Password>'+password+'</Password><InterfaceID>bk</InterfaceID><SmsRecord><SmsId>'+random+'</SmsId><SmsRecipient>'+phone_number+'</SmsRecipient><SmsText>'+message+'</SmsText><SmsSenderId>L-PESA</SmsSenderId></SmsRecord><ReportEnabled>true</ReportEnabled></bul:SMSSubmitReq></soapenv:Body></soapenv:Envelope>';

const headers = {
    'user-agent': 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)',
    'Content-Type': 'text/xml;charset=UTF-8',
    'soapAction': '',
};

onfon(url, headers, xml, 10000);