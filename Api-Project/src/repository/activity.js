const {
    tables,
    getKnex
} = require('../data/index');
const {
    getLogger
} = require('../core/logging');
const formatActivity = ({
    id,
    title,
    starttime,
    endtime,
    description,
    maxregistrations,
    amount,
    ...rest
}) => ({
    ...rest,
    id: id,
    title: title,
    starttime: starttime,
    endtime: endtime,
    description: description,
    maxregistrations: maxregistrations,
    amount: amount,
});

const SELECT_COLUMNS = [
    `${tables.activity}.id`,
    'title',
    'starttime',
    'endtime',
    'description',
    'maxregistrations',
    `${tables.registration}.amount`
];
const SELECT_COLUMNS_NO_AMOUNT = [
    `${tables.activity}.id`,
    'title',
    'starttime',
    'endtime',
    'description',
    'maxregistrations'
];

const findAll = async (userid) => {
    let activities;
    userid = 1
    if (userid) {
        console.log('user1', userid);
        activities = await getKnex()(tables.activity)
            .select(SELECT_COLUMNS)
            .leftOuterJoin(`${tables.registration}`, `${tables.registration}.activityid`, '=', `${tables.activity}.id`)
            .leftOuterJoin(`${tables.user}`, `${tables.user}.id`, '=', `${tables.registration}.userid`)
            .where(`${tables.user}.id`, userid)
        activities2 = await getKnex()(tables.activity)
            .select(SELECT_COLUMNS_NO_AMOUNT)
            .whereNotExists(function () {
                this.select(1)
                    .from(`${tables.registration}`)
                    .whereRaw(`${tables.registration}.activityid = ${tables.activity}.id`)
                    .andWhere(`${tables.registration}.userid`, userid);

            })
        activities2.forEach(element => {
            element.amount = 0;
        });    
        activities = activities.concat(activities2);
    } else {
        console.log('user2', userid);
        activities = await getKnex()(tables.activity)
            .select(SELECT_COLUMNS_NO_AMOUNT)
    }
    const formattedActivities = []
    for (const row of activities) {
        formattedActivities.push(formatActivity(row));
    }
    return formattedActivities;
};

const findById = async (id) => {
    let activities;
    userid = 1
    if (userid) {
        console.log('user1', userid);
        activities = await getKnex()(tables.activity)
            .select(SELECT_COLUMNS)
            .leftOuterJoin(`${tables.registration}`, `${tables.registration}.activityid`, '=', `${tables.activity}.id`)
            .leftOuterJoin(`${tables.user}`, `${tables.user}.id`, '=', `${tables.registration}.userid`)
            .where(`${tables.user}.id`, userid)
            .andWhere(`${tables.activity}.id`, id)
    } else {
        console.log('user2', userid);
        activities = await getKnex()(tables.activity)
            .select(SELECT_COLUMNS_NO_AMOUNT)
    }
    const formattedActivities = []
    for (const row of activities) {
        formattedActivities.push(formatActivity(row));
    }
    return formattedActivities[0];

    const activity = await getKnex()(tables.activity)
        .join(`${tables.employee}`, `${tables.employee}.id`, '=', `${tables.activity}.organizerid`)
        .where(`${tables.activity}.id`, id)
        .first(SELECT_COLUMNS_NO_AMOUNT)
        .then(val => {
            return formatActivity(val)
        });
    return activity;
};
module.exports = {
    findAll,
    findById,
};