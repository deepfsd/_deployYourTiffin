import React from 'react'
import trash from '../trash.svg'
import { useCart, useDispatchCart } from '../components/ContextReducer'
export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    // const handleCheckOut = async()=>{
    //     let userEmail = localStorage.getItem("userEmail");
    //     let response = await fetch("http://localhost:5000/api/orderData",{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             order_data: data,
    //             email: userEmail,
    //             order_date: new Date().toDateString()
    //         })
    //     });
    //     console.log("Order Response: ", response);
    //     if(response.status === 200){
    //         dispatch({type: "DROP"})
    //     }
    // }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        try {
            let response = await fetch("http://localhost:5000/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });
    
            if (response.ok) {
                dispatch({ type: "DROP" });
            } else {
                throw new Error(`Request failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            // Handle the error, perhaps by displaying a message to the user
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className='conainer m-auto m-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amo     unt</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td> <button type='button' className='btn p-0'><img src={trash} alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* {
                <div>
                    <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
                </div>
            }
            <div>
                <button className='btn bg-success mt-5'>Check Out</button>
            </div> */}
                <div className='position-absolute bottom-0 start-50 translate-middle-x text-center'>
                    <h1 className='fs-2 mb-3'>Total Price: {totalPrice}/-</h1>
                    <button className='btn bg-success' onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    )
}
