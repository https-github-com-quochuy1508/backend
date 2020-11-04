import ValidateJoi, { noArguments } from '../utils/validateJoi';
import viMessage from '../locates/vi';
import { sequelize } from '../db/db';
import regexPattern from '../utils/regexPattern';

const DEFAULT_SCHEMA = {
	telephone: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.users.telephone'],
	}),
	password: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.users.password'],
	}),
	oldPassword: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.users.oldPassword'],
	}),
	newPassword: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.users.newPassword'],
	}),
	newPasswordConfirm: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.users.newPasswordConfirm'],
	}),
	name: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.users.name'],
	}),
	avatar: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.users.avatar'],
	}),
	uuid: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.users.uuid'],
	}),
	countFriends: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.users.countFriends'],
	}),
	birthday: ValidateJoi.createSchemaProp({
		string: noArguments,
		label: viMessage['api.users.birthday'],
	}),
};

export default {
	authenCreate: (req, res, next) => {
		console.log('Validate Create: ', req.body);

		const { telephone, name, password, uuid, avatar, countFriends, birthday } = req.body;
		const user = { telephone, name, password, uuid, avatar, countFriends, birthday };

		const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
			telephone: {
				regex: regexPattern.phoneNumberVie_,
				max: 12,
				required: noArguments,
			},
			password: {
				min: 6,
				max: 20,
				required: noArguments,
			},
			name: {
				max: 100,
				required: noArguments,
			},
			uuid: {
				max: 100,
				required: noArguments,
			},
			birthday: {
				regex: regexPattern.birthday,
				required: noArguments,
			},
		});

		ValidateJoi.validate(user, SCHEMA)
			.then((data) => {
				res.locals.body = data;
				next();
			})
			.catch((error) => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
	},
	authenUpdate: (req, res, next) => {
		console.log('Validate Create');

		const { telephone, name, password, uuid, avatar, countFriends, birthday } = req.body;
		const user = { telephone, name, password, uuid, avatar, countFriends, birthday };

		const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
			password: {
				min: 6,
				max: 20,
			},
			name: {
				max: 100,
			},
			uuid: {
				max: 100,
			},
			birthday: {
				regex: regexPattern.formatdateVie,
			},
		});

		ValidateJoi.validate(user, SCHEMA)
			.then((data) => {
				res.locals.body = data;
				next();
			})
			.catch((error) => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
	},
	changePassword: (req, res, next) => {
		console.log('Validate Chànepassword', req.body);

		const { oldPassword, newPassword, newPasswordConfirm } = req.body;
		const user = { oldPassword, newPassword, newPasswordConfirm };

		const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
			oldPassword: {
				min: 6,
				max: 20,
				required: noArguments,
			},
			newPassword: {
				min: 6,
				max: 20,
				required: noArguments,
			},
			newPasswordConfirm: {
				min: 6,
				max: 20,
				required: noArguments,
			},
		});

		ValidateJoi.validate(user, SCHEMA)
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
			const { id, telephone, name, password, uuid, avatar, countFriends, FromDate, ToDate } = JSON.parse(filter);
			const user = {
				id,
				telephone,
				name,
				password,
				uuid,
				avatar,
				countFriends,
				FromDate,
				ToDate,
			};

			const SCHEMA = {
				id: ValidateJoi.createSchemaProp({
					string: noArguments,
					label: viMessage['api.users.id'],
					regex: regexPattern.listIds,
				}),
				...DEFAULT_SCHEMA,
				FromDate: ValidateJoi.createSchemaProp({
					date: noArguments,
					label: viMessage.FromDate,
				}),
				ToDate: ValidateJoi.createSchemaProp({
					date: noArguments,
					label: viMessage.ToDate,
				}),
			};

			// console.log('input: ', input);
			ValidateJoi.validate(user, SCHEMA)
				.then((data) => {
					console.log('data: ', data);
					if (id) {
						ValidateJoi.transStringToArray(data, 'id');
					}

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
