export  function  Loadcard(){

    const cart = localStorage.getItem("cart");

    if(cart != null){
        return JSON.parse(cart);
    }
    else{
        return []
    }
}

export function Addtocart(productId, qty) {
    const cart = Loadcard();
  
    const index = cart.findIndex(
      (item) => item.productId === productId
    );
  
    if (index === -1) {
      cart.push({ productId, qty });
    } else {
      const newQty = cart[index].qty + qty;
      if (newQty <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].qty = newQty; // ✅ Use newQty instead of overwriting
      }
    }
  
    Savecart(cart);
  }
  
export function Savecart(cart){
    localStorage.setItem("cart",JSON.stringify(cart));
}

export function clearcard(){
    localStorage.removeItem("cart")
}

export function Deletecart(productId) {
    const cart = Loadcard();
    const updatedCart = cart.filter(item => item.productId !== productId);
    Savecart(updatedCart);
  }

