import mysql from 'mysql2/promise';
// eslint-disable-next-line import/no-unresolved
import vars from '#root/config/vars';

/**
 * Author il12 (https://github.com/il12)
 */

const pool = mysql.createPool(vars.mySql);

export default pool;
