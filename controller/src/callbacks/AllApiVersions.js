import fetch from 'node-fetch';

import pepeplanet from '../pepeplanet.js';

import server from '../utils/server.js';
import log from '../utils/log.js';

import generateUI from '../UI/generateUI.js';
import mapdb from '../db/maps.js';

import raceTime from '../utils/raceTime.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const AllApiVersions = async (response, client) => {
  try {
    console.log(response)
  } catch (err) {
    log.red('Something went wrong in AllApiVersions');
    log.red(err);
  }
};

export default AllApiVersions;
