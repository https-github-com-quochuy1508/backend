export default (models) => {
	const { users, posts, media, comments, likes, friends, blacklist, reports, messages } = models;

	// MEDIA
	posts.belongsTo(users, { as: 'users', foreignKey: 'userId' });
	posts.hasMany(media, { as: 'media', foreignKey: 'postId' });
	posts.hasMany(likes, { as: 'likes', foreignKey: 'postId' });
	posts.hasMany(comments, { as: 'comments', foreignKey: 'postId' });

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
	friends.belongsTo(users, { as: 'me', foreignKey: 'userId' });
	friends.belongsTo(users, { as: 'you', foreignKey: 'friendId' });

	// BLACKLIST
	blacklist.belongsTo(users, { as: 'userOne', foreignKey: 'userOneId' });
	blacklist.belongsTo(users, { as: 'userTwo', foreignKey: 'userTwoId' });

	// REPORT
	reports.belongsTo(posts, { as: 'posts', foreignKey: 'postId' });
	reports.belongsTo(users, { as: 'users', foreignKey: 'userId' });

	// MESSAGE
	messages.belongsTo(users, { as: 'userOne', foreignKey: 'userOneId' });
	messages.belongsTo(users, { as: 'userTwo', foreignKey: 'userTwoId' });

	// FRIENDS
	users.hasMany(friends, { as: 'friends', foreignKey: 'userId' });
	users.hasMany(posts, { as: 'posts', foreignKey: 'userId' });
};
