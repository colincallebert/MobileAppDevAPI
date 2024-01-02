const {
    getLogger
} = require('../core/logging');
const ServiceError = require('../core/serviceError')
const registrationsRepository = require('../repository/registration');
const activitiesRepository = require('../repository/activity')
let {
    REGISTRATIONS
} = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
};

const checkAmount = async (userid, activityid, amount) => {
   return true
}

const getById = async (userid, activityid) => {
    debugLog(`Fetching registration with userid ${userid} and activityid ${activityid}`);
    const registration = await registrationsRepository.findById(userid, activityid);
    console.log(registration)
    return registration;
};

const create = async ({
    userid,
    activityid,
    amount,
}) => {
    if ( await checkAmount(userid, activityid, amount)) {
    const registration = await registrationsRepository.create(userid,
        activityid,
        amount,
    );
    debugLog('Creating new REGISTRATIONS', registration);
    return registration;
} else {
    throw ServiceError.validationFailed(`Maximum registraties overschreden`);
}
};

const updateById = async (userid,
    activityid,
    amount
) => {
    debugLog(`Updating registration with userid ${userid} and activityid ${activityid}`, {
        userid,
        activityid,
        amount
    });
    if ( await checkAmount(userid, activityid, amount)) {
        const registration = await registrationsRepository.updateById(
            userid,
            activityid,
            amount
        );
        debugLog('Update registration', registration);
        return registration;
    } else {
        throw ServiceError.validationFailed(`Maximum registraties overschreden`);
    }

};
const deleteById = async (userid, activityid) => {
    debugLog(`Deleting registration with userid ${userid} and activityid ${activityid}`);
    const deleted = await registrationsRepository.deleteById(userid, activityid);
    if (!deleted) {
        throw ServiceError.notFound(`No registration with ${userid} and activityid ${activityid} exists`);
    }
    return {
        "userid" : 1,
        "activityid": activityid,
        "amount": 0
    }
};

module.exports = {
    getById,
    create,
    updateById,
    deleteById,
};