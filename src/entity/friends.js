/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'friends',
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
            friendId: {
				type: DataTypes.BIGINT,
				allowNull: false,
				field: 'friend_id',
			},
            createAt: {
				type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
				field: 'create_at',
            },
            status: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'status',
            },
		},
		{
			tableName: 'friends',
			timestamps: false,
		}
	);
};
