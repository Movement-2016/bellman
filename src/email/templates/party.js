
const partyTemplate = ({
        hostParty,
        learnMore,
        fname,
        lname,
        email,
        phone,
        city,
        state,
        affiliation,
        message
      }) => `

First Name: ${fname}
Last Name: ${lname}
City: ${city + (state ? ', ' + state : '')}
Email: ${email}
Phone: ${phone}
${affiliation ? 'Affiliation: ' + affiliation : ''}

Checkboxes:
Can host party: ${hostParty ? 'YES' : 'NO'}
Wants to learn more: ${learnMore ? 'YES' : 'NO'}

${message ? 'Message: "' + message + '"' : ''}

`;

module.exports = partyTemplate;
