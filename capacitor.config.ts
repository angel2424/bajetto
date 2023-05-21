import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'bajetto',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
