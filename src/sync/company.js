const conn = require('../db/connections');


dynamic_sync = async(tbl_name, pk_cols) => {
    let src_tbl_list = await conn.knex_oracle(tbl_name).where({IS_UPLOAD: 'N'});

    src_tbl_list.forEach(async src_tbl => {
        await conn.knex_mariadb(tbl_name).insert(src_tbl).onConflict().merge(src_tbl);

        let pk_obj = {};
        pk_cols.forEach(col => {
            pk_obj[col] = src_tbl[col];
        });

        await conn.knex_oracle(tbl_name).where(pk_obj).update({ IS_UPLOAD: 'Y' });
    });

    console.log(`${tbl_name} synced successfully.`)
}


exports.sync_company = async() => {
    dynamic_sync('COMPANY', ['COMP_CODE'])
}



// original upsert code

// exports.sync_company = async() => {
//     let src_comp_list = await conn.knex_oracle('COMPANY').where({IS_UPLOAD: 'N'});

//     src_comp_list.forEach(async src_comp => {
//         let dest_comp =  await conn.knex_mariadb('COMPANY').insert(src_comp).onConflict()
//         .merge(src_comp);

//         await conn.knex_oracle('COMPANY').where({ 'COMP_CODE': src_comp.COMP_CODE }).update({ IS_UPLOAD: 'Y' });
//     });

//     console.log('company synced successfully.')
// }


