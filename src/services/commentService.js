import Model from '../models/models';
import _ from 'lodash';
import Promise from '../utils/promise';
import ErrorHelpers from '../helpers/errorHelpers';
import models from '../entity/index';
import preCheckHelpers, { TYPE_CHECK } from '../helpers/preCheckHelpers';
import filterHelpers from '../helpers/filterHelpers';
import * as ApiErrors from '../errors';

const { users, posts, comments } = models;

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

			const result = await Model.findAndCountAll(comments, {
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

			finalResult = await Model.create(comments, entity).catch((err) => {
				ErrorHelpers.errorThrow(err, 'crudError', 'commentServices');
			});
		} catch (error) {
			ErrorHelpers.errorThrow(error, 'crudError', 'commentServices');
		}
		return { result: finalResult };
	},

};
