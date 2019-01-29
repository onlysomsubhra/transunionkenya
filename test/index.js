const transunion = require('../index');

/* Dummy Data */
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