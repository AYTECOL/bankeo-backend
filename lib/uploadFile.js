const FILE_BUCKET = process.env.USERS_FILES_BUCKET;
let AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');
let s3 = new AWS.S3();

const EXAMPLE_IMAGE = 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg';


let uploadFile = (fileKey) => {
  let filePath = '/tmp/' + fileKey;
  return new Promise ((resolve, reject) => {
    fs.readFile(filePath, function (error, data){
      if(error){
        reject(error);
      };

      let payload = {Bucket: FILE_BUCKET, Key: fileKey, Body: data};
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


let uploadFileByUrl = (fileKey, fileUrl) => {
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

uploadFileByUrl('file.png', EXAMPLE_IMAGE).then((data) => {
    uploadFile('file.png').then((result) => {
      console.log('file uploaded to S3');
    }).catch((e) => {
      console.log(e);
    });
}).catch((e) => {
  console.log(e);
});

// module.exports = {
//   uploadFile,
//   uploadFileUrl
// }
