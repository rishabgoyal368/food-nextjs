import cartModel from "@/app/(backend)/model/CartModel";
import ProductModel from "@/app/(backend)/model/ProductModel";
import UserModel from "@/app/(backend)/model/UserModel";
import { auth } from "@/app/auth";
import dbConnect from "@/lib/dbConnect";
import { makeResponse } from "@/lib/makeResponse";


export async function POST(request) {
    await dbConnect();
    try {
      const auths = await auth();
      const { productId, qty } = await request.json();
      const email = auths.email;
  
      const userDetails = await UserModel.findOne({ email });
      if (!userDetails) return makeResponse(false, "User not found", [], 400);
  
      const productDetails = await ProductModel.findById(productId);
      if (!productDetails) return makeResponse(false, "Product not found", [], 400);
  
      let userCart = await cartModel.findOne({ userId: userDetails._id });
  
      if (userCart) {
        const existingProductIndex = userCart.productId.findIndex(
          (item) => item.productId.toString() === productId
        );
  
        if (existingProductIndex !== -1) {
          userCart.productId[existingProductIndex].qty = qty;
        } else {
          userCart.productId.push({ productId, qty });
        }
  
        userCart.totalPrice = userCart.productId.reduce((total, item) => {
          const product = item.productId.toString() === productId ? productDetails : null;
          return product ? total + product.price * item.qty : total;
        }, 0);
  
        await userCart.save();
        return makeResponse(true, "Cart updated successfully", {}, 200);
      } else {
        await cartModel.create({
          userId: userDetails._id,
          totalPrice: productDetails.price * qty,
          productId: [{ productId, qty }],
        });
        return makeResponse(true, "Cart created successfully", {}, 200);
      }
    } catch (error) {
      console.error("Error in adding to cart:", error);
      return makeResponse(false, "Failed to add to cart", {}, 400);
    }
}

export async function GET(request){
    try {
        const auths = await auth();
        const email = auths.email;
        const userDetails = await UserModel.findOne({ email });
        if (!userDetails) return makeResponse(false, "User not found", [], 400);
        // const cartDetails = await cartModel.find({'userId': userDetails?._id});
        const cartDetails = await cartModel.findOne({ userId: userDetails._id }).populate({
            path: "productId.productId",
            model: ProductModel,
          });
      
        return makeResponse(true, "Cart fetched successfully", cartDetails, 200);
    } catch (error) {
        console.error("Error in adding to cart:", error);
        return makeResponse(false, "Failed to fetch cart", {}, 400);
    }
}

export async function DELETE(request){
    try {
        const auths = await auth();
        const email = auths.email;
        const { productId } = await request.json();
        const userDetails = await UserModel.findOne({ email });
        if (!userDetails) return makeResponse(false, "User not found", [], 400);
        let userCart = await cartModel.findOne({ userId: userDetails._id }).populate({
            path: "productId.productId",
            model: ProductModel,
        });

        let cartProducts = userCart.productId.filter((product) => product.productId._id.toString() !== productId);

        if(cartProducts.length == 0) {
            await cartModel.deleteOne({ _id: userCart._id });
        }else{
            userCart.productId = cartProducts;
            userCart.totalPrice = cartProducts.reduce((total, item) => {
                return total + item.qty * item.productId.price; 
            }, 0); 
            userCart.save();
        }
        return makeResponse(true, "Cart deleted successfully", {}, 200);
    } catch (error) {
        console.error("Error in adding to cart:", error);
        return makeResponse(false, "Failed to fetch cart", {}, 400);
    }
}
  
  