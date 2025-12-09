'use server'

import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitWaitlist(formData: FormData) {
  const supabase = await createClient()

  const fullName = formData.get('full_name') as string
  const email = formData.get('email') as string
  const phoneNumber = formData.get('phone_number') as string
  const country = formData.get('country') as string
  const role = formData.get('role') as string
  const dailyCustomers = formData.get('daily_customers')
  const companyName = formData.get('company_name') as string
  const source = formData.get('source') as string

  // Tracking fields
  const city = formData.get('city') as string
  const region = formData.get('region') as string
  const zipCode = formData.get('zip_code') as string
  const timezone = formData.get('timezone') as string
  const isp = formData.get('isp') as string
  const ipAddress = formData.get('ip_address') as string

  try {
    // 1. Insert into Supabase
    const { error: dbError } = await supabase
      .from('wait_list')
      .insert([
        {
          full_name: fullName,
          email: email,
          phone_number: phoneNumber,
          country: country,
          role: role,
          daily_customers: dailyCustomers ? parseInt(dailyCustomers as string) : null,
          company_name: companyName,
          source: source,
          created_at: new Date().toISOString(),
          city,
          region,
          zip_code: zipCode,
          timezone,
          isp,
          ip_address: ipAddress
        },
      ])

    if (dbError) throw dbError

    // 2. Send Welcome Email
    const firstName = fullName.split(' ')[0];
    const { data, error: emailError } = await resend.emails.send({
      from: 'Sakura AI <hello@updates.sakurasupport.live>',
      replyTo: 'paul.emechebe@sakurasupport.live', // Direct replies to your personal email
      to: email,
      subject: 'Welcome to the Sakura AI Waitlist!',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Sakura AI</title>
  <style>
    body { margin: 0; padding: 0; background-color: #000000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #e5e7eb; }
    .container { max-width: 600px; margin: 0 auto; background-color: #111111; border-radius: 16px; overflow: hidden; margin-top: 40px; margin-bottom: 40px; border: 1px solid #333333; }
    .content { padding: 40px 30px; color: #d1d5db; line-height: 1.6; }
    .greeting { font-size: 24px; font-weight: 700; color: #ffffff; margin-bottom: 20px; }
    .text { font-size: 16px; margin-bottom: 24px; color: #9ca3af; }
    .footer { background-color: #111111; padding: 30px; text-align: center; border-top: 1px solid #333333; }
    .social-links { margin-bottom: 20px; }
    .social-link { display: inline-block; margin: 0 10px; text-decoration: none; color: #9ca3af; font-weight: 600; font-size: 14px; }
    .social-link:hover { color: #60a5fa; }
    .copyright { font-size: 12px; color: #6b7280; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <h2 class="greeting">Hi ${firstName},</h2>
      <p class="text">I'm Paul, the CEO and founder of Sakura AI. This email is to confirm that we received your waitlist submission.</p>
      
      <p class="text">We're currently in our beta phase and are gradually giving early access to select users as we continue improving Sakura to deliver the most value. I’ll personally reach out to you soon regarding early access to the app.</p>
      
      <p class="text">Thank you for joining us on this journey.</p>
      
      <p class="text" style="margin-top: 40px;">Paul<br>CEO & Founder, Sakura AI</p>
    </div>
    <div class="footer">
      <div class="social-links">
        <a href="https://x.com/agentsakura_ai" class="social-link">Follow on X</a>
        <a href="https://www.linkedin.com/company/sakura-agent" class="social-link">Connect on LinkedIn</a>
      </div>
      <p class="copyright">© ${new Date().getFullYear()} Sakura AI. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `
    })

    if (emailError) {
      console.error('Error sending email:', JSON.stringify(emailError, null, 2))
      // We don't throw here because the signup was successful, but we log it.
      // In production, you might want to alert the user or retry.
    } else {
      console.log('Email sent successfully:', JSON.stringify(data, null, 2))
    }

    return { success: true }
  } catch (error) {
    console.error('Error in submitWaitlist:', error)
    return { success: false, error: 'Failed to submit form' }
  }
}
