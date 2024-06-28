/**
 * Log4js Kafka appender
 * 
 */
import KafkaClient from './kafka-client';

export class KaConfig {
    topic: string;
    bootstrap_servers: string;
    converter: (loggingEvent: any) => {};
    constructor(topic: string, bootstrap_servers: string, converter: ()=>{}) {
        this.topic = topic
        this.bootstrap_servers = bootstrap_servers;
        this.converter = converter;
    }
}

function defaultLoggingEventConverter(loggingEvent: any) {
    return {
        data: loggingEvent.data,
        level: loggingEvent.level.levelStr,
        startTime: loggingEvent.startTime,
        categoryName: loggingEvent.categoryName
    };
}

function appender(config: KaConfig) {

    if (!config.topic) {
        return (loggingEvent: any) => {
            // nothing to do
        }
    } else {
        let converter = config.converter? config.converter : defaultLoggingEventConverter;
        const client = new KafkaClient(config);

        return (loggingEvent: any) => {
            client.send(converter(loggingEvent));
        };
    }
}

export function configure(config: KaConfig) {
    return appender(config);
}