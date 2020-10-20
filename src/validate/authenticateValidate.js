import ValidateJoi, { noArguments } from '../utils/validateJoi';
import viMessage from '../locates/vi';
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
};

export default {
	authenCreate: (req, res, next) => {
		console.log('Validate Create ok');

		const { telephone, password } = req.body;
		const user = { telephone, password };

		const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
			telephone: {
				regex: regexPattern.phoneNumberVie,
				// min: 5,
				required: noArguments,
			},
			password: {
				min: 6,
				max: 100,
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
};
