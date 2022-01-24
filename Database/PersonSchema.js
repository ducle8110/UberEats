const Realm = require('realm');

const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    cars: {type: 'list', objectType: 'Car'},
  },
};

export default new Realm({schema: [PersonSchema]});
