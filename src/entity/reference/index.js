export default (models) => {
	const { users, posts } = models;

	// users
	// users.belongsToMany(courses, {
	//   through: userCourse,
	//   foreignKey: "usersId",
	//   as: "courses",
	// });
	posts.belongsTo(users, { as: 'users', foreignKey: 'userId' });

	// // topics
	// topics.hasMany(categories, { as: "categories", foreignKey: "topicsId" });

	// // categories
	// categories.belongsTo(topics, { as: "topics", foreignKey: "topicsId" });
	// categories.hasMany(courses, { as: "courses", foreignKey: "categoriesId" });

	// // course
	// courses.hasMany(weeks, { as: "weeks", foreignKey: "coursesId" });

	// courses.belongsTo(categories, {
	//   as: "categories",
	//   foreignKey: "categoriesId",
	// });
	// courses.belongsTo(skills, { foreignKey: "skillsId", as: "skills" });
	// courses.belongsTo(users, { foreignKey: "creatorsId", as: "creators" });
	// courses.belongsTo(languages, { foreignKey: "languagesId", as: "languages" });
	// courses.belongsTo(jobs, { foreignKey: "jobsId", as: "jobs" });
	// courses.belongsToMany(users, {
	//   through: userCourse,
	//   foreignKey: "coursesId",
	//   as: "users",
	// });

	// // // courseWeeks
	// // courseWeeks.belongsTo(weeks, { as: "weeks", foreignKey: "weeksId" });
	// // courseWeeks.belongsTo(courses, { as: "courses", foreignKey: "coursesId" });

	// //weeks
	// // weeks.hasMany(courseWeeks, { as: "courseWeeks", foreignKey: "weeksId" });
	// weeks.hasMany(videoWeek, { as: "videoWeek", foreignKey: "weeksId" });
	// weeks.belongsTo(courses, { foreignKey: "coursesId", as: "courses" });

	// //videoWeek
	// videoWeek.belongsTo(weeks, { as: "weeks", foreignKey: "weeksId" });

	// // userCourse
	// userCourse.belongsTo(users, { as: "users", foreignKey: "usersId" });
	// userCourse.belongsTo(courses, { as: "courses", foreignKey: "coursesId" });
};
