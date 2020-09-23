import Model from '../models/models';
import _ from 'lodash';
import Promise from '../utils/promise';
import ErrorHelpers from '../helpers/errorHelpers';
import models from '../entity/index';
import preCheckHelpers, { TYPE_CHECK } from '../helpers/preCheckHelpers';
import filterHelpers from '../helpers/filterHelpers';
import * as ApiErrors from '../errors';

const { users, posts } = models;

export default {
	get_list: async (param) => {
		console.log('param: ', param);
		let finalResult;
		try {
			const { filter, range, sort } = param; // vua viet o validate
			// let whereFilter = _.omit(filter, ["wardsId"]);
			let whereFilter = filterHelpers.makeStringFilterRelatively(['content'], filter);
			console.log('filter: ', whereFilter);
			const perPage = range[1] - range[0] + 1;
			const page = Math.floor(range[0] / perPage);

			const result = await Model.findAndCountAll(posts, {
				where: whereFilter,
				order: [sort],
				// attributes: ['id', 'content', 'userId'],
				// {
				//   exclude: ["password"],
				// },
				include: [
					{
						model: users,
						as: 'users',
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

			const result = await Model.findOne(posts, {
				where: whereFilter,
				// attributes: {
				// 	// include: [],
				// 	exclude: ['password'],
				// },
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

			// const passMd5 = md5(entity.password);

			// entity = Object.assign(param.entity, { password: passMd5 });
			console.log('entity: ', entity);

			// const infoArr = Array.from(
			// 	await Promise.all([
			// 		preCheckHelpers.createPromiseCheckNew(
			// 			Model.findOne(users, {
			// 				where: {
			// 					$or: [
			// 						{
			// 							username: {
			// 								$eq: entity.username,
			// 							},
			// 						},
			// 						{
			// 							mobile: {
			// 								$eq: entity.mobile,
			// 							},
			// 						},
			// 						{
			// 							email: {
			// 								$eq: entity.email,
			// 							},
			// 						},
			// 					],
			// 				},
			// 			}),

			// 			entity.name && entity.mobile && entity.email ? true : false,
			// 			TYPE_CHECK.CHECK_DUPLICATE,
			// 			{ parent: 'api.users.username' }
			// 		),
			// 	])
			// );

			// console.log('infoArr: ', infoArr);

			// if (!preCheckHelpers.check(infoArr)) {
			// 	throw new ApiErrors.BaseError({
			// 		statusCode: 202,
			// 		type: 'getInfoError',
			// 		message: 'Không xác thực được thông tin gửi lên',
			// 	});
			// }

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
				// const infoArr = await Promise.all([
				// 	Model.findOne(users, {
				// 		where: {
				// 			id: { $ne: param.id },
				// 			username: entity.username || foundUser.username,
				// 		},
				// 	}),
				// ]);
				// if (infoArr[0]) {
				// 	throw new ApiErrors.BaseError({
				// 		statusCode: 202,
				// 		type: 'getInfoError',
				// 		message: 'Không xác thực được thông tin gửi lên',
				// 	});
				// }

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

	//   changePass: param =>
	//     new Promise((resolve, reject) => {
	//       try {
	//         console.log("change pass: ", param);

	//         let { entity } = param;
	//         let newPassMd5;

	//         if (entity.NewPassWord === undefined || entity.NewPassWord === "") {
	//           reject({ status: 0, message: "Mật khẩu mới không hợp lệ" });
	//         }

	//         if (entity.OldPassWord === undefined || entity.OldPassWord === "") {
	//           reject({ status: 0, message: "Mật khẩu cũ không hợp lệ" });
	//         }

	//         if (
	//           entity.OldPassWord !== undefined &&
	//           entity.NewPassWord !== undefined &&
	//           entity.NewPassWord === entity.OldPassWord
	//         ) {
	//           reject({ status: 0, message: "Mật khẩu mới giống mật khẩu cũ" });
	//         }

	//         const oldPassMd5 = md5(entity.OldPassWord);

	//         const whereUser = { id: param.id, password: oldPassMd5 };

	//         console.log("whereUser Old: ", whereUser);

	//         userModel
	//           .findOne({
	//             where: whereUser
	//           })
	//           .then(user => {
	//             if (user) {
	//               newPassMd5 = md5(entity.NewPassWord);

	//               entity = Object.assign(param.entity, { password: newPassMd5 });

	//               userModel
	//                 .update(entity, {
	//                   where: { id: parseInt(param.id) }
	//                 })
	//                 .then(rowsUpdate => {
	//                   console.log("rowsUpdate: ", rowsUpdate);

	//                   if (rowsUpdate[0] > 0) {
	//                     resolve({ status: 1, message: "Thành Công" });
	//                   } else {
	//                     reject({ status: 0, message: "Thay đổi thất bại" });
	//                   }
	//                 })
	//                 .catch(error => {
	//                   reject(
	//                     ErrorHelpers.errorReject(error, "crudError", "UserServices")
	//                   );
	//                 });
	//             } else {
	//               reject({ status: 0, message: "Mật khẩu cũ không đúng." });
	//             }
	//           })
	//           .catch(error => {
	//             reject(
	//               ErrorHelpers.errorReject(error, "crudError", "UserServices")
	//             );
	//           });
	//       } catch (error) {
	//         reject({ status: 0, message: "Lỗi cơ sở dữ liệu" });
	//       }
	//     }),
	//     resetPass: param =>
	//     new Promise(resolve => {
	//       try {
	//         console.log('param: ', param);
	//         let { entity } = param;

	//         if (entity.password === undefined || entity.password === '') {
	//           resolve({ status: 0, message: 'Mạt khẩu không hợp lệ!' });
	//         }
	//         const passMd5 = md5(entity.password);

	//         console.log('md5: ', passMd5);
	//         entity = Object.assign({}, { password: passMd5 });

	//         userModel
	//           .update(entity, {
	//             where: { id: Number(param.id) }
	//             // fields: ['password']
	//           })
	//           .then(rowsUpdate => {
	//             console.log('rowsUpdate: ', rowsUpdate);
	//             if (rowsUpdate[0] > 0) {
	//               resolve({ status: 1, message: 'Thành Công' });
	//             } else {
	//               resolve({ status: 0, message: 'Mật khẩu cũ giống mật khẩu mới' });
	//             }
	//           })
	//           .catch(err => {
	//             console.log('create user err: ', err);
	//             resolve({ status: -2, message: err.errors.message });
	//           });
	//       } catch (error) {
	//         resolve({ status: -1, message: `Lỗi cơ sở dữ liệu: ${error}` });
	//       }
	//     }),
};
