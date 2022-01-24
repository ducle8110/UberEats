const Realm = require('realm');

const CarSchema = {
  name: 'Car',
  properties: {
    make: 'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  },
};

export default new Realm({schema: [CarSchema]});
