var aws = require('aws-sdk'),
    fs  = require('fs'),
    lambdaConfig = require('../lambdaConfig'),
    pkgConfig = require('../package');

var lambda  = new aws.Lambda({apiVersion:'2015-03-31',region: lambdaConfig.region}),
    zipPath = 'pkg/' + pkgConfig.name + '.zip';

var createParams = {
  Code: {
    ZipFile: fs.readFileSync(zipPath),
  },
  FunctionName: pkgConfig.name,
  Handler: buildHandlerName(lambdaConfig),
  Role: lambdaConfig.role,
  Runtime: 'nodejs',
  Description: lambdaConfig.description,
  MemorySize: lambdaConfig.memorySize,
  Timeout: lambdaConfig.timeout
};
var updateParams = {
  FunctionName: pkgConfig.name,
  ZipFile: fs.readFileSync(zipPath),
};
lambda.createFunction(createParams, function(err, data) {
  if (err) lambda.updateFunctionCode(updateParams, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });
  else     console.log(data);
});

function buildHandlerName(lambdaConfig){
  if(!lambdaConfig.handlerFile){
            lambdaConfig.handlerFile = 'app';
  }
  if(!lambdaConfig.handlerMethod){
    lambdaConfig.handlerMethod = 'handler'
  }
  return lambdaConfig.handlerFile + '.' + lambdaConfig.handlerMethod;
}
