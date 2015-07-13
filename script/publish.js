var aws = require('aws-sdk'),
    fs  = require('fs'),
    lambdaConfig = require('../lambdaConfig'),
    pkgConfig = require('../package');

var lambda  = new aws.Lambda({apiVersion:'2014-11-11',region: lambdaConfig.region}),
    zipPath = 'pkg/' + pkgConfig.name + '.zip';

var params = {
  FunctionName: pkgConfig.name,
  FunctionZip: fs.readFileSync(zipPath),
  Handler: buildHnadlerName(lambdaConfig),
  Mode: 'event',
  Role: lambdaConfig.role,
  Runtime: 'nodejs',
  Description: lambdaConfig.description,
  MemorySize: lambdaConfig.memorySize,
  Timeout: lambdaConfig.timeout
};
lambda.uploadFunction(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else     console.log(data);
});


function buildHnadlerName(lambdaConfig){
  if(!lambdaConfig.handlerFile){
            lambdaConfig.handlerFile = 'app';
  }
  if(!lambdaConfig.handlerMethod){
    lambdaConfig.handlerMethod = 'handler'
  }
  return lambdaConfig.handlerFile + '.' + lambdaConfig.handlerMethod;
}
