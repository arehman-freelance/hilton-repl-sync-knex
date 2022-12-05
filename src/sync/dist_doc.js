const path = require('path');
const fs = require('fs');
const gen_conf = require('../config/gen_config')
const md5 = require('md5');
const conn = require('../db/connections');


exports.sync_dist_doc = () => {

    fs.readdir(gen_conf.distCurrFilePath, (err, files) => {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach((file) => {
            if (!!path.extname(file)) {

                insert_dist_docs(file);
            }
        });
    });
}

gen_hash = (file_name) => {
    return md5(file_name + Math.floor(new Date().getTime() / 1000));
}

get_str_dt_time = () => {
    const dt = new Date();
    const y = String(dt.getFullYear());
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    const h = String(getHours() + 1).padStart(2, '0');
    const mi = String(getMinutes() + 1).padStart(2, '0');
    const s = String(getSeconds() + 1).padStart(2, '0');

    return {
        'UPLOADING_DATE': y + '-' + m + '-' + d,
        'UPLOADING_TIME': h + ':' + mi + ':' + s,
    }

}

split_file = (file_name) => {
    let ext_split = file_name.split('.');
    file_name_splits = ext_split[0].split('_');
    let hash = gen_hash(file_name);

    return {
        COMP_CODE: file_name_splits[0],
        DOC_TYPE: file_name_splits[1],
        SAPCODE: file_name_splits[2],
        YEAR: file_name_splits[3],
        MON: file_name_splits[4],
        DAY: file_name_splits[5],
        DOC_NUMBER: file_name_splits[6],
        FILE_TYPE: ext_split[1],
        HASH: hash,
        FILE_NAME: file_name,
        FILE_URL: path.join(gen_conf.distArchFilePath, hash + '.' + ext_split[1]),
        UPLOADING_DATE: uploading_dt['UPLOADING_DATE'],
        UPLOADING_TIME: uploading_dt['UPLOADING_TIME']        
    }
}

insert_dist_docs = async (file) => {

    let dist_docs = split_file(file);

    let COMP_CODE = dist_docs.COMP_CODE; 
    let SAPCODE = dist_docs.SAPCODE;

    let dist_list = await conn.knex_oracle('DISTRIBUTOR').where({ COMP_CODE, SAPCODE }).limit(1);
    dist_list.forEach(dist => {
        dist_docs.DIST = dist.CODE;
    });

    delete dist_docs.HASH;
    delete dist_docs.SAPCODE;


    await conn.knex_oracle('DISTRIBUTORDOCS').insert(dist_docs);

    let old_path = path.join(gen_conf.distCurrFilePath, file);
    let new_path = dist_docs.FILE_URL;
    fs.rename(old_path, new_path, (err) => {
        if (err) {
            console.log(err)
        }
    });
    console.log("file moved successfully")

}
