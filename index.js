'use strict'

var fs = require('fs');
var request = require('request');

//Lettura file json
var clienti = JSON.parse(fs.readFileSync('./clienti.json', 'utf8'));

for (let i = 0; i < clienti.length; i++) {
    let cliente = clienti[i];
    //Check verificare se si tratta di una email .it
    if (cliente.email && cliente.ip_address && cliente.email.endsWith(".it")) {
        //Request per info su IP
        request.get('http://ip-api.com/json/' + cliente.ip_address, function (error, response, body) {
            if (error) {
                console.error('REQUEST ERROR:', error);
            } else {
                if (response.statusCode == 200) {
                    let infoCliente = JSON.parse(body);
                    console.log(cliente.email, ': ',cliente.ip_address, ' -> ',infoCliente.country, infoCliente.countryCode);
                } else {
                    console.log('STATUS CODE REQUEST [', response.statusCode, '] NOT EXPECTED');
                }
            }
        });
    }
}
