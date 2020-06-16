let AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');
let s3 = new AWS.S3();
const FILES_BUCKET = process.env.USERS_FILES_BUCKET;

let uploadFile = (fileKey) => {
  let filePath = '/tmp/' + fileKey;
  return new Promise ((resolve, reject) => {
    fs.readFile(filePath, function (error, data){
      if(error){
        reject(error);
      };
      let payload = {Bucket: FILES_BUCKET, Key: fileKey, Body: data};
      s3.upload(payload, function(error, data) {
        if (error){
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  });
};


let readFile = function(filePath){
  return new Promise((resolve, reject) => {
      let fr = new FileReader();
      fr.onload = function (){
        try{
            resolve(fr.result);
        } catch(e){
            reject(null);
        }
      };
    fr.readAsArrayBuffer(file);
  });
};


let getFileByUrl = (fileKey, fileUrl) => {
  return new Promise ((resolve, reject) => {
    const filePath = "/tmp/" + fileKey;
    const file = fs.createWriteStream(filePath);
    axios.get(fileUrl, {responseType: 'stream'}).then((response) => {
      response.data.pipe(file);
      file.on('finish', resolve);
      file.on('error', reject);
    }).catch(function (error) {
      console.log(error);
      reject(error);
    });
  });
};


let uploadFileToBucket = (userImageKey, userImageUrl) => {
  return new Promise((resolve, reject) => {
    getFileByUrl(userImageKey, userImageUrl).then((data) => {
        uploadFile(userImageKey).then((result) => {
          resolve(result)
        }).catch((e) => {
          reject({'error': e})
        });
    }).catch((e) => {
      reject({'error': e})
    });
  })
}


module.exports = {
  uploadFileToBucket
}
