// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type Book {
        _id: ID
        authors: [String]
        description: String
        bookID: String
        image: String
        forSale: String
        link: String
        title: String
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    input SavedBookInput {
        _id: ID
        authors: [String]
        description: String
        bookID: String
        image: String
        forSale: String
        link: String
        title: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: SavedBookInput): User
        removerBook(bookID: String!): User
    }

`;

// export the typeDefs
module.exports = typeDefs;