export default {
	configFileError: {
		code: 1491,
		messages: ['Kiểm tra cấu hình site ở file xảy ra lỗi', 'Verify file config fail.'],
	},
	syncFileError: {
		code: 1492,
		messages: ['Đồng bộ file của site xảy ra lỗi', 'Sync file config fail.'],
	},
	transactionError: {
		code: 1490,
		messages: ['Giao dịch bị hủy bỏ', 'Transaction rollback.'],
	},
	getListSuccess: { code: 1400, messages: ['Get list successful.'] },
	getListError: {
		code: 1401,
		messages: ['Lỗi lấy danh sách', 'Get list fail.'],
	},
	getAllError: { code: 1401, messages: ['Lỗi lấy danh sách', 'Get all fail.'] },
	countError: { code: 1401, messages: ['Lỗi đếm số lượng', 'Count fail.'] },

	getInfoAttributes: {
		code: 1407,
		messages: ['Thuộc tính phải là một mảng', 'Attributes must be array of fields.'],
	},
	getInfoError: {
		code: 1415,
		messages: ['Lỗi lấy thông tin', 'Get info error.'],
	},

	getInfoNoPermision: {
		code: 1416,
		messages: ['Bạn không có quyền đối với nội dung này', 'You not have permision to access this resource.'],
	},
	permisionInfoError: {
		code: 1416,
		messages: ['Quá trình kiểm tra quyền truy cập dữ liệu bị lỗi', 'Error when check permision.'],
	},

	crudSuccess: {
		code: 1402,
		messages: [
			'Tạo hoặc sửa thành công. Nhưng có lỗi xả ra.',
			'Create or modified successful. But something error on server.',
		],
	},
	crudError: {
		code: 1403,
		messages: ['Tạo hoặc sửa xảy ra lỗi', 'Create or modified fail.'],
	},
	upsertError: {
		code: 1403,
		messages: ['Tạo hoặc sửa xảy ra lỗi', 'Create or modified fail.'],
	},
	crudInfo: {
		code: 1404,
		messages: ['Lỗi lấy thông tin sau khi tạo hoặc sửa', 'Get info error.'],
	},
	crudExisted: {
		code: 1405,
		messages: ['Bản ghi đã tồn tại', 'Record is existed.'],
	},
	paramError: {
		code: 1406,
		messages: ['Định dạng gửi đi không đúng', 'Format request is invalid.'],
	},
	bodyError: {
		code: 1407,
		messages: ['Định dạng gửi đi không đúng', 'Format request body is invalid.'],
	},
	crudNoProcess: {
		code: 1409,
		messages: [
			'Không có thay đổi so với bản ghi trước đó.',
			'Changed value is the same previous. Nothing updated.',
		],
	},
	crudNotExisted: {
		code: 1410,
		messages: ['Bản ghi không tồn tại', 'Record is not existed.'],
	},
	crudSiteNotExisted: {
		code: 1411,
		messages: ['Site này không tồn tại', 'Site is not existed.'],
	},
	deleteSuccess: {
		code: 1412,
		messages: ['Xóa thành công, nhưng có lỗi xảy ra.', 'Delete successful. But something error on server.'],
	},
	deleteError: { code: 1413, messages: ['Lỗi khi xóa', 'Delete fail.'] },
	deleteId: {
		code: 1414,
		messages: ['Trường [id] bị thiếu hoặc sai định dạng', 'Invalid or missing [id].'],
	},

	sslError: {
		code: 1416,
		messages: ['Key và giá trị Certificate không khớp', 'Verify key and certificate ssl false.'],
	},
	sqlError: { code: 1417, messages: ['Lỗi truy vấn SQL', 'SQL query error.'] },
	typeSQLError: {
		code: 1418,
		messages: ['Kiểu truy vấn SQL sai', 'Type of SQL query error.'],
	},

	// create site
	loginPassError: {
		code: 1001,
		messages: ['Tài khoản hoặc mật khẩu không đúng', 'Mật khẩu không đúng', 'Invalid or missing [siteName].'],
	},
	userNotFoundError: {
		code: 1002,
		messages: ['Tài khoản hoặc mật khẩu không đúng', 'Tài khoản không tồn tại', 'Invalid or missing [uri].'],
	},
	userInactiveError: {
		code: 1003,
		messages: ['Tài khoản bị vô hiệu hóa', 'Invalid or missing [uri].'],
	},
	loginError: {
		code: 1004,
		messages: ['Đăng nhập thất bại', 'Invalid or missing [siteName].'],
	},
	success: {
		code: 1000,
		messages: ['OK'],
	},
	postNotExisted: {
		code: 9992,
		messages: ['Bài viết này không tồn tại'],
	},
	codeVerifyIncorrect: {
		code: 9993,
		messages: ['Mã xác thực không đúng'],
	},
	noDataOrEndOfListData: {
		code: 9994,
		messages: ['Không có dữ liệu hoặc không còn dữ liệu'],
	},
	userIsNotValidated: {
		code: 9995,
		messages: ['Không có người dùng này'],
	},
	userExisted: {
		code: 9996,
		messages: ['Người dùng đã tồn tại'],
	},
	methodIsInvalid: {
		code: 9997,
		messages: ['Phương thức không đúng'],
	},
	tokenIsInvalid: {
		code: 9998,
		messages: ['Sai token'],
	},
	canNotConnectToDB: {
		code: 1001,
		messages: ['Lỗi mất kết nối DB hoặc thực thi câu SQL'],
	},
	parameterIsNotEnought: {
		code: 1002,
		messages: ['Số lượng Parameter không đầy đủ'],
	},
	parameterTypeIsInvalid: {
		code: 1003,
		messages: ['Kiểu tham số không đúng đắn'],
	},
	parameterValueIsInvalid: {
		code: 1004,
		messages: ['Giá trị của tham số không hợp lệ'],
	},
	unknownError: {
		code: 1005,
		messages: ['Unknown error'],
	},
	fileSizeIsTooBig: {
		code: 1006,
		messages: ['Cỡ file vượt mức cho phép'],
	},
	uploadFileFaild: {
		code: 1007,
		messages: ['Upload thất bại'],
	},
	maximumNumberOfImages: {
		code: 1008,
		messages: ['Số lượng image vượt quá quy định'],
	},
	notAccess: {
		code: 1009,
		messages: ['Không có quyền truy cập tài nguyên'],
	},
	actionHasBeenDonePreviouslyByThisUser: {
		code: 1010,
		messages: ['Hành động đã được người dùng thực hiện trước đây '],
	},
};
