/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'messages',
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
            isBlock: {
				type: DataTypes.BOOLEAN,
                defaultValue: false,
				field: 'isBlock',
			}
		},
		{
			tableName: 'messages',
			timestamps: false,
		}
	);
};
