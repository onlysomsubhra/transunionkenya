const superagent = require('superagent');
const _ = require('lodash');
const xmlParse = require("xml-parse");

const alert = console.error;

function create(url, headers, xml, timeout = 5000) {

    if (_.isEmpty(url)) {
        throw ("Invalid url");
    }
    if (_.isEmpty(headers)) {
        throw ("Invalid headers");
    }
    if (_.isEmpty(xml)) {
        throw ("Invalid xml");
    }

    let response = {};
    superagent
        .post(url)
        .send(xml) // query string
        .timeout({
            response: timeout,  // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
        })
        .set(headers)
        .then((res, err) => {
            // Do something
            if (err) 
            { 
                console.log('err: ' + JSON.stringify(err));
                response = {
                    type : 'error',
                    response: err
                };
            } else {

                const apiRes = res.text;
            
                var xmlDoc = new xmlParse.DOM(xmlParse.parse(apiRes));
                var StatusRecord = xmlDoc.document.getElementsByTagName("StatusRecord")[0];
                var StatusCode = StatusRecord.childNodes[0].innerXML; //StatusRecord.childNodes[0].getElementsByTagName("StatusCode")[0];
                //console.log('res: ' + JSON.stringify(StatusRecord));
                //console.log(JSON.stringify(StatusRecord.childNodes[0]));
                //console.log(StatusCode);
                if(StatusCode == 0)
                {
                    response = {
                        type : 'success',
                        response: response
                    };
                } else {
                    response = {
                        type : 'error',
                        response: StatusCode
                    };
                }
            }

            return response;
        })
        .catch(err=>console.error(err));
}

module.exports = create;