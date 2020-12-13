import Model from '../models/models';
import _ from 'lodash';
import Promise from '../utils/promise';
import ErrorHelpers from '../helpers/errorHelpers';
import models from '../entity/index';
import preCheckHelpers, { TYPE_CHECK } from '../helpers/preCheckHelpers';
import filterHelpers from '../helpers/filterHelpers';
import * as ApiErrors from '../errors';
import { Sequelize } from 'sequelize';
import { sequelize } from '../db';
const { QueryTypes } = require('sequelize');

const { users, posts, media, comments, likes } = models;

export default {
	get_list: async (param) => {
		console.log('param: ', param);
		let finalResult;
		try {
			const { filter, range, sort, auth } = param; // vua viet o validate
			let userId = auth.userId;

			let whereFilter = filterHelpers.makeStringFilterRelatively(['content'], filter);
			console.log('filter: ', whereFilter);
			const perPage = range[1] - range[0] + 1;
			const page = Math.floor(range[0] / perPage);

			// token, postId, ton tai postId, userId
			const result = await Model.findAndCountAll(posts, {
				where: whereFilter,
				order: [sort],
				// attributes: {
				// 	include: [
				// 		[Sequelize.fn('COUNT', Sequelize.col('likes.id')), 'likeCount'],
				// 		[Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentCount'],
				// 		[Sequelize.where(Sequelize.col('likes.user_id'), '=', userId), 'isLike'],
				// 	],
				// },
				include: [
					{
						model: users,
						as: 'users',
						attributes: ['id', 'name', 'avatar'],
					},
					{
						model: media,
						as: 'media',
						attributes: ['id', 'path', 'type'],
					},
					{
						model: comments,
						as: 'comments',
						attributes: ['content'],
						include: [
							{
								model: users,
								as: 'users',
								attributes: ['id', 'name', 'avatar'],
							},
						],
					},
					{
						model: likes,
						as: 'likes',
						attributes: [],
					},
				],
				// group: ['posts.id'],
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

			const result = await Model.findOne(posts, {
				where: whereFilter,
				include: [
					{
						model: users,
						as: 'users',
						attributes: ['id', 'telephone', 'name'],
					},
					{
						model: media,
						as: 'media',
						attributes: ['id', 'path', 'type'],
					},
				],
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
	count: async (param) => {
		console.log('param: ', param);
		let finalResult;
		try {
			const { id, userId } = param;

			const whereFilter = {
				postId: id,
			};

			const result = await Promise.all([
				Model.count(likes, {
					where: whereFilter,
				}),
				Model.count(comments, {
					where: whereFilter,
				}),
				Model.count(likes, {
					where: {
						...whereFilter,
						userId: userId,
					},
				}),
			]).catch((error) => {
				ErrorHelpers.errorThrow(error, 'getInfoError', 'UserServices');
			});
			console.log('result: ', result);
			if (!result) {
				return {
					message: 'Không thể thực hiện truy vấn',
				};
			}

			console.log('result: ', result);
			finalResult = {
				countLike: result[0],
				countComment: result[1],
				isLike: result[2] ? true : false,
			};
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

			finalResult = await Model.create(posts, entity).catch((err) => {
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

			const foundPost = await Model.findOne(posts, {
				where: {
					id: param.id,
				},
			});

			if (foundPost) {
				await Model.update(posts, entity, {
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

				finalResult = await Model.findOne(posts, {
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
			const foundPost = await Model.findOne(posts, {
				where: {
					id: param.id,
				},
			});

			if (foundPost) {
				finalResult = await Model.destroy(posts, {
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
