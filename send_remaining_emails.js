
const { Resend } = require('resend');

const resend = new Resend('re_138xmgQU_Cq7npAtxFb5T6qTSRKHtv193');

// The full list of contacts
const allContacts = [
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
    { email: 'momsflavourck@gmail.com', name: 'there', days: 14 },
    // --- Assuming the first 15 sent successfully ---
    { email: 'ujjwalrathore125@gmail.com', name: 'Ujjwal', days: 14 },
    { email: 'motoehirani@gmail.com', name: 'Moto', days: 14 },
    { email: 'sonu.sanjeev@gmail.com', name: 'Sonu', days: 14 },
    { email: 'dounome@duck.com', name: 'there', days: 14 },
    { email: 'aigumi31@gmail.com', name: 'Aigumi', days: 14 },
    { email: 'lohith.founder@autovatenow.com', name: 'Lohith', days: 14 },
    { email: 'sundhardhayalan65@gmail.com', name: 'Sundhar', days: 14 },
    { email: 'spbabu.profile@gmail.com', name: 'Babu', days: 14 },
    { email: 'omkarbuddhe11@gmail.com', name: 'Omkar', days: 14 },
    { email: 'milind.roy@nurture.farm', name: 'Milind', days: 13 },
    { email: 'jdafler@momentumaicreator.com', name: 'Dafler', days: 13 },
    { email: 'tawfique007@gmail.com', name: 'Tawfique', days: 13 },
    { email: 'arunkumarkatariya97@gmail.com', name: 'Arunkumar', days: 13 },
    { email: 'adulapuram@gmail.com', name: 'Adulapuram', days: 13 },
    { email: 'dennismwiti56@gmail.com', name: 'Dennis', days: 13 },
    { email: 'ven@mvp.slmail.me', name: 'Ven', days: 12 },
    { email: 'yogeshgupta26@gmail.com', name: 'Yogesh', days: 12 },
    { email: 'gpluselevator@gmail.com', name: 'there', days: 12 },
    { email: 'mqnation09@gmail.com', name: 'there', days: 12 },
    { email: 'abuujr87@gmail.com', name: 'Abu', days: 12 },
    { email: 'ethereal.prem@gmail.com', name: 'Prem', days: 6 },
    { email: 'ashique@zaplico.com', name: 'Ashique', days: 6 }
];

// Start from index 15 (the 16th email)
const remainingContacts = allContacts.slice(15);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendEmails() {
    console.log(`Starting to send remaining ${remainingContacts.length} emails (with 1.5s delay)...`);

    for (const [index, contact] of remainingContacts.entries()) {
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
                console.error(`[${index + 1}/${remainingContacts.length}] Error sending to ${contact.email}:`, error);
                // If rate limited, wait longer
                if (error.statusCode === 429) {
                    console.log('Hit rate limit! Waiting 60 seconds...');
                    await sleep(60000);
                    // Retry once (simple logic)
                    // In a real app, you'd use a loop
                }
            } else {
                console.log(`[${index + 1}/${remainingContacts.length}] Email sent to ${contact.email}:`, data);
            }

            // 1.5 second delay (approx 0.66 requests/sec) to stay well under the 2 req/sec limit
            await sleep(1500);

        } catch (err) {
            console.error(`[${index + 1}/${remainingContacts.length}] Exception sending to ${contact.email}:`, err);
        }
    }
    console.log('Finished sending remaining emails.');
}

sendEmails();
