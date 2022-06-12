import { GbxClient } from '@evotm/gbxclient';
import _ from 'lodash';

import vars from './config/vars.js';

import log from './utils/log.js';
import server from './utils/server.js';
import runningMessage from './utils/runningMessage.js';
import callbacksList from './callbacks/index.js';
import generateUI from './UI/generateUI.js';

import playerdb from './db/players.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const pepeplanet = {
  client: null,
  players: {},

  addPlayerToPool(login, nickName) {
    if (this.players[login]) return;

    this.players[login] = {
      nickName, wayPoints: [],
    };
  },

  async renderNewUI(client) {
    try {
      const playerList = await client.call('GetPlayerList', 1000, 0);
      log.white('current player list')
      log.white(playerList)
      if(playerList && playerList.length) {
        playerList.forEach(async ({Login, playerID, NickName}) => {
          if (playerID === 0) return;

          this.addPlayerToPool(Login, NickName);

          const {IPAddress} = await client.call('GetDetailedPlayerInfo', Login);

          const isPlayerExist = await playerdb.existPlayer(Login);

          if (!isPlayerExist) {
            await playerdb.upsertPlayer(Login, NickName, IPAddress);
          }

          generateUI(Login, client);
        });
      }
    } catch (err) {
      log.red('Something went wrong in renderNewUI');
      log.red(err);
    }
  },

  async startCallbackListening() {
    log.green('Starting callback listening...');
    this.client.on('callback', (method, params) => {
      let callbackFn = _.get(callbacksList, method.split('.')[1]);
      let attrs = params;

      if (method.split('.')[1] === 'ModeScriptCallbackArray') {
        if (params[0].split('.')[1] === 'Event') {
          callbackFn = callbacksList.Event[params[0].split('.')[2]];
        } else {
          callbackFn = _.get(callbacksList, params[0].split('.')[1]);
        }

        attrs = JSON.parse(params[1][0]);
      }

      if (!callbackFn) {
        // log.red(`Unregistered method ${method} detected, captain!`);
        // log.white(JSON.stringify(params));
        // log.white('----------');
        return;
      }

      // log.green('Registered method, captain!');
      // log.white(method);
      // log.white(JSON.stringify(params));
      // log.white('----------');

      callbackFn(attrs, this.client);
    });
    log.green('Callback listening started');
  },

  async triggerModeScript(client) {
    try {
      await client.callScript('XmlRpc.EnableCallbacks', 'true');
    } catch (err) {
      log.red('TriggerModeScriptEventArray failed');
      log.red(err);
      process.exit(1);
    }

    log.green('Script callbacks enabled ...');
    log.green(runningMessage);

    this.client = client;

    server.log('$0f0How it feels, pepegas, pepeplanet is here!');

    this.startCallbackListening();
    this.renderNewUI(client);
  },

  async enableCallbacks(client) {
    try {
      await client.call('EnableCallbacks', true);
    } catch (err) {
      log.red('EnableCallbacks failed');
      log.red(err);
      process.exit(1);
    }

    log.green('Callbacks enabled ...');
    this.triggerModeScript(client);
  },

  async authenticate(client) {
    // https://doc.maniaplanet.com/dedicated-server/references/xml-rpc-callbacks
    // https://doc.maniaplanet.com/dedicated-server/references/xml-rpc-methods
    log.green('Authenticating ...');
    const availableApiVersions = client.call('GetAllApiVersion', '2019-03-02');
    await client.call('SetApiVersion', '2019-03-02');

    try {
      await client.call('Authenticate', vars.trackmania.login, vars.trackmania.password);
    } catch (err) {
      log.red('Authenticate failed');
      log.red(err);
      process.exit(1);
    }

    log.green('Authenticated ...');
    this.enableCallbacks(client);
  },

  async connect() {
    const client = new GbxClient();
    try {
      await client.connect(vars.trackmania.host, vars.trackmania.port);
      await this.authenticate(client);
    } catch (e) {
      log.red(e);
      process.exit(0);
    }
  },
};

process.on('unhandledRejection', (reason, promise) => {
  log.yellow('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(0);
});

try {
  await pepeplanet.connect();
} catch (e) {
  log.yellow(e);
}

export default pepeplanet;
