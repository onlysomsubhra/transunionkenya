# Transunion `getProduct115' Product API for Kenya

### This is particular Transunion Product event package

## Install

```bash
npm install transunion --save
```

## Test
```bash
npm test
```

## Basic Usage

```javascript
//import library
const transunion = require('transunion');

//get data from database or ...
const Username = 'XXXX';
const Password = 'xxxx';
const AUTH_Username = "yyyy"; 
const AUTH_Password = "zzzz"; 
const Code = '1111';
const InfinityCode = 'aaaa';


const Name1 = 'Test Name 1'; // Mandatory //
const Name2 = 'Test Name 2'; // Mandatory //
const Name3 = '';
const NationalId = 'Nationa Id'; // Mandatory, Have Any one //
const PassportNo = ''; // Mandatory, Have Any one //
const AlienID = ''; // Mandatory, Have Any one //
const DOB = '';

const obj = {
    username : Username,
    password : Password,
    auth_username : AUTH_Username,
    auth_password : AUTH_Password,
    code : Code,
    infinity_code : InfinityCode,
    name1 : Name1,
    name2 : Name2,
    name3 : Name3,
    national_id : NationalId,
    passport_no : PassportNo,
    alien_id : AlienID,
    dob : DOB
};

transunion(obj)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err);
});
```


### Expected success ouput

```
{ 
    type: 'success',
    code: '200',
    message: '',
    responce: 'xml response from transuion end' 
}
```

### Expected error ouput

```
{ 
    type: 'error',
    code: '402',
    message: 'Required input missing',
    responce: 'xml response from transuion end' 
}
```

### Error Code

```
const errorCode = {
                    101 : 'General Authentication Error',
                    102 : 'Invalid Infinity Code',
                    103 : 'Invalid Authentication Credentials',
                    104 : 'Password expired',
                    106 : 'Access Denied',
                    109 : 'Account locked',
                    200 : 'Product request processed successfully',
                    202 : 'Credit Reference Number not found',
                    203 : 'Multiple Credit Reference Number Found',
                    204 : 'Invalid report reason',
                    209 : 'Invalid Sector ID',
                    301 : 'Insufficient Credit',
                    402 : 'Required input missing',
                    403 : 'General Application Error',
                    404 : 'Service temporarily unavailable',
                    408 : 'Unable to verify National ID' 
                };
```