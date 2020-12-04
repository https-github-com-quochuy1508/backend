/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'likes',
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
		},
		{
			tableName: 'likes',
			timestamps: false,
		}
	);
};
