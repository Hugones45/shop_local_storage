import { BsTrash } from "react-icons/bs"
import { useProductsContext } from "../../context/ProductsContext"
import { Link } from "react-router-dom"
import { ProductsContextType } from "../../context/ProductsContext"
import { useNavigate } from "react-router-dom"

export function Cart() {

    const navigate = useNavigate()

    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems } = useProductsContext() as ProductsContextType

    function allProductsTotal() {
        let amount = 0

        for (let item of cartItems) {
            amount += item.quantity * item.price
        }

        return amount
    }

    function goDetails(itemId: number) {
        navigate(`/dataItems/${itemId}`)
    }

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-wrap md:flex-wrap items-start gap-10 lg:flex-nowrap">
                <div>
                    {cartItems.map((item) =>

                        <section key={item.id} className="flex items-center justify-between border-b-2 mb-2 p-3 gap-3">
                            <div className="flex flex-col ml-2 items-center justify-center">
                                <img
                                    onClick={() => goDetails(item.id)}
                                    className="w-32 hover:scale-110 duration-300 cursor-pointer"
                                    src={item.cover} alt={item.title} />

                                <p className="font-semibold text-center">{item.title}</p>
                            </div>

                            <div className="flex flex-wrap justify-center items-center text-center gap-8 md:flex-nowrap">

                                <strong className="w-36">{item.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}</strong>
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => decreaseCartQuantity(item.id)}
                                        className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">-</button>
                                    <p>{item.quantity}</p>
                                    <button
                                        onClick={() => increaseCartQuantity(item.id)}
                                        className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">+</button>
                                </div>

                                <strong className="w-48 flex justify-center">Total - {parseFloat((item.quantity * item.price).toFixed(2)).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}</strong>

                                <div className="cursor-pointer"
                                    onClick={() => removeFromCart(item.id)}
                                ><BsTrash size={24} /></div>

                            </div>

                        </section>
                    )}
                </div>

                {cartItems.length > 0 ? <div className="w-80 flex flex-col mb-10 items-center justify-center flex-wrap bg-stone-100 p-3 mx-auto rounded-lg ">
                    <div className="flex justify-between flex-col items-center w-full max-w-6xl gap-6">

                        <div className="w-full font-semibold max-w-4xl bg-slate-200 rounded-lg p-4 flex justify-between">
                            <h1>Sub Total</h1>
                            <p>{allProductsTotal().toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}</p>
                        </div>

                        <div className="w-full font-semibold  max-w-4xl bg-slate-200 p-4 rounded-lg flex justify-between">
                            <h1>Frete</h1>
                            <h1>R$ 200,00</h1>
                        </div>

                        <div className="w-full font-semibold  max-w-4xl bg-slate-200 p-4 rounded-lg flex justify-between">
                            <h1>Total</h1>
                            <p>{(allProductsTotal() + 200).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}</p>
                        </div>

                        <div></div>

                    </div>
                    <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">FInalizar Compra!</button>

                </div> : <div className="w-full max-w-6xl flex items-center justify-center flex-col gap-10">
                    <h1 className="text-2xl mt-4 lg:text-4xl">The Cart is Empty!</h1>

                    <Link to='/'>
                        <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Go to Products!</button>
                    </Link>

                </div>}
            </div>
        </div >
    )
}