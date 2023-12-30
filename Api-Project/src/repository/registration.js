const {
    tables,
    getKnex
} = require('../data/index');
const {
    getLogger
} = require('../core/logging');
const formatUser = ({
    userid,
    activityid,
    amount,
    ...rest
}) => ({
    ...rest,
    userid,
    activityid,
    amount
});
const findByActivityId = async (
    activityid) => {
    const registrations = await getKnex()(tables.registration)
        .where('activityid', activityid);
    return registrations;
};

const findById = async (userid,
    activityid) => {
    const registration = await getKnex()(tables.registration)
        .where('userid', userid)
        .andWhere('activityid', activityid);
    return registration[0] && formatUser(registration[0]);
};

const create = async (
    userid,
    activityid,
    amount
) => {
    try {
        await getKnex()(tables.registration)
            .insert({
                userid,
                activityid,
                amount
            });
        return await findById(userid, activityid);
    } catch (error) {
        const logger = getLogger();
        logger.error('Error in create', {
            error
        });
        throw error;
    }

};
const updateById = async (userid,
    activityid,
    amount
) => {
    try {
        console.log(2, userid, activityid, amount)
        await getKnex()(tables.registration)
            .update({
                userid,
                activityid,
                amount
            })
            .where('userid', userid)
            .andWhere('activityid', activityid);
        return await findById(userid,
            activityid);
    } catch (error) {
        const logger = getLogger();
        logger.error('Error in create', {
            error
        });
        throw error;
    }
};

const deleteById = async (userid,
    activityid) => {
    try {
        const rows = await getKnex()(tables.registration)
            .delete()
            .where('userid', userid)
            .andWhere('activityid', activityid);
        return rows > 0;
    } catch (error) {
        const logger = getLogger();
        logger.error('Error in deleteById', {
            error,
        });
        throw error;
    }
};
module.exports = {
    findById,
    create,
    updateById,
    deleteById,
    findByActivityId
};