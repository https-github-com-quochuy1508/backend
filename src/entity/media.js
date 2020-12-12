/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'media',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				field: 'id',
			},
			userId: {
				type: DataTypes.BIGINT,
				allowNull: false,
				field: 'user_id',
			},
			postId: {
				type: DataTypes.BIGINT,
				allowNull: false,
				field: 'post_id',
			},
			path: {
				type: DataTypes.STRING(100),
				allowNull: false,
				field: 'path',
			},
			type: {
				type: DataTypes.STRING(50),
				allowNull: false,
				field: 'type',
			},
		},
		{
			tableName: 'media',
			timestamps: false,
		}
	);
};
