const {getQldbDriver, executeStatement} = require('./db_manager');
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
    let response = {'data': null , 'error': null }
    let queryStatement = `INSERT INTO ${CLIENTS_TABLE_NAME} ?`;
    await qldbDriver.executeLambda(async (txn) => {
      let newClient = await executeStatement(txn, queryStatement, [clientParams]);
      if (newClient.data){
        response.data =  newClient.data;
      } else {
        console.log('could not insert client');
        response.error = newClient.error;
      }
    }, () => log("Retrying due to OCC conflict..."));
    return response;
  } catch (error) {
    console.log('could not insert client or connect to qldb', error);
    return {error};
  }
};

let fetchClient = async (clientParams) => {
  try {
    const qldbDriver = getQldbDriver();
    let response = {'data': null , 'error': null }
    let queryStatement = `SELECT * FROM ${CLIENTS_TABLE_NAME} WHERE PhoneNumber= ?`;
    await qldbDriver.executeLambda(async (txn) => {
      let clientData = await executeStatement(txn, queryStatement, clientParams.phone_number);
      if (clientData.data){
        response.data =  clientData.data;
      } else {
        console.log('could not obtain client');
        response.error = clientData.error;
      }
    }, () => log("Retrying due to OCC conflict..."));
    return response;
  } catch (error) {
    console.log('could not obtain the client or connect to qldb', error);
    return {error};
  }
};

module.exports = {
  defClient,
  insertClient,
  fetchClient
}
