const {getQldbDriver, insertDocument} = require('./db_manager');
const {CLIENTS_TABLE_NAME} = require('./constants');

let defClient = (docId, docType, phoneNumber, firstName, lastName,
  documentFrontPath, documentBackPath, documentRutPath, videoPath,
  email, address, status, balance) => {
    let client = {
      DocId: docId,
      DocType: docType,
      PhoneNumber: phoneNumber,
      FirstName: firstName,
      LastName: lastName,
      DocumentFrontPath: documentFrontPath,
      DocumentBackPath: documentBackPath,
      DocumentRutPath: (documentRutPath) ? documentRutPath : "" ,
      VideoPath: videoPath,
      Email: email,
      Address: address,
      Status: status,
      Balance: balance,
      CreatedAt: new Date()
    }
    return client
};

let insertClient = async (clientParams) => {
  try {
    const qldbDriver = getQldbDriver();
    await qldbDriver.executeLambda(async (txn) => {
      console.log([clientParams], 'insert data');
      let newClient = await insertDocument(txn, CLIENTS_TABLE_NAME, [clientParams]);
      if (newClient.data){
        return {data: newClient.data};
      } else {
        console.log('could not insert client');
        return {error: newClient.error};
      }
    }, () => log("Retrying due to OCC conflict..."));
  } catch (error) {
    console.log('could not insert client or connect to qldb', error);
    return {error};
  }
};

module.exports = {
  defClient,
  insertClient
}
