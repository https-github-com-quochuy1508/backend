export default (models) => {
	const { users, posts, media, comments, likes, friends, blacklist } = models;

	// MEDIA
	posts.belongsTo(users, { as: 'users', foreignKey: 'userId' });
	posts.hasMany(media, { as: 'media', foreignKey: 'postId' });

	// MEDIA
	media.belongsTo(users, { as: 'users', foreignKey: 'userId' });
	media.belongsTo(posts, { as: 'posts', foreignKey: 'postId' });

	// COMMENT
	comments.belongsTo(posts, { as: 'posts', foreignKey: 'postId' });
	comments.belongsTo(users, { as: 'users', foreignKey: 'userId' });

	// LIKE
	likes.belongsTo(posts, { as: 'posts', foreignKey: 'postId' });
	likes.belongsTo(users, { as: 'users', foreignKey: 'userId' });
	
	// COMMENT
	friends.belongsTo(users, { as: 'users', foreignKey: 'userId' });
	
	// BLACKLIST
	blacklist.belongsTo(users, { as: 'userOne', foreignKey: 'userOneId' });
	blacklist.belongsTo(users, { as: 'userTwo', foreignKey: 'userTwoId' });
};
