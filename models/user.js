const {getQldbDriver, insertDocument} = require('./db_manager');
const {USERS_TABLE_NAME} = require('./constants');


let defUser = (docId, docType, phoneNumber, firstName, lastName,
  documentFrontPath, documentBackPath, documentRutPath, videoPath,
  email, address, status, balance) => {
    let user = {
      doc_id: docId,
      doc_type: docType,
      phone_number: phoneNumber,
      first_name: firstName,
      last_name: lastName,
      document_front_path: documentFrontPath,
      document_back_path: documentBackPath,
      document_rut_path: documentRutPath,
      video_path: videoPath,
      email: email,
      address: address,
      status: status,
      balance: balance,
      created_at: new Date()
    }
    return user
};


let insertUser = (userParams) => {
  const qldbDriver = getQldbDriver();
  qldbDriver.executeLambda().then((txn) => {
    insertDocument(txn, USERS_TABLE_NAME, userParams).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log("could not insert document");
      console.log(error);
    });
  }).catch((e) => {
    console.log("Retrying due to OCC conflict...");
  });
};

module.exports = {
  defUser,
  insertUser
}
