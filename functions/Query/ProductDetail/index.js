/* eslint-disable max-len */
const {GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList} = require("graphql");
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
    additional_product_image: {
      // eslint-disable-next-line new-cap
      type: GraphQLList(GraphQLString),
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
        additional_product_image: [fakeDatabase[findProducts].product_image, "https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/4/1/cfaf69e2-48ba-4e96-96b2-a50037323a8f.jpg", "https://images.tokopedia.net/img/cache/250-square/VqbcmM/2021/3/30/998dcc9c-2529-411c-920a-fe5d2d866b21.jpg.webp?ect=4g"],
      };
    }
    return {
      product_id: 0,
      product_price: 0,
      product_price_format: "",
      product_name: "",
      product_description: "",
      product_image: "",
      additional_product_image: [],
    };
  },
};

module.exports=GetProductDetail;
