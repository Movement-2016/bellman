
/* auto generated */ 
var a = require('./lib/Service');

var b = require('./deploy');

var c = require('./email');

var d = require('./deploy');

var e = require('./email');

module.exports = {
   prod: {
   deploy:  cfg => new b({...cfg,endpoint:'https://f86r0juvaa.execute-api.us-west-2.amazonaws.com/prod',slug:'deploy'}),
plans:  cfg => new a({...cfg,endpoint:'https://l7y8vcdf01.execute-api.us-west-2.amazonaws.com/prod',slug:'plans'}),
users:  cfg => new a({...cfg,endpoint:'https://xds1htuk84.execute-api.us-west-2.amazonaws.com/prod',slug:'users'}),
email:  cfg => new c({...cfg,endpoint:'https://9gvdc17imc.execute-api.us-west-2.amazonaws.com/prod',slug:'email'})},
dev: {
   deploy:  cfg => new d({...cfg,endpoint:'https://qf7gz2uqq2.execute-api.us-west-2.amazonaws.com/dev',slug:'deploy'}),
plans:  cfg => new a({...cfg,endpoint:'https://nof8onrfef.execute-api.us-west-2.amazonaws.com/dev',slug:'plans'}),
users:  cfg => new a({...cfg,endpoint:'https://3wim9e9xf9.execute-api.us-west-2.amazonaws.com/dev',slug:'users'}),
email:  cfg => new e({...cfg,endpoint:'https://wmg82tv0ka.execute-api.us-west-2.amazonaws.com/dev',slug:'email'})}};
