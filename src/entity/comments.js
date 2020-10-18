/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'comments',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				field: 'id',
            },
            content: {
				type: DataTypes.STRING(500),
				allowNull: false,
				field: 'content',
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
            createAt: {
				type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
				field: 'create_at',
			},
		},
		{
			tableName: 'comments',
			timestamps: false,
		}
	);
};
