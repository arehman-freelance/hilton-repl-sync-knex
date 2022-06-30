const conn = require('../db/connections');

exports.sync_company = async() => {
    let src_comp_list = await conn.knex_oracle('COMPANY').where({'IS_UPLOAD': 'N'});

    src_comp_list.forEach(async src_comp => {
        let dest_comp = await conn.knex_mariadb('tabCompany').insert({
            'name': src_comp.COMP_CODE,
            'comp_code': src_comp.COMP_CODE,
            'comp_sht_desc': src_comp.COMP_SHT_DESC,
            'company_name': src_comp.COMP_SHT_DESC,            
            'comp_desc': src_comp.COMP_DESC,        
        });
        
        await conn.knex_oracle('COMPANY').where({ 'COMP_CODE': src_comp.COMP_CODE }).update({ IS_UPLOAD: 'Y' });
    });

    console.log('company synced successfully.')
}
