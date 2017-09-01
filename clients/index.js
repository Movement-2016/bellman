
/* auto generated */ 
var a = require('./lib/Service');

var b = require('./email');

var c = require('./deploy');

var d = require('./email');

module.exports = {
   prod: {
   users:  c => new a({...c,endpoint:'https://xds1htuk84.execute-api.us-west-2.amazonaws.com/prod',slug:'users'}),
email:  c => new b({...c,endpoint:'https://9gvdc17imc.execute-api.us-west-2.amazonaws.com/prod',slug:'email'}),
deploy:  c => new c({...c,endpoint:'https://f86r0juvaa.execute-api.us-west-2.amazonaws.com/prod',slug:'deploy'}),
plans:  c => new a({...c,endpoint:'https://l7y8vcdf01.execute-api.us-west-2.amazonaws.com/prod',slug:'plans'})},
dev: {
   users:  c => new a({...c,endpoint:'https://3wim9e9xf9.execute-api.us-west-2.amazonaws.com/dev',slug:'users'}),
email:  c => new d({...c,endpoint:'https://wmg82tv0ka.execute-api.us-west-2.amazonaws.com/dev',slug:'email'}),
plans:  c => new a({...c,endpoint:'https://nof8onrfef.execute-api.us-west-2.amazonaws.com/dev',slug:'plans'})}};
