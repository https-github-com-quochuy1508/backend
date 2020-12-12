/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'blacklist',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				field: 'id',
			},
			userOneId: {
				type: DataTypes.BIGINT,
				allowNull: false,
				field: 'user_one_id',
			},
			userTwoId: {
				type: DataTypes.BIGINT,
				allowNull: false,
				field: 'user_two_id',
			},
			createAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				field: 'create_at',
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
				field: 'status',
			},
		},
		{
			tableName: 'blacklist',
			timestamps: false,
		}
	);
};
