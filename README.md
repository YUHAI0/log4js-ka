# LOG4JS KAFKA APPENDER

Just one of thoese Kafka appenders for log4js, but the most newly

## Install

```bash
npm install --save log4js-ka
```

## Usage

```javascript
var log4js = require('log4js');
log4js.configure({
    appenders: {
        mycat: {
            type: "log4js-ka",
            bootstrap_servers: "localhost:9092",
            topic: "test-log-topic",
            converter: (loggingEvent) => {
                return {
                    message: `${loggingEvent.data[0]}`,
                    timestamp: loggingEvent.startTime,
                };
            }
        }
    },
    categories: { default: { appenders: ["mycat"], level: "debug" } },
});

const logger = log4js.getLogger('test');
logger.info("hello log4js-ka");
```

## config

* bootstrap_servers: kafka bootstrap servers, for example: "kafak1:9092,kafka2:9092"
* topic: the topic to send, no default, must config one.
* converter: custom logging event converter for customizing your data

--------------------------------------

Developed by me.yuhai@gmail.com