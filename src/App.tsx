import './App.css'
import {BaseRoutes} from "@/Routes/BaseRoutes";
import {CartProvider} from "@/Context/CartContext.tsx";

function App() {
  return (
    <CartProvider>
      <BaseRoutes />
    </CartProvider>
  )
}

export default App