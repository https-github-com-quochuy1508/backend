/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'notifications',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				field: 'id',
			},
			type: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'type',
			},
			objectId: {
				type: DataTypes.BIGINT,
				allowNull: false,
				field: 'object_id',
            },
            title: {
				type: DataTypes.STRING(500),
				allowNull: true,
				field: 'title',
            },
            userId: {
				type: DataTypes.BIGINT,
				allowNull: false,
				field: 'user_id',
			},
			createAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				field: 'create_at',
            },
            avatar: {
				type: DataTypes.STRING(100),
				allowNull: true,
				field: 'avatar',
            },
            isGroup: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
				field: 'isGroup',
            },
            isRead: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
				field: 'isRead',
            },
            lastUpdate: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				field: 'last_update',
            },
            badge: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'badge',
			},
		},
		{
			tableName: 'notifications',
			timestamps: false,
		}
	);
};
