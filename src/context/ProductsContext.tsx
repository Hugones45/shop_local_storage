import { useContext, createContext } from "react"
import { ReactNode } from "react"
import { useLocalStorage } from "../hook/useLocalStorage"
import dataItems from "../../db.json"
import toast from "react-hot-toast"

interface childrenProps {
    children: ReactNode
}

interface CartItem {
    id: number;
    quantity: number;
    title: string;
    cover: string;
    price: number;
}

export interface ProductsContextType {
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    addToCart: (id: number) => void;
    cartItems: CartItem[];
}

export const ProductsContext = createContext({})

export const ProductsContextProvider = ({ children }: childrenProps) => {

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])


    function addToCart(id: number) {
        setCartItems(currItems => {
            const existingItem = currItems.find(item => item.id === id);

            if (existingItem) {

                toast.error("Item has already been added to the cart!", {
                    style: {
                        borderRadius: "10",
                        background: "#121212",
                        color: "#fff"
                    }
                })
                return currItems
            } else {
                const clickedItem = dataItems.find(item => item.id === id);

                if (clickedItem) {

                    toast.success("Item added to the cart!", {
                        style: {
                            borderRadius: "10",
                            background: "#121212",
                            color: "#fff"
                        }
                    })

                    return [...currItems, { ...clickedItem, quantity: 1 }];
                }
                return currItems
            }
        });

    }

    function increaseCartQuantity(id: number) {

        setCartItems(currItems => {
            const existingItem = currItems.find(item => item.id === id);

            if (existingItem) {
                return currItems.map(item => {
                    if (item.id === id) {

                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
            }
            return currItems
        });
    }



    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            return currItems.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: Math.max(item.quantity - 1, 1)
                    };
                } else {
                    return item;
                }
            });
        });
    }


    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ProductsContext.Provider value={{ increaseCartQuantity, decreaseCartQuantity, removeFromCart, addToCart, cartItems }}>
            {children}

        </ProductsContext.Provider>
    )
}

export function useProductsContext() {
    return useContext(ProductsContext)
}