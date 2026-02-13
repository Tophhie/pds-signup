import { AtpAgent } from '@atproto/api';

class SimpleSignUp {
  constructor() {
    this.agent = new AtpAgent({ service: 'https://tophhie.social' });
  }

  async signUp(handle, email, password, turnstileToken, statusUpdateHandler) {
    // `turnstileToken` is optional client-side token from Cloudflare Turnstile.
    // Server-side verification is required; include the token when calling your backend.
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