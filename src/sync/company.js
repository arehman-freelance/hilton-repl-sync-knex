const conn = require('../db/connections');

exports.sync_company = async() => {
    let src_comp_list = await conn.knex_oracle('COMPANY').where({'IS_UPLOAD': 'N'});

    src_comp_list.forEach(async src_comp => {
        let dest_comp =  await conn.knex_mariadb('COMPANY').insert(src_comp).onConflict('COMP_CODE')
        .merge(src_comp);

        await conn.knex_oracle('COMPANY').where({ 'COMP_CODE': src_comp.COMP_CODE }).update({ IS_UPLOAD: 'Y' });
    });

    console.log('company synced successfully.')
}
