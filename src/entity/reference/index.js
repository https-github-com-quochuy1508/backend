export default (models) => {
	const { users, posts, media } = models;

	// MEDIA
	posts.belongsTo(users, { as: 'users', foreignKey: 'userId' });
	posts.hasMany(media, { as: 'media', foreignKey: 'postId' });

	// MEDIA
	media.belongsTo(users, { as: 'users', foreignKey: 'userId' });
	media.belongsTo(posts, { as: 'posts', foreignKey: 'postId' });
};
