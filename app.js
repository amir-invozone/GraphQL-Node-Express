var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var users = [
    {
        id: 1,
        name: 'Brian',
        age: '21',
        jobs: {
            company: 'Invozone',
            duration: '1 Year'
        }
    },
    {
        id: 2,
        name: 'Kim',
        age: '22',
        jobs: {
            company: 'Ranglerz',
            duration: '3 Years'
        }
    },
    {
        id: 3,
        name: 'Faith',
        age: '23',
        jobs: {
            company: 'Freelancing',
            duration: '2 Years'
        }
    },
    {
        id: 4,
        name: 'Joseph',
        age: '23',
        jobs: {
            company: 'N/A',
            duration: 'N/A'
        }
    },
    {
        id: 5,
        name: 'Joy',
        age: '25',
        jobs: {
            company: 'Test',
            duration: '10 Year'
        }
    }
];

var getUser = function (args) {
    var userID = args.id;
    return users.filter(user => user.id == userID)[0];
}

var schema = buildSchema(`
  type Query {
    user(id: Int): Person
  },

  type Person {
    id: Int
    name: String
    age: Int
    shark: String
    jobs: Experience
  },

  type Experience {
      company: String
      duration: String
  }
`);

var root = {
    user: getUser
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
