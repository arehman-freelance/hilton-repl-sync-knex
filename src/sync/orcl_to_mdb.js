const db_utils = require('../db/utils');


exports.sync_setups = () => {
    db_utils.sync_orcl_to_mdb('COMPANY', ['COMP_CODE']);
    db_utils.sync_orcl_to_mdb('PRODUCT', ['CODE', 'COMP_CODE']);
    db_utils.sync_orcl_to_mdb('DISTRIBUTOR', ['CODE', 'COMP_CODE']);
    // db_utils.sync_orcl_to_mdb('CLAIMTYPE', ['CODE']);
}

exports.sync_trans = () => {
    db_utils.sync_orcl_to_mdb('PORDER_MASTER', [`COMP_CODE`, `DIST`, `MON`, `YEAR`, `SEQ_ID`]);
    db_utils.sync_orcl_to_mdb('PORDER_DETAIL', [`COMP_CODE`, `DIST`, `MON`, `YEAR`, `SEQ_ID`, `PRODUCT`]);
    db_utils.sync_orcl_to_mdb('SORDER_MASTER', [`TRN_NO`]);
    db_utils.sync_orcl_to_mdb('SORDER_DETAIL', [`ID`]);

    db_utils.sync_orcl_to_mdb('SPECIAL_ORDER_MASTER', [`COMP_CODE`, `DIST`, `MON`, `YEAR`, `SEQ_ID`]);
    db_utils.sync_orcl_to_mdb('SPECIAL_ORDER_DETAIL', [`COMP_CODE`, `DIST`, `MON`, `YEAR`, `SEQ_ID`, `PRODUCT`]);

    db_utils.sync_orcl_to_mdb('INS_PORDER_MASTER', [`COMP_CODE`, `DIST`, `YEAR`, `MON`, `SEQ_ID`]);
    db_utils.sync_orcl_to_mdb('INS_PORDER_DETAIL', [`COMP_CODE`, `DIST`, `YEAR`, `MON`, `SEQ_ID`, `PRODUCT`]);
}