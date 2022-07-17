const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {

        //get a user by username
        me: async (parent, args, context) => {

            if(context.user) {
                const userData = await User.findOne({})
                .select('-__v -password')
                .populate('books')
            
                return userData;
            }

            throw new AuthenticationError('Not logged in')

        },

    },

    Mutation: {

        //create a user name
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return {token, user};
        },

        //using the right pw helps log you into the site; requires the right pw
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect information');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect information');
            }

            const token = signToken(user);
            return {token, user};
        },

        //how a savebook gets logged
        saveBook: async (parent, args, context) => {
            if (context.user) {
          
             const updatedUser =  await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input } },
                { new: true }
              );
          
            return updatedUser;
            }
          
            throw new AuthenticationError('Please log-in to continue!');
        },


        //how a removedbook gets un-logged
        removeBook: async (parent, args, context) => {
            if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );

            return updatedUser;
            }

            throw new AuthenticationError('Please log-in to continue!!');
        }
    }
};

module.exports = resolvers;