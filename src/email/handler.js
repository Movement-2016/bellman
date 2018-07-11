import LamdaFunc from '../lib/LambdaFunc';
import mailer from '../lib/email';
import templates from './templates';

class ContactEmail extends LamdaFunc {
  perform() {
    const body = this.body;
    const { email } = body;
    const subject = 'New contact form submission from ' + email;

    return mailer({ body: templates.contact(body), subject })
      .then(this.thenHandler)
      .catch(this.errorHandler);
  }
}

class PartyEmail extends LamdaFunc {
  perform() {
    const body = this.body;
    const { email } = body;
    const subject = 'New house party form submission from ' + email;

    return mailer({ body: templates.party(body), subject })
      .then(this.thenHandler)
      .catch(this.errorHandler);
  }
}

class PlanEmail extends LamdaFunc {
  perform() {
    const _body = this.body;
    let toWho = _body.email;
    const subject = 'Your Giving Plan';
    const body = templates.plan(_body);

    return mailer({ toWho, body, subject })
      .then(() => mailer({ body, subject })) // send a copy to the admins
      .then(this.thenHandler)
      .catch(this.errorHandler);
  }
}

module.exports = {
  contact: new ContactEmail().handler,
  party: new PartyEmail().handler,
  plan: new PlanEmail().handler,
};
