import pepeplanet from '../pepeplanet.js';
import generateUI from '../UI/generateUI.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const GiveUp = (params, client) => {
  if(pepeplanet.players[params.login]) {
    pepeplanet.players[params.login].wayPoints = [];
  }
  generateUI(params.login, client);
};

export default GiveUp;
