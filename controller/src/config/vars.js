const vars = {
  trackmania: {
    port: 5000,
    host: 'trackmania',

    // Authentication details for SuperAdmin
    login: 'SuperAdmin',
    password: 'SuperAdmin',

    // The login of the server at the master server, look it up on the https://players.trackmania.com/
    serverLogin: process.env.TM_MASTER_LOGIN,
  },

  // MySQL database settings
  mySql: {
    host: 'mysql',
    port: 3306,
    user: process.env.MYSQL_USER || 'pepega',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'pepedb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },

  // Administrators logins from https://trackmania.io/#/player
  admins: ['login'],
};

export default vars;
