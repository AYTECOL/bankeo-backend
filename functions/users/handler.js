'use strict';
const fileUploader = require('../../lib/fileUploader');

let create = async event => {
  let userData = JSON.parse(event.body);
  let requestPayload = userData.data;
  let statusCode = 200;
  let data = {};
  // required fields
  if (!requestPayload.doc_id){
    statusCode = 400;
    data.error = 'The document id must be present';

  } else if (!requestPayload.doc_type){
    statusCode = 400;
    data.error = 'The document type must be present';

  } else if (!requestPayload.document_front){
    statusCode = 400;
    data.error = 'The document front must be present';
  } else if (!requestPayload.document_back){
    statusCode = 400;
    data.error = 'The document back must be present';

  } else if (!requestPayload.account_key){
    statusCode = 400;
    data.error = 'The account key must be present';
  }
  /*
  try {
    data = await fileUploader.uploadFileToBucket(requestPayload.user_id,
      requestPayload.user_image_key, requestPayload.user_image_url);
    console.log(data)
  } catch(error){
    console.log(error);
    data = {'error': 'could not upload the file to s3'};
    statusCode = 500;
  }
  */
  // data = userData.data
  return {statusCode: statusCode, body: JSON.stringify({data}, null, 2),};
};

let validateAccount = async event => {
  let userData = JSON.parse(event.body);
  let requestPayload = userData.data;
  let statusCode = 200;
  let data = {};
  // required fields
  if (!requestPayload.doc_id){
    statusCode = 400;
    data.error = 'The document id must be present';

  }
  /*
  try {
    data = await fileUploader.uploadFileToBucket(requestPayload.user_id,
      requestPayload.user_image_key, requestPayload.user_image_url);
    console.log(data)
  } catch(error){
    console.log(error);
    data = {'error': 'could not upload the file to s3'};
    statusCode = 500;
  }
  */
  data = userData.data
  return {statusCode: statusCode, body: JSON.stringify({data}, null, 2),};
};

module.exports = {
  create,
  validateAccount
}
