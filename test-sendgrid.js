const sgMail = require('@sendgrid/mail');
require('dotenv').config();

async function testSendGrid() {
  console.log('='.repeat(70));
  console.log('SENDGRID TEST - Production Email');
  console.log('='.repeat(70));
  
  console.log('\n📧 Configuration:');
  console.log('   SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? '***configured***' : 'NOT SET');
  console.log('   SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL || 'NOT SET');
  console.log('   FROM_NAME:', process.env.FROM_NAME || 'Heedy');

  if (!process.env.SENDGRID_API_KEY) {
    console.error('\n❌ ERROR: SENDGRID_API_KEY not configured!');
    console.log('\n📝 Steps to fix:');
    console.log('1. Go to: https://signup.sendgrid.com/');
    console.log('2. Create account and verify email');
    console.log('3. Go to Settings → API Keys');
    console.log('4. Create API Key with "Mail Send" permission');
    console.log('5. Copy the key (starts with SG.)');
    console.log('6. Add to .env: SENDGRID_API_KEY=SG.your_key_here');
    console.log('7. Verify sender email in SendGrid dashboard');
    return;
  }

  if (!process.env.SENDGRID_FROM_EMAIL) {
    console.error('\n❌ ERROR: SENDGRID_FROM_EMAIL not configured!');
    console.log('\nAdd to .env: SENDGRID_FROM_EMAIL=your_verified_email@gmail.com');
    return;
  }

  try {
    console.log('\n🔧 Initializing SendGrid...');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('✅ SendGrid initialized');

    console.log('\n📨 Sending test email...');
    const msg = {
      to: process.env.SENDGRID_FROM_EMAIL, // Send to yourself
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: process.env.FROM_NAME || 'Heedy',
      },
      subject: '✅ SendGrid Test - Heedy Backend',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #111827; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0;">Heedy</h1>
          </div>
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
            <h2 style="color: #111827;">✅ SendGrid is Working!</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Congratulations! Your SendGrid configuration is working correctly.
            </p>
            <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #065f46;">
                <strong>✓ SendGrid API connected</strong><br>
                <strong>✓ Email sending functional</strong><br>
                <strong>✓ Vercel compatible</strong><br>
                <strong>✓ Production ready</strong><br>
                <strong>✓ No professional email needed</strong>
              </p>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              Test sent at: ${new Date().toLocaleString()}<br>
              From: ${process.env.SENDGRID_FROM_EMAIL}
            </p>
          </div>
        </div>
      `,
    };

    const response = await sgMail.send(msg);

    console.log('\n✅ SUCCESS! Email sent via SendGrid!');
    console.log('   Status Code:', response[0].statusCode);
    console.log('   To:', process.env.SENDGRID_FROM_EMAIL);
    console.log('\n📬 Check your inbox:', process.env.SENDGRID_FROM_EMAIL);
    console.log('\n' + '='.repeat(70));
    console.log('🎉 SendGrid is configured correctly!');
    console.log('='.repeat(70));
    console.log('\n✅ Your production emails will work on Vercel!');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.code === 403) {
      console.error('\n⚠️  Forbidden - API Key issue!');
      console.error('\nPossible causes:');
      console.error('1. Invalid API key');
      console.error('2. API key doesn\'t have "Mail Send" permission');
      console.error('3. API key was deleted');
      console.error('\n📝 Solution:');
      console.error('1. Go to SendGrid → Settings → API Keys');
      console.error('2. Create new API key with "Full Access" or "Mail Send"');
      console.error('3. Update .env with new key');
    } else if (error.code === 401) {
      console.error('\n⚠️  Unauthorized!');
      console.error('Check your API key is correct and starts with "SG."');
    } else if (error.response && error.response.body && error.response.body.errors) {
      console.error('\n⚠️  SendGrid API Error:');
      error.response.body.errors.forEach(err => {
        console.error(`   - ${err.message}`);
        if (err.message.includes('does not match a verified Sender Identity')) {
          console.error('\n📝 Solution:');
          console.error('1. Go to SendGrid → Settings → Sender Authentication');
          console.error('2. Click "Single Sender Verification"');
          console.error('3. Add and verify your email address');
          console.error('4. Check your inbox for verification email');
        }
      });
    }
    
    console.error('\nFull error:', error);
  }
}

testSendGrid();
