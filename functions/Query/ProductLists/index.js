const {GraphQLInt} = require("graphql");
const {GraphQLString} = require("graphql");
const {GraphQLBoolean} = require("graphql");
const {GraphQLList} = require("graphql");
const {GraphQLObjectType} = require("graphql");
const fakeDatabase = require("../../FakeDB");

// const currentOffset = 0;

const arrayOfProducts = new GraphQLObjectType({
  name: "ArrayOfProducts",
  fields: {
    product_id: {
      type: GraphQLInt,
    },
    product_price: {
      type: GraphQLInt,
    },
    product_price_format: {
      type: GraphQLString,
    },
    product_name: {
      type: GraphQLString,
    },
    rating: {
      type: GraphQLString,
    },
    product_image: {
      type: GraphQLString,
    },
    product_slug: {
      type: GraphQLString,
    },
  },
});

const productType = new GraphQLObjectType({
  name: "ProductData",
  fields: {
    data: {
      // eslint-disable-next-line new-cap
      type: GraphQLList(arrayOfProducts),
    },
    offset: {
      type: GraphQLInt,
    },
    hasNext: {
      type: GraphQLBoolean,
    },
  },
});

const GetProductLists = {
  type: productType,
  args: {
    limit: {
      type: GraphQLInt,
    },
    offset: {
      type: GraphQLInt,
    },
  },
  resolve: (_, {limit, offset}) => {
    if (limit === undefined && offset === undefined) {
      return {
        data: fakeDatabase,
      };
    }
    if (offset + limit -1 > fakeDatabase.length) {
      return {
        data: [],
      };
    }
    return {
      data: fakeDatabase.filter((x, y)=>{
        return y >= offset && y<= offset + limit - 1;
      }),
    };
  },
};

module.exports = GetProductLists;
