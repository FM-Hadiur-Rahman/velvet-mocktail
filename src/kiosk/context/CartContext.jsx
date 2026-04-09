import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("kiosk_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [lastOrder, setLastOrder] = useState(() => {
    const saved = localStorage.getItem("kiosk_last_order");
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("kiosk_orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("kiosk_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("kiosk_last_order", JSON.stringify(lastOrder));
  }, [lastOrder]);

  useEffect(() => {
    localStorage.setItem("kiosk_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQty = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const clearOrders = () => {
    setOrders([]);
    setLastOrder(null);
    localStorage.removeItem("kiosk_orders");
    localStorage.removeItem("kiosk_last_order");
  };

  const updateOrderStatus = (orderNumber, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.orderNumber !== orderNumber) return order;

        const updatedOrder = {
          ...order,
          status: newStatus,
          completedAt:
            newStatus === "completed"
              ? order.completedAt || new Date().toISOString()
              : order.completedAt || null,
        };

        if (lastOrder?.orderNumber === orderNumber) {
          setLastOrder(updatedOrder);
        }

        return updatedOrder;
      }),
    );
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const placeOrder = ({ customerName, orderType, paymentMethod }) => {
    const orderNumber = `VB-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = {
      orderNumber,
      customerName,
      orderType,
      paymentMethod,
      items: cartItems,
      total: subtotal,
      status: "pending",
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    setLastOrder(order);
    setOrders((prev) => [order, ...prev]);
    clearCart();

    return order;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    clearOrders,
    cartCount,
    subtotal,
    placeOrder,
    lastOrder,
    orders,
    updateOrderStatus,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
