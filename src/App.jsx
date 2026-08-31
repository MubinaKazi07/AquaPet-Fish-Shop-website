import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from"./Pages/AdminDashboard";
import AddProducts from "./Pages/AddProducts";
import Product from "./Pages/Product";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
import OrderSuccess from "./Pages/OrderSuccess";
import ManageProducts from "./Pages/ManageProducts";
import {ToastContainer,toast,Slide} from "react-toastify";
import {useLocation} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
 
  const [cart, setCart] = useState([]);
  const [cartSessionId] = useState(() => {
    const existingId = Cookies.get("cartSessionId");
    const sessionId = existingId || `cart-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    if (!existingId) Cookies.set("cartSessionId", sessionId, { expires: 30 });
    return sessionId;
  });
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`https://6a4a0bc3edfa6a2b5fd784a6.mockapi.io/users?type=cart&sessionId=${cartSessionId}`)
      .then(({ data }) => setCart(data.map(({ id, ...product }) => ({ ...product, quantity: Number(product.quantity) || 1, cartItemId: id }))))
      .catch(() => setCart([]))
      .finally(() => setCartLoaded(true));
  }, [cartSessionId]);

  const addToCart = async (product) => {
    if (!cartLoaded) return;
    const existingItem = cart.find((item) => item.id && product.id ? item.id === product.id : item.name === product.name);

    if (existingItem) {
      const quantity = (Number(existingItem.quantity) || 1) + 1;
      await axios.patch(`https://6a4a0bc3edfa6a2b5fd784a6.mockapi.io/users/${existingItem.cartItemId}`, { quantity });
      setCart((currentCart) => currentCart.map((item) => item.cartItemId === existingItem.cartItemId ? { ...item, quantity } : item));
      return;
    }

    const productData = { ...product };
    const { data } = await axios.post("https://6a4a0bc3edfa6a2b5fd784a6.mockapi.io/users", {
      ...productData,
      quantity: 1,
      type: "cart",
      sessionId: cartSessionId,
    });
    setCart((currentCart) => [...currentCart, { ...productData, quantity: 1, cartItemId: data.id }]);
  };

  const updateCartQuantity = async (item, quantity) => {
    if (quantity < 1) {
      await removeFromCart(item, cart.indexOf(item));
      return;
    }
    setCart((currentCart) => currentCart.map((cartItem) => cartItem.cartItemId === item.cartItemId ? { ...cartItem, quantity } : cartItem));
    if (item.cartItemId) {
      await axios.patch(`https://6a4a0bc3edfa6a2b5fd784a6.mockapi.io/users/${item.cartItemId}`, { quantity });
    }
  };

  const removeFromCart = async (item, index) => {
    if (item.cartItemId) {
      await axios.delete(`https://6a4a0bc3edfa6a2b5fd784a6.mockapi.io/users/${item.cartItemId}`);
    }
    setCart((currentCart) => currentCart.filter((_, itemIndex) => itemIndex !== index));
  };

const location = useLocation();

const isAdminPage =
  location.pathname === "/admindashboard" ||
  location.pathname === "/manageproducts" ||
  location.pathname === "/addproducts";

  return (
    <>
     <Navbar cart={cart}/>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/product" element={<Product cart={cart} setCart={setCart} onAddToCart={addToCart} />} />
        <Route path="/manageproducts" element={<ManageProducts/>}/>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} onRemoveFromCart={removeFromCart} onUpdateQuantity={updateCartQuantity}/>}/>
        <Route path="/payment" element={<Payment cart={cart} />}/>
        <Route path="/order-success" element={<OrderSuccess />}/>
        
       <Route path="/admindashboard" element={<AdminDashboard/>}/>
   
   
   
      </Routes>

      <Footer/>
      <ToastContainer
position="top-right"
autoClose={1000}
limit={1}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable
pauseOnHover={false}
theme="light"
transition={Slide}
/>
</>
);
}

export default App;
