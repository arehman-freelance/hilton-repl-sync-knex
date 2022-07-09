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

split_file = (file_name) => {
    let ext_split = file_name.split('.');
    file_name_splits = ext_split[0].split('_');
    let hash = gen_hash(file_name);

    return {
        comp_code: file_name_splits[0],
        doc_type: file_name_splits[1],
        sapcode: file_name_splits[2],
        year: file_name_splits[3],
        mon: file_name_splits[4],
        day: file_name_splits[5],
        doc_number: file_name_splits[6],
        file_type: ext_split[1],
        hash: hash,
        file_name: file_name,
        file_url: path.join(gen_conf.distArchFilePath, hash + '.' + ext_split[1])
    }
}

insert_dist_docs = async (file) => {

    let dist_docs = split_file(file);

    let comp_code = dist_docs.comp_code; 
    let sapcode = dist_docs.sapcode;

    let dist_list = await conn.knex_mariadb('DISTRIBUTOR').where({ comp_code, sapcode }).limit(1);
    dist_list.forEach(dist => {
        dist_docs.dist = dist.CODE;
    });

    delete dist_docs.hash;
    delete dist_docs.sapcode;


    await conn.knex_mariadb('DISTRIBUTORDOCS').insert(dist_docs);

    let old_path = path.join(gen_conf.distCurrFilePath, file);
    let new_path = dist_docs.file_url;
    fs.rename(old_path, new_path, (err) => {
        if (err) {
            console.log(err)
        }
    });
    console.log("file moved successfully")

}