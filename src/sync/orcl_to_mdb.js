const db_utils = require('../db/utils');


exports.sync_setups = () => {
    db_utils.sync_orcl_to_mdb('COMPANY', ['COMP_CODE'])
}
