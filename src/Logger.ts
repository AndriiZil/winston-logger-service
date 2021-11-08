import * as dotenv from 'dotenv';
const { createLogger, format, transports } = require('winston');

dotenv.config();

const winstonTransports = [
    new transports.File({
        filename: 'error.log',
        level: 'error'
    }),
    new transports.File({
        filename: 'combined.log'
    }),
    new transports.Console({
        level: 'info',
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    })
]

const winstonOptions = {
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.colorize(),
    ),
    defaultMeta: { service: 'user-service' },
    transports: winstonTransports,
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' })
    ],
    rejectionHandlers: [
        new transports.File({ filename: 'rejections.log' })
    ]
};

const logger = createLogger(winstonOptions);

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.timestamp(),
            format.json(),
        ),
    }));
}

export default logger;
