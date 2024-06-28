
var log4js = require('log4js');
var path = require('path')
log4js.configure({
    appenders: {
        mycat: {
            type: path.resolve("dist/index.js"),
            bootstrap_servers: "localhost:9092",
            topic: "test-log-topic",
            converter: (loggingEvent) => {
                return {
                    message: `${loggingEvent.data[0]}`,
                    timestamp: loggingEvent.startTime,
                };
            }
        },
    },
    categories: { default: { appenders: ['mycat'], level: "debug" } },
});

const logger2 = log4js.getLogger('test');

logger3.info("1")
logger3.info("2")
logger3.info("3")

