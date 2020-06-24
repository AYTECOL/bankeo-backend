/* credits AWS TEAM - ITCON */
const util  = require('util')
const jsonwebtoken = require('jsonwebtoken')


// Policy helper function
const generatePolicy = (effect, resource) => {
  const authResponse = {};
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse
}

const verifyPromised = util.promisify(jsonwebtoken.verify.bind(jsonwebtoken));

module.exports.auth = async (event, context, callback) => {
  console.log(event)
  if (!event.authorizationToken) {
    console.log('no auth token')
    return callback('Unauthorized');
  }
  let result;
  const tokenComponents = event.authorizationToken.split(' ');
  const token = tokenComponents[1];
  if (!(tokenComponents[0].toLowerCase() == 'bearer' && token)) {
    // no auth token!
    console.log('no auth code')
    return callback('Unauthorized');
  }

  try {
    // TODO validate a simple jwt token
    return callback(null, generatePolicy('Allow', event.methodArn))
  } catch (error) {
    console.log(error)
    result = { userName: '', clientId: '', error: error, isValid: false }
    console.log(result)
    return callback('Unauthorized');
  }
};
