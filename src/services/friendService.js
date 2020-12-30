import Model from '../models/models';
import _ from 'lodash';
import Promise from '../utils/promise';
import ErrorHelpers from '../helpers/errorHelpers';
import models from '../entity/index';
import preCheckHelpers, { TYPE_CHECK } from '../helpers/preCheckHelpers';
import filterHelpers from '../helpers/filterHelpers';
import * as ApiErrors from '../errors';

const { friends, users } = models;

export default {
	get_list: async (param) => {
		console.log('param: ', param);
		let finalResult;
		try {
			const { sort, range, filter } = param; // vua viet o validate

			let whereFilter = filter;
			console.log('filter: ', whereFilter);
			const perPage = range[1] - range[0] + 1;
			const page = Math.floor(range[0] / perPage);

			const result = await Model.findAndCountAll(friends, {
				where: whereFilter,
				order: [sort],
				include: [
					{
						model: users,
						as: 'me',
						attributes: ['id'],
					},
					{
						model: users,
						as: 'you',
						attributes: ['id', 'name', 'avatar', 'telephone'],
					},
				],
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

			finalResult = await Model.create(friends, entity).catch((err) => {
				ErrorHelpers.errorThrow(err, 'crudError', 'commentServices');
			});
		} catch (error) {
			ErrorHelpers.errorThrow(error, 'crudError', 'commentServices');
		}
		return { result: finalResult };
	},

	checkFriend: async (param) => {
		console.log('param: ', param);
		const { friendId, userId } = param;
		let finalResult;
		let data = null;
		try {
			finalResult = await Promise.all([
				Model.findOne(friends, { where: param }),
				Model.findOne(friends, {
					where: {
						friendId: userId,
						userId: friendId,
					},
				}),
			]);
			if (!finalResult[0] && !finalResult[1]) {
				// TH Chưa kết bạn
				console.log('ok1: ');
				data = {
					status: 0,
					info: 'TH Chưa kết bạn',
				};
			} else if (!finalResult[0] && finalResult[1]) {
				const status = finalResult[1] && finalResult[1]['dataValues'] && finalResult[1]['dataValues'].status;
				if (status === 0) {
					data = {
						status: 0,
						info: 'TH Chưa kết bạn',
					};
				} else if (status === 1) {
					data = {
						status: 1,
						info: 'Chờ xác nhận',
					};
				} else if (status === 2) {
					data = {
						status: 2,
						info: 'Đã là bạn bè',
					};
				}
			} else if (finalResult[0] && !finalResult[1]) {
				const status = finalResult[0] && finalResult[0]['dataValues'] && finalResult[0]['dataValues'].status;
				// TH Mình là người thao tác tới tài khoản bạn bè
				if (status === 0) {
					data = {
						status: 0,
						info: 'TH Chưa kết bạn',
					};
				} else if (status === 1) {
					data = {
						status: -1,
						info: 'TH chờ người khác xác nhận',
					};
				} else if (status === 2) {
					data = {
						status: 2,
						info: 'Đã là bạn bè',
					};
				}
			}
		} catch (error) {
			ErrorHelpers.errorThrow(error, 'crudError', 'commentServices');
		}
		console.log('data: ', data);
		return data;
	},

	update: async (param) => {
		let finalResult;

		try {
			let { entity } = param;

			const foundFriend = await Model.findOne(friends, {
				where: {
					id: param.id,
				},
			});

			if (foundFriend) {
				await Model.update(friends, entity, {
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

				finalResult = await Model.findOne(friends, {
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
			const foundFriend = await Model.findOne(friends, {
				where: {
					id: param.id,
				},
			});

			if (foundFriend) {
				finalResult = await Model.destroy(friends, {
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
