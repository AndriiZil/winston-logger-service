import logger from './Logger';

logger.log({
    level: 'info',
    message: 'Hello distributed log files!'
});

logger.info('Hello again distributed logs');

logger.error('Error: some problem in code');
