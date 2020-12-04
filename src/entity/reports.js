/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'reports',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				field: 'id',
            },
            type: {
				type: DataTypes.STRING(500),
				allowNull: false,
				field: 'type',
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
			}
		},
		{
			tableName: 'reports',
			timestamps: false,
		}
	);
};
