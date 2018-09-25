const KafkaClient = require('@qiot/qiot-io-kafka');

const { ENV: { ZOOKEEPER_URL } } = require('../config');

const client = new KafkaClient({
  zookeeperUrl: ZOOKEEPER_URL
});

const produce = ({ topic, messages }) => client
  .getKafkaProducer()
  .then(() => client
    .produce(topic, messages));

const consume = ({ topic, callback }) => client
  .consume(topic, callback);

module.exports = {
  produce,
  consume
};
