/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'posts',
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
			content: {
				type: DataTypes.STRING(500),
				allowNull: true,
				field: 'content',
			},
			createAt: {
				type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
				field: 'create_at',
            },
		},
		{
			tableName: 'posts',
			timestamps: false,
		}
	);
};
