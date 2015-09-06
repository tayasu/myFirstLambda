var fs = require('fs');
var config = {
  region: 'ap-northeast-1',
  description: 'My First Lambda function',
  role: 'arn:aws:iam::123456789012:role/my-lambda-role',
  memorySize: '128',
  timeout: '3',
  handlerFile:'',
  handlerMethod:''
};
fs.writeFileSync('./lambdaConfig.json',JSON.stringify(config));
