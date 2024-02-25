import configureApp from './app';

configureApp().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});