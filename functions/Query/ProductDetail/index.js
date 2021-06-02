const {GraphQLInt} = require("graphql");
const {GraphQLObjectType} = require("graphql");

const productDetailType = new GraphQLObjectType({
  name: "ProductDetail",
  fields: {
    product_id: {
      type: GraphQLInt,
    },
    product_price: {
      type: GraphQLInt,
    },
  },
});

const GetProductDetail = {
  type: productDetailType,
  resolve: () => {
    return {
      product_id: 1,
      product_price: 5000,
    };
  },
};

module.exports=GetProductDetail;
