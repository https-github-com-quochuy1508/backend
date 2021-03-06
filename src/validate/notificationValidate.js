import ValidateJoi, { noArguments } from '../utils/validateJoi';
import viMessage from '../locates/vi';
import { sequelize } from '../db/db';
import regexPattern from '../utils/regexPattern';

const DEFAULT_SCHEMA = {
    type: ValidateJoi.createSchemaProp({
        number: noArguments,
        label: viMessage['api.notifications.type'],
        integer: noArguments,
    }),
    objectId: ValidateJoi.createSchemaProp({
        number: noArguments,
        label: viMessage['api.notifications.objectId'],
        integer: noArguments,
    }),
    title: ValidateJoi.createSchemaProp({
        string: noArguments,
        label: viMessage['api.notifications.title'],
    }),
    userId: ValidateJoi.createSchemaProp({
        number: noArguments,
        label: viMessage['api.notifications.userId'],
        integer: noArguments,
    }),
    isGroup: ValidateJoi.createSchemaProp({
        label: viMessage['api.notifications.isGroup'],
    }),
    isRead: ValidateJoi.createSchemaProp({
        label: viMessage['api.notifications.isRead'],
    }),
    avatar: ValidateJoi.createSchemaProp({
        string: noArguments,
        label: viMessage['api.notifications.avatar'],
    })
};

export default {
    authenCreate: (req, res, next) => {
        console.log('Validate Create Notifications');

        const { type, objectId, title, userId, avatar, isGroup, isRead } = req.body; // userId từ local  input data => content
        const notification = { type, objectId, title, userId, avatar, isGroup, isRead };

        const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
            type: {
                required: noArguments,
            },
            objectId: {
                required: noArguments,
            },
            title: {
                max: 500,
            },
            userId: {
                required: noArguments,
            },
            isGroup: {
                required: noArguments,
            },
            isRead: {
                required: noArguments,
            },
            avatar: {
                max: 100,
            },
        });

        ValidateJoi.validate(notification, SCHEMA)
            .then((data) => {
                res.locals.body = data;
                next();
            })
            .catch((error) => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
    },

    authenUpdate: (req, res, next) => {
        console.log('Validate Update Notification');

        const { isRead } = req.body;
        const notification = { isRead };

        const SCHEMA = ValidateJoi.assignSchema(DEFAULT_SCHEMA, {
            isRead: {
                required: noArguments,
            },
        });

        ValidateJoi.validate(notification, SCHEMA)
            .then((data) => {
                res.locals.body = data;
                next();
            })
            .catch((error) => next({ ...error, message: 'Định dạng gửi đi không đúng' }));
    },

    authenFilter: (req, res, next) => {
        const { filter, sort, range } = req.query;

        res.locals.sort = sort
            ? JSON.parse(sort).map((e, i) => (i === 0 ? sequelize.literal(`\`${e}\``) : e))
            : ['id', 'desc'];
        res.locals.range = range ? JSON.parse(range) : [0, 49];

        console.log('res.locals: ', res.locals);

        res.locals.filter = {};
        next();
    },
};
