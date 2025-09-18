import { AtpAgent } from '@atproto/api';

class SimpleSignUp {
  constructor() {
    this.agent = new AtpAgent({ service: 'https://tophhie.social' });
  }

  async signUp(handle, email, password, statusUpdateHandler) {
    const safeUpdate = (msg) => statusUpdateHandler && statusUpdateHandler(msg);

    // Step 1: Create an account
    safeUpdate('Creating account...');
    await this.agent.createAccount({
        email: email,
        handle: handle + '.tophhie.social',
        password: password,
    });
    safeUpdate('Account created successfully!');
  }
}

export { SimpleSignUp };