import './App.css'
import {BaseRoutes} from "@/Routes/BaseRoutes";
import {CartProvider} from "@/Context/CartContext.tsx";
import {CheckoutProvider} from "@/Context/CheckoutContext.tsx";

function App() {
  return (
    <CartProvider>
        <CheckoutProvider>
            <BaseRoutes />
        </CheckoutProvider>
    </CartProvider>
  )
}

export default App