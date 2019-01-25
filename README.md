# ONFON SMS Gateway API for Kenya

## Install

```bash
npm install onfonsms --save
```

## Test
```bash
npm test
```

## Basic Usage

```javascript
//import library
const onfon = require('onfonsms');

//get data from database or ...
const Username = 'xxxx'; // onfon client username
const Password = 'xxxx'; // onfon client password
const PhoneNumber = '254xxxxxxxxx'; // to mobile number or recipient number
const Message = 'npm test super agent'; // sms text message
const SenderId = 'YYYYY'; // You can use your project or company name

const SmsId = Math.random().toString(36).replace('0.', '');

const obj = {
    username: Username,
    password: Password,
    senderid: SenderId,
    smsid: SmsId,
    recipient: PhoneNumber,
    message: Message
};

//sedn sms
onfon(obj, function(err,res) {
    if(err){
        console.log('error',err);
        return err;
    }

    console.log('success',res);  
    return res;
});
```

The expected output
```javascript
{
    type : 'success', 
    code : '0'
}
```

### Usage with error

```javascript
//import library
const onfon = require('onfonsms');

//get data from database or ...
const Username = 'xxxx'; // onfon client username
const Password = 'xxxx'; // onfon client password
const PhoneNumber = '+254xxxxxxxxx'; // to mobile number or recipient number
const Message = 'npm test super agent'; // sms text message
const SenderId = 'YYYYY'; // You can use your project or company name

const SmsId = Math.random().toString(36).replace('0.', '');

const obj = {
    username: Username,
    password: Password,
    senderid: SenderId,
    smsid: SmsId,
    recipient: PhoneNumber,
    message: Message
};

//sedn sms
onfon(obj, function(err,res) {
    if(err){
        console.log('error',err);
        return err;
    }

    console.log('success',res);  
    return res;
});
```

The expected output
```javascript
{
    type : 'error', 
    code : 'AUT200',
    message : 'PREFIX_PROHIBITED'
}
```