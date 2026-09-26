import app from './app.js';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import { runSeed } from './utils/seedRunner.js';

const startServer = async () => {
  await connectDB();
  await runSeed();

  const PORT = config.port;
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 AccessHire AI Server running on port ${PORT}`);
    console.log(`   API Endpoint: http://localhost:${PORT}/api/v1`);
    console.log(`   Health Check: http://localhost:${PORT}/api/v1/health`);
    console.log(`   Environment: ${config.nodeEnv}`);
    console.log(`==================================================`);
  });
};

startServer();
