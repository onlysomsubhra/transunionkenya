const superagent = require('superagent');
const _ = require('lodash');
const xmlParse = require("xml-parse");

const config = {
    username: null,
    password: null,
    auth_username: null,
    auth_password: null,
    code: null,
    infinity_code: null,
    name1: null,
    name2: null,
    name3: null,
    national_id: null,
    passport_no: null,
    alien_id: null,
    dob: null,
    timeout: 5000
}

function create(obj) {

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

    const url = 'https://secure3.transunionafrica.com/crbws/ke?wsdl';    
    
    obj = Object.assign(config,obj);
    
    let username = obj.username,
        password = obj.password,
        auth_username = obj.auth_username,
        auth_password = obj.auth_password,
        code = obj.code,
        infinity_code = obj.infinity_code,
        name1 = obj.name1,
        name2 = obj.name2,
        name3 = obj.name3,
        national_id = obj.national_id,
        passport_no = obj.passport_no,
        alien_id = obj.alien_id,
        dob = obj.dob,
        timeout = obj.timeout;
    
    //smsid = obj.senderid.toLower()+smsid;
    //console.log(smsid)
    if (_.isEmpty(username)) {
        throw ("Invalid username");
    }
    if (_.isEmpty(password)) {
        throw ("Invalid password");
    }
    if (_.isEmpty(auth_username)) {
        throw ("Invalid auth username");
    }
    if (_.isEmpty(auth_password)) {
        throw ("Invalid auth password");
    }
    if (_.isEmpty(code)) {
        throw ("Invalid code");
    }
    if (_.isEmpty(infinity_code)) {
        throw ("Invalid infinity code");
    }
    if (_.isEmpty(name1)) {
        throw ("Invalid name1");
    }
    if (_.isEmpty(name2)) {
        throw ("Invalid name2");
    }

    if(national_id.length == 0 && passport_no.length == 0 && alien_id.length == 0)
    {
        throw ("Invalid national id or password no or alien id");
    }

    const headers = {
        'user-agent': 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)',
        'Content-Type': 'text/xml;charset=UTF-8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'soapAction': 'getProduct115'
    };

    const xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hs="http://ws.crbws.transunion.ke.co/">'+
                '<soapenv:Body>'+
                '<hs:getProduct115>'+
                '<username>'+username+'</username>'+
                '<password>'+password+'</password>'+
                '<code>'+code+'</code>'+
                '<infinityCode>'+infinity_code+'</infinityCode>'+
                '<name1>' + name1 + '</name1>'+
                '<name2>' + name2 + '</name2>'+
                '<name3>' + name3 + '</name3>'+
                '<nationalID>' + national_id + '</nationalID>'+
                '<passportNo>' + passport_no + '</passportNo>'+
                '<alienID>' + alien_id + '</alienID>'+
                '<dateOfBirth>' + dob + '</dateOfBirth>'+
                '<physicalAddress></physicalAddress>'+
                '<physicalTown></physicalTown>'+
                '<physicalCountry></physicalCountry>'+
                '<reportSector>2</reportSector>'+
                '<reportReason>2</reportReason>'+
                '</hs:getProduct115>'+
                '</soapenv:Body>'+
                '</soapenv:Envelope>';

    //let response = {};
    return new Promise((resolve, reject) => {
        superagent
        .post(url)
        .send(xml) // query string
        .timeout({
            response: timeout,  // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
        })
        .auth(auth_username, auth_password)
        .set(headers)
        .then((res) => {

            if(res.text)
            {
                //console.log('res', res.text);
                // Do something
                const apiRes = res.text;
                let scoreInfo = {};
                //console.log(JSON.stringify(apiRes, null, 2))
                var xmlDoc = new xmlParse.DOM(xmlParse.parse(apiRes));
                let StatusCode, scoreOutput;
                let innerRes = xmlDoc.document.getElementsByTagName("return")[0];
                let xLen = xmlDoc.document.getElementsByTagName("return")[0].childNodes.length;
                //console.log('2', JSON.stringify(innerRes, null, 2));
                if (xLen > 1) {
                    StatusCode = innerRes.childNodes[xLen - 3].innerXML;
                    scoreOutputLen = innerRes.childNodes[xLen - 2].childNodes.length;
                    if (scoreOutputLen > 0) {

                        let grade = innerRes.childNodes[xLen - 2].childNodes[0].innerXML;
                        let credit_score = innerRes.childNodes[xLen - 2].childNodes[1].innerXML;
                        let probability = innerRes.childNodes[xLen - 2].childNodes[2].innerXML;
                        let loan_history_1 = innerRes.childNodes[xLen - 2].childNodes[3].innerXML;
                        let loan_history_2 = innerRes.childNodes[xLen - 2].childNodes[4].innerXML;
                        let loan_history_3 = innerRes.childNodes[xLen - 2].childNodes[5].innerXML;
                        let loan_history_4 = innerRes.childNodes[xLen - 2].childNodes[6].innerXML;

                        scoreInfo = {
                            'grade': grade,
                            'credit_score': credit_score,
                            'probability': probability,
                            'loan_history_1': loan_history_1,
                            'loan_history_2': loan_history_2,
                            'loan_history_3': loan_history_3,
                            'loan_history_4': loan_history_4
                        }
                    }
                } else {
                    StatusCode = innerRes.childNodes[0].innerXML;
                }

                if (StatusCode == 200) {
                    response = {
                        'type': 'success',
                        'code': StatusCode,
                        'message': scoreInfo,
                        'input_request': xml,
                        'output_response': apiRes
                    };
                } else {
                    response = {
                        'type': 'error',
                        'code': StatusCode,
                        'message': errorCode[StatusCode],
                        'input_request': xml,
                        'output_response': apiRes
                    };
                }
            } else {
                response = {'type' : 'error', 'code': '', 'message' : 'No text found', 'input_request' : xml, 'output_response' : res};
            }

            resolve(response);
        })
        .catch(err=>{
            //response = {'type' : 'error', 'code' : , 'message' : '', 'input_request' : xml, 'output_response' : err.response.text};
            reject(err);
        });
    });
}

module.exports = create;