// follow this stuff moron
// https://docs.aws.amazon.com/qldb/latest/developerguide/getting-started.nodejs.step-1.html
const { QldbDriver } = require('amazon-qldb-driver-nodejs');
const { ClientConfiguration } = require("aws-sdk/clients/qldbsession");
const { LEDGER_NAME } = require("./constants");

const configurationParams = {
  region: 'us-east-1'
};

let createQldbDriver = (ledgerName, serviceConfigurationOptions) => {
  const qldbDriver = new QldbDriver(ledgerName, serviceConfigurationOptions);
  return qldbDriver;
}

let getQldbDriver = () => {
  let qldbDriver = createQldbDriver(LEDGER_NAME, configurationParams);
  return qldbDriver;
}

let insertDocument = (txn, tableName, documents) => {
   return new Promise((resolve, reject) => {
    const statement = `INSERT INTO ${tableName} ?`;
    txn.execute(statement, documents).then((data) => { 
      console.log(data)
      resolve({data});
    }).catch((error) => {
      console.log(error, 'could not insert into table')
      reject({error});
    });
  });
}


module.exports = {
  getQldbDriver,
  insertDocument
}
