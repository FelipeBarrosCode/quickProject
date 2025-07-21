const { gql } = require('apollo-server-express');
const typeDefs = gql`
type Flight {
id: ID!
from: String!
to: String!
airline: String!
price: Float!
departureTime: String!
}
type Query {
flights(from: String, to: String): [Flight]
flight(id: ID!): Flight
}
type Mutation {
addFlight(
from: String!
to: String!
airline: String!
price: Float!
departureTime: String!
): Flight
deleteFlight(id: ID!): Flight
}
`;


module.exports = typeDefs;