import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { KaConfig } from '.';

export default class KafkaClient {
    _config: KaConfig;
    _producer: Producer;
    _init: boolean = false;
    
    constructor(config: KaConfig) {
        this._config = config;
        let kafka:Kafka = new Kafka({
            brokers: config.bootstrap_servers.split(","),
          })

        this._producer = kafka.producer()

        process.on('exit', () => {
           this.disconnect();
        });
    }

    disconnect() {
        this._producer.disconnect();
    }

    send(msg: Object) {
        this._producer.connect().then(()=>{
            this._producer.send({topic: this._config.topic, messages:  [{value: JSON.stringify(msg)}]})
        })
    }
}