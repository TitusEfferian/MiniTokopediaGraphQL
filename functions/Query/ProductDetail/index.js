/* eslint-disable max-len */
const {GraphQLInt, GraphQLString} = require("graphql");
const {GraphQLObjectType} = require("graphql");
const fakeDatabase = require("../../FakeDB");

const productDetailType = new GraphQLObjectType({
  name: "ProductDetail",
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
    product_description: {
      type: GraphQLString,
    },
    product_image: {
      type: GraphQLString,
    },
  },
});

const GetProductDetail = {
  type: productDetailType,
  args: {
    productId: {
      type: GraphQLInt,
    },
  },
  resolve: (_, {productId}) => {
    const findProducts = fakeDatabase.findIndex((x)=>x.product_id === productId);
    if (findProducts > -1) {
      return {
        product_id: fakeDatabase[findProducts].product_id,
        product_price: fakeDatabase[findProducts].product_price,
        product_price_format: fakeDatabase[findProducts].product_price_format,
        product_name: fakeDatabase[findProducts].product_name,
        product_description: "this is a product description",
        product_image: fakeDatabase[findProducts].product_image,
      };
    }
    return {
      product_id: 0,
      product_price: 0,
      product_price_format: "",
      product_name: "",
      product_description: "",
      product_image: "",
    };
  },
};

module.exports=GetProductDetail;
