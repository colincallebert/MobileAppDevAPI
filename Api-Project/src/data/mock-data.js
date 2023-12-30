let DEPARTEMENTS = [
	{
		id: 1,
		name: "Directie",
	},
	{
		id: 2,
		name: "Verzorging",
	},
	{
		id: 3,
		name: "Winkel",
	},
];


let ACTIVITIES = [
	{
		id: 1,
		title: "Koeien kammen",
		starttime: "2021-05-08T00:00:00.000Z",
		endtime: "2021-05-08T00:00:00.000Z",
		description: "Koeien helpen kammen",
		maxregistrations: 15,
		organizer: {
			id: 1,
			name: "Jacy Moerman",
		}
	},
	{
		id: 2,
		title: "Parden kammen",
		starttime: "2021-05-08T00:00:00.000Z",
		endtime: "2021-05-08T00:00:00.000Z",
		description: "Paarden helpen kammen",
		maxregistrations: 15,
		organizer: {
			id: 1,
			name: "Colin Callebert",
		}
	}
]
let USERS = [
	{
		id: 1,
		email: "colin.callebert@hotmail.com",
		name: "Callebert",
		birthday: "2001-04-20",
		aith0id: "a"
	},
	{
		id: 2,
		email: "jacy.moerman@hotmail.com",
		name: "Moerman",
		birthday: "1999-01-12",
		aith0id: "g"
	}
]

module.exports = { DEPARTEMENTS, ACTIVITIES, USERS };
