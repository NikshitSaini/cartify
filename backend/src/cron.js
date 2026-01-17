import cron from 'node-cron';
import https from 'https';
import http from 'http';

const URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;

const job = cron.schedule('*/14 * * * *', () => {
  console.log('🔄 Cron job started: Pinging server to keep it alive...');

  const protocol = URL.startsWith('https') ? https : http;

  protocol
    .get(`${URL}/api/health`, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Keep-alive ping successful: Server is active');
      } else {
        console.error(`⚠️ Keep-alive ping failed: Status code ${res.statusCode}`);
      }
    })
    .on('error', (err) => {
      console.error('❌ Keep-alive ping error:', err.message);
    });
});

export default job;