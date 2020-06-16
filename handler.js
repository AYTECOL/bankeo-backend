'use strict';
const fileUploader = require('./lib/fileUploader');

module.exports.upload = async event => {
  let userData = JSON.parse(event.body);
  let requestPayload = userData.data;
  let statusCode = 200;
  let data = {};
  try {
    data = await fileUploader.uploadFileToBucket(requestPayload.user_image_key, requestPayload.user_image_url);
    console.log(data)
  } catch(error){
    console.log(error);
    data = {'error': 'could not upload the file to s3'};
    statusCode = 500;
  }
  return {statusCode: statusCode, body: JSON.stringify({data}, null, 2),};
};
