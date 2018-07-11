
/* auto generated */ 
var a = require('./lib/Service');

var b = require('./email');

var c = require('./deploy');

var d = require('./email');

var e = require('./deploy');

module.exports = {
   prod: {
   email:  cfg => new b({...cfg,endpoint:'https://9gvdc17imc.execute-api.us-west-2.amazonaws.com/prod',slug:'email'}),
plans:  cfg => new a({...cfg,endpoint:'https://l7y8vcdf01.execute-api.us-west-2.amazonaws.com/prod',slug:'plans'}),
deploy:  cfg => new c({...cfg,endpoint:'https://f86r0juvaa.execute-api.us-west-2.amazonaws.com/prod',slug:'deploy'}),
users:  cfg => new a({...cfg,endpoint:'https://xds1htuk84.execute-api.us-west-2.amazonaws.com/prod',slug:'users'})},
dev: {
   email:  cfg => new d({...cfg,endpoint:'https://wmg82tv0ka.execute-api.us-west-2.amazonaws.com/dev',slug:'email'}),
deploy:  cfg => new e({...cfg,endpoint:'https://qf7gz2uqq2.execute-api.us-west-2.amazonaws.com/dev',slug:'deploy'}),
plans:  cfg => new a({...cfg,endpoint:'https://nof8onrfef.execute-api.us-west-2.amazonaws.com/dev',slug:'plans'}),
users:  cfg => new a({...cfg,endpoint:'https://3wim9e9xf9.execute-api.us-west-2.amazonaws.com/dev',slug:'users'})}};
