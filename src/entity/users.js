/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'users',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				field: 'id',
			},
			telephone: {
				type: DataTypes.STRING(12),
				allowNull: false,
				field: 'telephone',
			},
			name: {
				type: DataTypes.STRING(30),
				allowNull: false,
				field: 'name',
			},
			password: {
				type: DataTypes.STRING(12),
				allowNull: false,
				field: 'password',
			},
			uuid: {
				type: DataTypes.STRING(12),
				allowNull: false,
				field: 'uuid',
			},
			avatar: {
				type: DataTypes.STRING(500),
				allowNull: true,
				field: 'avatar',
				defaultValue:
					'https://i1.wp.com/www.labelprint.co.za/wp-content/uploads/2018/11/user-icon-image-placeholder-300-grey.jpg?w=300&ssl=1',
			},
			avatarCover: {
				type: DataTypes.STRING(500),
				allowNull: true,
				field: 'avatar_cover',
				defaultValue:
					'https://i1.wp.com/www.labelprint.co.za/wp-content/uploads/2018/11/user-icon-image-placeholder-300-grey.jpg?w=300&ssl=1',
			},
			countFriends: {
				type: DataTypes.BIGINT,
				allowNull: true,
				field: 'count_friends',
			},
			birthday: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
				field: 'birthday',
			},
		},
		{
			tableName: 'users',
			timestamps: false,
		}
	);
};
