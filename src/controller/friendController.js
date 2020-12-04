import friendService from '../services/friendService';
import loggerHelpers from '../helpers/loggerHelpers';
// import { recordStartTime } from "../utils/loggerFormat";
// import { codeMessage } from "../utils";
import errorCode from '../utils/errorCode';
import * as ApiErrors from '../errors';

export default {
	get_list: (req, res, next) => {
		// recordStartTime.call(req);
		try {
			const { sort, range, filter } = res.locals;
			const param = {
				sort,
				range,
				filter,
			};

			friendService
				.get_list(param)
				.then((data) => {
					res.send(data);

					// recordStartTime.call(res);
					loggerHelpers.logInfor(req, res, {
						dataParam: req.params,
						dataQuery: req.query,
					});
				})
				.catch((error) => {
					next(error);
				});
		} catch (error) {
			error.dataParams = req.params;
			next(error);
		}
	},

	create: (req, res, next) => {
		// recordStartTime.call(req);
		try {
			console.log('Request-Body:', req.body);
			const entity = res.locals.body;
			const param = { entity };

			friendService
				.create(param)
				.then((data) => {
					if (data && data.result) {
						const dataOutput = {
							result: data.result,
							success: true,
							errors: [],
							messages: [],
						};

						res.send(dataOutput);
						// recordStartTime.call(res);
						loggerHelpers
							.logCreate(req, res, {
								dataQuery: req.query,
								dataOutput: data.result,
							})
							.catch((error) => console.log(error));
					} else {
						throw new ApiErrors.BaseError({
							statusCode: 202,
							type: 'crudNotExisted',
						});
					}
				})
				.catch((error) => {
					next(error);
				});
		} catch (error) {
			next(error);
		}
	},


	update: (req, res, next) => {
		// recordStartTime.call(req);
		try {
			const { id } = req.params;
			const entity = res.locals.body;
			// const entity = req.body
			const param = { id, entity };

			friendService
				.update(param)
				.then((data) => {
					if (data && data.result) {
						const dataOutput = {
							result: data.result,
							success: true,
							errors: [],
							messages: [],
						};

						res.send(dataOutput);

						// recordStartTime.call(res);
						loggerHelpers
							.logUpdate(req, res, {
								dataQuery: req.query,
								dataOutput: data.result,
							})
							.catch((error) => console.log(error));
					} else {
						throw new ApiErrors.BaseError({
							statusCode: 202,
							type: 'crudNotExisted',
						});
					}
				})
				.catch((error) => {
					error.dataInput = req.body;
					error.dataParams = req.params;
					next(error);
				});
		} catch (error) {
			error.dataInput = req.body;
			error.dataParams = req.params;
			next(error);
		}
	},

	delete: (req, res, next) => {
		// recordStartTime.call(req);
		try {
		  const { id } = req.params;
		  // const entity = { Status: 0 }
		  const param = { id };
  
		  friendService
			.delete(param)
			.then((data) => {
			  if (data && data.status === 1) {
				const dataOutput = {
				  result: null,
				  success: true,
				  errors: [],
				  messages: [],
				};
  
				res.send(dataOutput);
  
				// recordStartTime.call(res);
				loggerHelpers.logInfor(req, res, {});
			  } else {
				throw new ApiErrors.BaseError({
				  statusCode: 202,
				  type: "deleteError",
				});
			  }
			})
			.catch((error) => {
			  error.dataParams = req.params;
			  next(error);
			});
		} catch (error) {
		  error.dataParams = req.params;
		  next(error);
		}
	  },

};
