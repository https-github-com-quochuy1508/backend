import Model from '../models/models';
import _ from 'lodash';
import Promise from '../utils/promise';
import ErrorHelpers from '../helpers/errorHelpers';
import models from '../entity/index';
import preCheckHelpers, { TYPE_CHECK } from '../helpers/preCheckHelpers';
import filterHelpers from '../helpers/filterHelpers';
import * as ApiErrors from '../errors';

const { notifications } = models;

export default {
	get_list: async (param) => {
		console.log('param: ', param);
		let finalResult;
		try {
			const { sort,
				range,
				filter
			} = param; // vua viet o validate

			let whereFilter = filter;
			console.log('filter: ', whereFilter);
			const perPage = range[1] - range[0] + 1;
			const page = Math.floor(range[0] / perPage);

			const result = await Model.findAndCountAll(notifications, {
				where: whereFilter,
				order: [sort],
			}).catch((error) => {
				ErrorHelpers.errorThrow(error, 'getListError', 'commentServices');
			});

			finalResult = {
				...result,
				page: page + 1,
				perPage,
			};
		} catch (error) {
			ErrorHelpers.errorThrow(error, 'getListError', 'commentServices');
		}
		return finalResult;
	},

	create: async (param) => {
		console.log('param: ', param);
		let finalResult;
		try {
			let { entity } = param;

			console.log('entity: ', entity);

			/**
			 * Tinh so thong bao moi
			 */
			entity = {
				...entity,
				badge: 0,
			}

			finalResult = await Model.create(notifications, entity).catch((err) => {
				ErrorHelpers.errorThrow(err, 'crudError', 'commentServices');
			});
		} catch (error) {
			ErrorHelpers.errorThrow(error, 'crudError', 'commentServices');
		}
		return { result: finalResult };
	},

	update: async (param) => {
		let finalResult;

		try {
			let { entity } = param;

			const foundNotification = await Model.findOne(notifications, {
				where: {
					id: param.id,
				},
			});

			if (foundNotification) {
				await Model.update(notifications, entity, {
					where: {
						id: parseInt(param.id),
					},
				}).catch((error) => {
					throw new ApiErrors.BaseError({
						statusCode: 202,
						type: 'crudInfo',
						message: 'Update không thành công',
						error,
					});
				}); // 1 0

				finalResult = await Model.findOne(notifications, {
					where: {
						id: parseInt(param.id),
					},
				}).catch((error) => {
					throw error;
				});
				console.log('finalResult: ', finalResult);
				if (!finalResult) {
					throw new ApiErrors.BaseError({
						statusCode: 202,
						type: 'crudInfo',
					});
				}
			} else {
				throw new ApiErrors.BaseError({
					statusCode: 202,
					type: 'crudNotExisted',
				});
			}
		} catch (error) {
			ErrorHelpers.errorThrow(error, 'crudError', 'postServices');
		}
		return { result: finalResult };
	},

	delete: async (param) => {
		let finalResult;

		try {
			const foundNotification = await Model.findOne(notifications, {
				where: {
					id: param.id,
				},
			});

			if (foundNotification) {
				finalResult = await Model.destroy(notifications, {
					where: {
						id: parseInt(param.id),
					},
				}).catch((error) => {
					throw new ApiErrors.BaseError({
						statusCode: 202,
						type: 'deleteError',
						message: 'Delete không thành công',
						error,
					});
				}); // 1 0
				console.log('finalResult: ', finalResult);
			} else {
				throw new ApiErrors.BaseError({
					statusCode: 202,
					type: 'crudNotExisted',
				});
			}
		} catch (error) {
			ErrorHelpers.errorThrow(error, 'crudError', 'postServices');
		}
		return { status: finalResult };
	},

};
