// follow this stuff moron
// https://docs.aws.amazon.com/qldb/latest/developerguide/getting-started.nodejs.step-1.html
const { QldDriver } = require('amazon-qldb-driver-nodejs');
const { ClientConfiguration } = require("aws-sdk/clients/qldbsession");
const { LEDGER_NAME } = require("./Constants");

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

module.exports = {
  getQldbDriver
}
