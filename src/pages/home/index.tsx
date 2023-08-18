import { BsFillCartPlusFill } from "react-icons/bs"
import { useProductsContext } from "../../context/ProductsContext"
import { ProductsContextType } from "../../context/ProductsContext"

import { useNavigate } from "react-router-dom"

import dataItems from "../../../db.json"

export interface productsProps {
    id: number,
    title: string,
    price: number,
    cover: string,
    amount: number,
}

export function Home() {

    const navigate = useNavigate()

    function goDetails(itemId: number) {
        navigate(`/dataItems/${itemId}`)
    }

    const { addToCart } = useProductsContext() as ProductsContextType

    return (
        <div className="w-full max-w-6xl mx-auto mb-16 px-5">

            <h1 className="text-center text-4xl m-5 font-bold text-zinc-500">Good Stuff!!</h1>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                {dataItems.map((item) => <section key={item.id} className="w-full cursor-pointer">

                    <section className="w-full flex items-center flex-col mb-2 gap-3">

                        <img
                            onClick={() => goDetails(item.id)}
                            className="w-full rounded-lg max-h-70 hover:scale-105 duration-300"
                            src={item.cover} alt={item.title} />
                        <h1 className="text-2xl font-semibold text-center">{item.title}</h1>
                        <p>{item.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}</p>
                        <button className="hover:scale-150 duration-200"
                            onClick={() => addToCart(item.id)}

                        ><BsFillCartPlusFill size={30} /></button>
                    </section>

                </section>)}

            </div>
        </div>
    )
}

