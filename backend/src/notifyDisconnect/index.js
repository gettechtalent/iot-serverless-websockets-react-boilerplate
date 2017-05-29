'use strict';

const AWS = require('aws-sdk');

AWS.config.region = process.env.IOT_AWS_REGION;
const iotData = new AWS.IotData({ endpoint: process.env.IOT_ENDPOINT_HOST });

exports.handler = (message) => {
    let params = {
        topic: 'client-disconnected',
        payload: JSON.stringify(message),
        qos: 0
    };

    iotData.publish(params, function(err, data){
        if(err){
            console.log(`Unable to notify IoT of stories update: ${err}`);
        }
        else{
            console.log('Successfully notified IoT of stories update');
        }
    });
};
