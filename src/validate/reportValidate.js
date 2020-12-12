import ValidateJoi, { noArguments } from '../utils/validateJoi';
import viMessage from '../locates/vi';
import { sequelize } from '../db/db';
import regexPattern from '../utils/regexPattern';

const DEFAULT_SCHEMA = {
    type: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.reports.type'],
	}),
	userId: ValidateJoi.createSchemaProp({
		number: noArguments,
		label: viMessage.userId,
		integer: noArguments,
    }),
    postId: ValidateJoi.createSchemaProp({
		number: noArguments,
		label: viMessage['api.reports.postId'],
		integer: noArguments,
	})
};

export default {
	reportCreate: (req, res, next) => {
		console.log('Validate Create Report');

        const { type, userId, postId } = req.body; // userId từ local  input data => content
		const reports = { type, userId, postId };

		const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
            type: {
				max: 500,
			},
			userId: {
				required: noArguments,
            },
            postId: {
				required: noArguments,
			}
		});

		ValidateJoi.validate(reports, SCHEMA)
			.then((data) => {
				res.locals.body = data;
				next();
			})
			.catch((error) => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
    },

	// friendUpdate: (req, res, next) => {
	// 	console.log('Validate Update Friend');

	// 	const { status } = req.body;
	// 	const friends = { status };

	// 	const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
	// 		status: {
	// 			required: noArguments,
	// 		},
	// 	});

	// 	ValidateJoi.validate(friends, SCHEMA)
	// 		.then((data) => {
	// 			res.locals.body = data;
	// 			next();
	// 		})
	// 		.catch((error) => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
	// },

	// friendFilter: (req, res, next) => {
	// 	const { filter, sort, range } = req.query;

	// 	res.locals.sort = sort
	// 		? JSON.parse(sort).map((e, i) => (i === 0 ? sequelize.literal(`\`${e}\``) : e))
	// 		: ['id', 'asc'];
	// 	res.locals.range = range ? JSON.parse(range) : [0, 49];

	// 	console.log('res.locals: ', res.locals);

	// 	if (filter) {
	// 		const { status } = JSON.parse(filter);
	// 		const friend = { status };

	// 		const SCHEMA = { ...DEFAULT_SCHEMA };

	// 		ValidateJoi.validate(friend, SCHEMA)
	// 			.then((data) => {
	// 				console.log('data: ', data);
	// 				// if (postId) {
	// 				// 		ValidateJoi.transStringToArray(data, 'id');
	// 				// }

	// 				res.locals.filter = data;
	// 				console.log('locals.filter', res.locals.filter);
	// 				next();
	// 			})
	// 			.catch((error) => {
	// 				next({ ...error, message: 'Định dạng gửi đi không đúng' });
	// 			});
	// 	} else {
	// 		res.locals.filter = {};
	// 		next();
	// 	}
	// },
};
