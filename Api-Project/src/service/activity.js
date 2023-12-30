const {
	getLogger
} = require('../core/logging');
const activitiesRepository = require('../repository/activity');
let {
	ACTIVITIES
} = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getLogger();
	this.logger.debug(message, meta);
};

const getAllRegesterd = async (userid) => {
	debugLog('Fetching all activities');
	const items = await activitiesRepository.findAllRegisterd(userid);
	return {
		items,
		count: items.length,
	};
};
const getAll = async (userid) => {
	debugLog('Fetching all activities');
	let items

		items = await activitiesRepository.findAll();
	return {
		items,
		count: items.length,
	};
};

const getById = async (id) => {
	debugLog(`Fetching activity with id ${id}`);
	const activity = await activitiesRepository.findById(id);
	console.log(activity)
	return activity;
};

module.exports = {
	getAll,
	getById,
};