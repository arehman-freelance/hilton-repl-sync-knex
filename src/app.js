const knex = require('knex')({
    client: 'oracledb',
    connection: {
        user : 'HILTON',
        password : 'HILTON',
        connectString: 'oracledb/XE'
      },
    fetchAsString: [ 'number', 'clob', 'date' ]
  });

  let data = knex.select('COMP_CODE')
  .from('COMPANY').then((d)=>console.log(d));

  