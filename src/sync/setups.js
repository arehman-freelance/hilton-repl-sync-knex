const db_utils = require('../db/utils');


exports.sync_company = async() => {
    db_utils.dynamic_sync('COMPANY', ['COMP_CODE'])
}
