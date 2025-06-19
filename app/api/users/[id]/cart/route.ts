import { products } from "@/app/product-data";
import { NextRequest } from "next/server";

type shoppingCart = Record<string, string[]>;

const carts: shoppingCart = {
  '1': ['123', '234'],
  '2': ['345', '456'],
  '3': ['234']
}

type Params = {
  id: string;
}

//load cart
export async function GET(request: NextRequest, {params} : { params: Params }) {
    const { id: userId } = params;
  
    const productIds = carts[userId];
  
    if (!productIds) {
      return new Response(JSON.stringify({ error: "User cart not found" }), { status: 404 });
    }
  
    const cartProducts = productIds.map(id => products.find(p => p.id === id));
  
    return new Response(JSON.stringify(cartProducts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

type CartBody = {
    productId: string;
}

//add to cart
export async function POST(request: NextRequest, {params} : { params: Params }){
    const userId = params.id;
    const body: CartBody = await request.json();
    const productId  = body.productId;

    carts[userId] = carts[userId] ? carts[userId].concat(productId) : [productId];

    const cartProducts = carts[userId].map(id => products.find(p => p.id === id));

    return new Response(JSON.stringify({ message: "Product added to cart" }), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
        });

}
  
//remove from cart
export async function DELETE(request: NextRequest, {params} : { params}){
    const userId = params.id;
    const body = await request.json();
    const productId = body.productId;

    carts[userId] = carts[userId] ? carts[userId].filter(pid => pid !== productId) : [];
    const cartProducts = carts[userId].map(id => products.find(p => p.id === id));


    return new Response(JSON.stringify(cartProducts), {
        status: 202,
        headers: {
            'Content-Type': 'application/json'
        }
    });


}