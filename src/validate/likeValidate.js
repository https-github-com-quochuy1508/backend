import ValidateJoi, { noArguments } from '../utils/validateJoi';
import viMessage from '../locates/vi';
import { sequelize } from '../db/db';
import regexPattern from '../utils/regexPattern';

const DEFAULT_SCHEMA = {
	userId: ValidateJoi.createSchemaProp({
		number: noArguments,
		label: viMessage.userId,
	}),
	postId: ValidateJoi.createSchemaProp({
		number: noArguments,
		label: viMessage['api.posts.id'],
	}),
};

export default {
	authenCreate: (req, res, next) => {
		console.log('Validate Create');

		const { userId, postId } = req.body; // userId từ local  input data => content
		const likes = { userId, postId };

		const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
			userId: {
				required: noArguments,
			},
			postId: {
				required: noArguments,
			},
		});

		ValidateJoi.validate(likes, SCHEMA)
			.then((data) => {
				res.locals.body = data;
				next();
			})
			.catch((error) => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
	},

	authenFilter: (req, res, next) => {
		const { filter, sort, range } = req.query;

		res.locals.sort = sort
			? JSON.parse(sort).map((e, i) => (i === 0 ? sequelize.literal(`\`${e}\``) : e))
			: ['id', 'asc'];
		res.locals.range = range ? JSON.parse(range) : [0, 49];

		console.log('res.locals: ', res.locals);
		if (filter) {
			const { id, content } = JSON.parse(filter);
			const post = {
				id,
				content,
			};

			const SCHEMA = {
				id: ValidateJoi.createSchemaProp({
					string: noArguments,
					label: viMessage['api.posts.id'],
					regex: regexPattern.listIds,
				}),
				...DEFAULT_SCHEMA,
			};

			// console.log('input: ', input);
			ValidateJoi.validate(post, SCHEMA)
				.then((data) => {
					console.log('data: ', data);
					if (id) {
						ValidateJoi.transStringToArray(data, 'id');
					}
					// if (wardsId) {
					// 	ValidateJoi.transStringToArray(data, 'wardsId');
					// }

					res.locals.filter = data;
					console.log('locals.filter', res.locals.filter);
					next();
				})
				.catch((error) => {
					next({ ...error, message: 'Định dạng gửi đi không đúng' });
				});
		} else {
			res.locals.filter = {};
			next();
		}
	},
};
