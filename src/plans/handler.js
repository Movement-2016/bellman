import uuid from 'uuid';
import Service from '../lib/RESTService';

class DonationPlans extends Service {

  get Key() {
    return {
      userId: this.cognitoId,
      planId: this.params.id
    };
  }

  get createItem() {
    return {
      planId: uuid.v1(),
      userId: this.cognitoId,
      ...this.body
    };
  }

  list() {
    return this.table.find({userId:this.cognitoId})
      .then( this.thenHandler )
      .catch( this.errorHandler );    
  }  
}

module.exports = (new DonationPlans()).exports;

