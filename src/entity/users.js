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
				type: DataTypes.STRING(100),
				allowNull: true,
				field: 'avatar',
			},
			avatarCover: {
				type: DataTypes.STRING(100),
				allowNull: true,
				field: 'avatar_cover',
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
