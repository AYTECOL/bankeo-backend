const FILE_BUCKET = process.env.USERS_FILES_BUCKET;
let AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');
let s3 = new AWS.S3();


let uploadFile = (fileKey, dataStream) => {
  var payload = {Bucket: FILE_BUCKET, Key: fileKey, Body: dataStream};
  return new Promise ((resolve, reject) => {
    s3.upload(payload, function(error, data) {
      if (error){
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};


let uploadFileByUrl = (fileKey, fileUrl) => {
  return new Promise ((resolve, reject) => {
    const file = fs.createWriteStream("file.jpg");
    axios.get('https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
              {responseType: 'stream'}).then(function (response) {
      response.data.pipe(file)
      file.on('finish', resolve)
      file.on('error', reject)
    }).catch(function (error) {
      console.log(error);
      reject(error)
    });
  });
}

uploadFileByUrl('fileKey', 'fileUrl').then((value) => {
  console.log(value);
}).catch((e) => {
  console.log(e);
});

// module.exports = {
//   uploadFile,
//   uploadFileUrl
// }
