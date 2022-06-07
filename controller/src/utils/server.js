import pepeplanet from '../pepeplanet.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const server = {
  log: (message) => {
    pepeplanet.client.call('ChatSendServerMessage', message);
  },
  private: (message, login) => {
    pepeplanet.client.call('ChatSendServerMessageToLogin', `${message}`, login);
  },
};

export default server;
