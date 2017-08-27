import { AllHtmlEntities as Entities } from 'html-entities';
import aws from 'aws-sdk';

var ses = new aws.SES({
   region: 'us-west-2' 
});

const SITE_TITLE   =  process.env.SITE_TITLE;
const ADMIN_EMAIL  =  process.env.ADMIN_EMAIL;
const SUBJECT_HEAD = `[${SITE_TITLE}] `;

const email = ({toWho = ADMIN_EMAIL,fromWho = ADMIN_EMAIL,subject,body}) => {

  const eParams = {
        Destination: {
            ToAddresses: [toWho]
        },
        Message: {
            Body: {
                Text: {
                    Data: new Entities().decode(body),
                }
            },
            Subject: {
                Data: SUBJECT_HEAD + subject
            }
        },
        Source: fromWho
    };

    return ses.sendEmail(eParams).promise();
};

module.exports = email;
