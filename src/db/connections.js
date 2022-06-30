const knex = require('knex');

exports.knex_mariadb = knex({
    client: 'mysql',
    connection: {
      host: 'mariadb',
      user: 'root',
      password: '123',
      database: 'hilton_repl'
    },
    pool: { min: 0, max: 7 }
  });

  exports.knex_oracle = knex(  {
    client: 'oracledb',
    connection: {
        user : 'HILTON',
        password : 'HILTON',
        connectString: 'oracledb/XE'
      },
    fetchAsString: [ 'number', 'clob', 'date' ],
    pool: { min: 0, max: 7 }
  });  

  
