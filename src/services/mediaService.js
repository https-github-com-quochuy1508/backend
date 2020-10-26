import Model from '../models/models';
import _ from 'lodash';
import Promise from '../utils/promise';
import ErrorHelpers from '../helpers/errorHelpers';
import models from '../entity/index';
import preCheckHelpers, { TYPE_CHECK } from '../helpers/preCheckHelpers';
import filterHelpers from '../helpers/filterHelpers';
import * as ApiErrors from '../errors';

const { users, posts, media } = models;

export default {
	get_list: async (param) => {
		console.log('param: ', param);
		let finalResult;
		try {
			const { filter, range, sort } = param; // vua viet o validate
			let whereFilter = filterHelpers.makeStringFilterRelatively(['path'], filter);
			console.log('filter: ', whereFilter);
			const perPage = range[1] - range[0] + 1;
			const page = Math.floor(range[0] / perPage);

			const result = await Model.findAndCountAll(media, {
				where: whereFilter,
				order: [sort],
				include: [
					{
						model: users,
						as: 'users',
					},
					{
						model: posts,
						as: 'posts',
					},
				],
			}).catch((error) => {
				ErrorHelpers.errorThrow(error, 'getListError', 'postServices');
			});

			finalResult = {
				...result,
				page: page + 1,
				perPage,
			};
		} catch (error) {
			ErrorHelpers.errorThrow(error, 'getListError', 'postServices');
		}
		return finalResult;
	},

	get_one: async (param) => {
		console.log('param: ', param);
		let finalResult;
		try {
			const { id } = param;

			const whereFilter = { id };

			const result = await Model.findOne(media, {
				where: whereFilter,
			}).catch((error) => {
				ErrorHelpers.errorThrow(error, 'getInfoError', 'UserServices');
			});

			if (!result) {
				return {
					message: 'Không tồn tại bản ghi',
				};
			}

			console.log('result: ', result);
			finalResult = result;
		} catch (error) {
			ErrorHelpers.errorThrow(error, 'getInfoError', 'UserServices');
		}
		return finalResult;
	},

	create: async (param) => {
		console.log('param: ', param);
		let finalResult;
		try {
			let { entity } = param;

			console.log('entity: ', entity);

			finalResult = await Model.create(media, entity).catch((err) => {
				ErrorHelpers.errorThrow(error, 'crudError', 'postServices');
			});
		} catch (error) {
			ErrorHelpers.errorThrow(error, 'crudError', 'postServices');
		}
		return { result: finalResult };
	},

	update: async (param) => {
		let finalResult;

		try {
			let { entity } = param;

			const foundPost = await Model.findOne(media, {
				where: {
					id: param.id,
				},
			});

			if (foundPost) {
				await Model.update(media, entity, {
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

				finalResult = await Model.findOne(media, {
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
			const foundPost = await Model.findOne(media, {
				where: {
					id: param.id,
				},
			});

			if (foundPost) {
				finalResult = await Model.destroy(media, {
					where: {
						id: parseInt(param.id),
					},
				}).catch((error) => {
					throw new ApiErrors.BaseError({
						statusCode: 202,
						type: 'deleteError',
						message: 'Update không thành công',
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
