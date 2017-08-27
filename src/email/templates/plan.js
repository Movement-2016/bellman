import commaize  from 'commaize';

const headerTemplate = ({fname,lname,email,phone,wantsConsult}) => `
Hi ${fname}!

Here is your giving plan that you created at movementvote.org and requested be mailed to you.

Your info:
${fname} ${lname}
${email}
${phone}
Created ${new Date() + ''}

${wantsConsult
  ? 'We noticed that you requested a consultation with a donation advisor. One will be in touch with you shortly!'
  : 'We noticed that you declined a consultation with a donation advisor. If you have any questions please reply to this email and will get in touch shortly!'}

`;

const footerTemplate = donations => `

Your total contribution amount: $${commaize(donations.reduce( (sum,i) => sum + i.amount, 0))}

Thank you so much for your generosity!

Movement Vote

`;


const lineItemTemplate = (
        {
            group:{
              title,
              website,
              c4_donate_link,
              c3_donate_link,
              urlGive = c4_donate_link || c3_donate_link
            },
            amount
        }) => `
${title} - $${amount} ${website ? `\nWebsite: ${website}` : ''} ${urlGive ? `\nDonation: ${urlGive}` : ''}
-----------------------------------------------------
`;

const planTemplate = plan => `
${headerTemplate(plan)}
${plan.donations.map( item => lineItemTemplate({...item}) ).join( `\n` )}
${footerTemplate(plan.donations)}
`;

module.exports = planTemplate;

