
/* auto generated */ 
var a = require('./lib/Service');

var b = require('./deploy');

var c = require('./email');

var d = require('./email');

module.exports = {
   prod: {
   deploy:  cfg => new b({...cfg,endpoint:'https://f86r0juvaa.execute-api.us-west-2.amazonaws.com/prod',slug:'deploy'}),
users:  cfg => new a({...cfg,endpoint:'https://xds1htuk84.execute-api.us-west-2.amazonaws.com/prod',slug:'users'}),
email:  cfg => new c({...cfg,endpoint:'https://9gvdc17imc.execute-api.us-west-2.amazonaws.com/prod',slug:'email'}),
plans:  cfg => new a({...cfg,endpoint:'https://l7y8vcdf01.execute-api.us-west-2.amazonaws.com/prod',slug:'plans'})},
dev: {
   email:  cfg => new d({...cfg,endpoint:'https://wmg82tv0ka.execute-api.us-west-2.amazonaws.com/dev',slug:'email'}),
users:  cfg => new a({...cfg,endpoint:'https://3wim9e9xf9.execute-api.us-west-2.amazonaws.com/dev',slug:'users'}),
plans:  cfg => new a({...cfg,endpoint:'https://nof8onrfef.execute-api.us-west-2.amazonaws.com/dev',slug:'plans'})}};
