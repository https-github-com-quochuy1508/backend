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
						attributes: ['id', 'content'],
						include: [
							{
								model: users,
								as: 'users',
								required: true,
								attributes: ['id', 'name', 'avatar'],
							},
						],
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

	search: async (param) => {
		console.log('param: ', param);
		let finalResult;
		try {
			const { filter, range, sort, auth } = param; // vua viet o validate
			let userId = auth.userId;
			// const filterComment = {
			// 	content: param.filter
			// };
			let whereFilter = filterHelpers.makeStringFilterRelatively(['content'], filter);
			let whereFilerUser = {
				name: whereFilter.content,
			};

			// let whereFilterComment = filterHelpers.makeStringFilterRelatively(['contentComment'], filterComment);
			console.log('filter: ', whereFilter);
			const perPage = range[1] - range[0] + 1;
			const page = Math.floor(range[0] / perPage);

			// token, postId, ton tai postId, userId
			const result = await Model.findAndCountAll(posts, {
				where: {
					$or: [
						{ '$users.name$': whereFilter.content },
						{ '$posts.content$': whereFilter.content },
						{ '$comments.content$': whereFilter.content },
					],
				},
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
						attributes: ['id', 'content'],
						include: [
							{
								model: users,
								as: 'users',
								required: true,
								attributes: ['id', 'name', 'avatar'],
							},
						],
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
			const { userId } = param;

			const whereFilter = {
				userId: userId,
			};

			let results = await Promise.all([
				Model.findAll(likes, {
					// where: whereFilter,
					attributes: ['postId', [sequelize.fn('COUNT', sequelize.col('likes.post_id')), 'countLike']],
					group: ['likes.post_id'],
					raw: true,
				}),
				Model.findAll(comments, {
					attributes: ['postId', [sequelize.fn('COUNT', sequelize.col('comments.post_id')), 'countComment']],
					group: ['comments.post_id'],
					raw: true,
				}),
				Model.findAll(likes, {
					where: whereFilter,
					attributes: ['postId'],
					// group: ['likes.post_id'],
					// raw: true,
					distinct: true,
				}),
			]).catch((error) => {
				ErrorHelpers.errorThrow(error, 'getInfoError', 'UserServices');
			});
			// result = _.keyBy(_.flatten(result), 'postId');
			const data = {};
			results = results.map((result, index) => {
				result.map((e) => {
					console.log('e: ', e);
					console.log('index: ', index);
					if (data.hasOwnProperty(e.postId)) {
						if (index === 0) {
							data[e.postId].countLike = e.countLike ? e.countLike : 0;
						} else if (index === 1) {
							data[e.postId].countComment = e.countComment ? e.countComment : 0;
						} else if (index === 2) {
							data[e.postId].isLike = true;
						} else {
							data[e.postId].countLike = 0;
							data[e.postId].countComment = 0;
							data[e.postId].isLike = false;
						}
					} else {
						data[e.postId] = {};
						if (index === 0) {
							data[e.postId].countLike = e.countLike ? e.countLike : 0;
						} else if (index === 1) {
							data[e.postId].countComment = e.countComment ? e.countComment : 0;
						} else if (index === 2) {
							data[e.postId].isLike = true;
						} else {
							data[e.postId].countLike = 0;
							data[e.postId].countComment = 0;
							data[e.postId].isLike = false;
						}
					}
				});
			});
			if (!data) {
				return {
					message: 'Không thể thực hiện truy vấn',
				};
			}

			console.log('result: ', data);
			finalResult = data;
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
