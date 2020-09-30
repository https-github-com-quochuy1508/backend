import ValidateJoi, { noArguments } from '../utils/validateJoi';
import viMessage from '../locates/vi';
import { sequelize } from '../db/db';
import regexPattern from '../utils/regexPattern';

const DEFAULT_SCHEMA = {
	userId: ValidateJoi.createSchemaProp({
		number: noArguments,
		label: viMessage.userId,
		integer: noArguments,
    }),
    postId: ValidateJoi.createSchemaProp({
		number: noArguments,
		label: viMessage['api.posts.id'],
		integer: noArguments,
	}),
	content: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.comments.content'],
	}),
};

export default {
	createComment: (req, res, next) => {
		console.log('Validate Create Comment');

        const { userId, postId, content } = req.body; // userId từ local  input data => content
		const comments = { userId, postId, content };

		const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
			userId: {
				required: noArguments,
            },
            postId: {
				required: noArguments,
			},
			content: {
				max: 500,
				required: noArguments,
			},
		});

		ValidateJoi.validate(comments, SCHEMA)
			.then((data) => {
				res.locals.body = data;
				next();
			})
			.catch((error) => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
    },
    
	// authenUpdate: (req, res, next) => {
	// 	console.log('Validate Create');

	// 	const { content } = req.body;
	// 	const posts = { content };

	// 	const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
	// 		content: {
	// 			max: 500,
	// 		},
	// 	});

	// 	ValidateJoi.validate(posts, SCHEMA)
	// 		.then((data) => {
	// 			res.locals.body = data;
	// 			next();
	// 		})
	// 		.catch((error) => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
	// },

	getComments: (req, res, next) => {
		const { filter, sort, range } = req.query;

		res.locals.sort = sort
			? JSON.parse(sort).map((e, i) => (i === 0 ? sequelize.literal(`\`${e}\``) : e))
			: ['id', 'asc'];
		res.locals.range = range ? JSON.parse(range) : [0, 49];

		console.log('res.locals: ', res.locals);

		if (filter) {
			const { postId } = JSON.parse(filter);
			const comment = { postId };

			const SCHEMA = { ...DEFAULT_SCHEMA };

			ValidateJoi.validate(comment, SCHEMA)
				.then((data) => {
					console.log('data: ', data);
					// if (postId) {
					// 	ValidateJoi.transStringToArray(data, 'id');
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
