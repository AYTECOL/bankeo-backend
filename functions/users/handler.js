'use strict';
const fileUploader = require('../../lib/fileUploader');
const client = require('../../models/client');

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
  } else if (!requestPayload.phone_number){
    statusCode = 400;
    data.error = 'The phone number must be present';
  } else if (!requestPayload.first_name){
    statusCode = 400;
    data.error = 'The first name must be present';
  } else if (!requestPayload.last_name){
    statusCode = 400;
    data.error = 'The last name must be present';
  } else if (!requestPayload.document_front_path){
    statusCode = 400;
    data.error = 'The document front must be present';
  } else if (!requestPayload.document_back_path){
    statusCode = 400;
    data.error = 'The document back must be present';
  } else if (!requestPayload.document_rut_path){
    statusCode = 400;
    data.error = 'The document rut must be present';
  } else if (!requestPayload.video_path){
    statusCode = 400;
    data.error = 'The video path must be present';
  } else if (!requestPayload.email){
    statusCode = 400;
    data.error = 'The email must be present';
  } else if (!requestPayload.address){
    statusCode = 400;
    data.error = 'The address must be present';
  }

  let clientEntity = client.defClient(requestPayload.doc_id, requestPayload.doc_type,
    requestPayload.phone_number, requestPayload.first_name, requestPayload.last_name,
    requestPayload.document_front_path, requestPayload.document_back_path,
    requestPayload.document_rut_path, requestPayload.video_path,
    requestPayload.email, requestPayload.address, 0, 0);

  let newClient = await client.insertClient(clientEntity);
  console.log(newClient, 'NEW CLIENT');
  if (newClient.data){
    data.client = clientEntity;
  } else {
    data.error = newClient.error;
    statusCode = 500;
  }
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

  try {
    data = await fileUploader.uploadFileToBucket(requestPayload.user_id,
      requestPayload.user_image_key, requestPayload.user_image_url);
    console.log(data)
  } catch(error){
    console.log(error);
    data = {'error': 'could not upload the file to s3'};
    statusCode = 500;
  }
  data = userData.data
  return {statusCode: statusCode, body: JSON.stringify({data}, null, 2),};
};

module.exports = {
  create,
  validateAccount
}
