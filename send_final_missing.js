
const { Resend } = require('resend');

const resend = new Resend('re_138xmgQU_Cq7npAtxFb5T6qTSRKHtv193');

// These are the top 15 contacts who have NOT received an email yet.
const missingContacts = [
    { email: 'paul.emechebe@gmail.com', name: 'Paul', days: 20 },
    { email: 'sangamadhikari.61@gmail.com', name: 'Sangam', days: 19 },
    { email: 'mohi.khan@gmail.com', name: 'Mohi', days: 19 },
    { email: 'lucasdaanzca@gmail.com', name: 'Lucas', days: 19 },
    { email: 'jalews@me.com', name: 'Jalews', days: 19 },
    { email: 'carloscosti2019@gmail.com', name: 'Carlos', days: 19 },
    { email: 'chad@gemcity.xyz', name: 'Chad', days: 18 },
    { email: 'witoon@izpal.com', name: 'Witoon', days: 18 },
    { email: 'lvndrnpillay5@gmail.com', name: 'Pillay', days: 18 },
    { email: 'patrick.jang@naraeworld.com', name: 'Patrick', days: 18 },
    { email: 'kristian@matthews-kennington.com', name: 'Kristian', days: 17 },
    { email: 'walkerp.hbp@gmail.com', name: 'Walker', days: 17 },
    { email: 'Itsrishikapoor@gmail.com', name: 'Rishi', days: 15 },
    { email: 'bmthethwa1@gmail.com', name: 'Mthethwa', days: 15 },
    { email: 'momsflavourck@gmail.com', name: 'there', days: 14 }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendEmails() {
    console.log(`Starting to send final ${missingContacts.length} emails (with 2s delay)...`);

    for (const [index, contact] of missingContacts.entries()) {
        try {
            const html = `
        <p>Hi ${contact.name},</p>
        <p>Sakura is now live, and since you joined the waitlist, I wanted to personally reach out.</p>
        <p>I just did the math and it's been ${contact.days} days — thanks for your patience and apologies for the wait.</p>
        <p>Sakura is an AI agent that responds to customer messages for you. Your perspective would be really valuable as we continue refining the product.</p>
        <p>If you’re open to sharing feedback on a quick call, just let me know if you’d be interested.</p>
        <p>Thanks again for being early,<br>Paul, CEO & Founder of Sakura AI</p>
      `;

            const { data, error } = await resend.emails.send({
                from: 'Sakura AI <hello@updates.sakurasupport.live>',
                reply_to: 'paul.emechebe@gmail.com',
                to: contact.email,
                subject: "Thank you for joining the Sakura waitlist — we're now live",
                html: html
            });

            if (error) {
                console.error(`[${index + 1}/${missingContacts.length}] Error sending to ${contact.email}:`, error);
                if (error.statusCode === 429) {
                    console.log('Hit rate limit! Waiting 60 seconds...');
                    await sleep(60000);
                }
            } else {
                console.log(`[${index + 1}/${missingContacts.length}] Email sent to ${contact.email}:`, data);
            }

            // 2 second delay to be extremely safe
            await sleep(2000);

        } catch (err) {
            console.error(`[${index + 1}/${missingContacts.length}] Exception sending to ${contact.email}:`, err);
        }
    }
    console.log('Finished sending final batch.');
}

sendEmails();
