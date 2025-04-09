/* eslint-disable no-unused-vars */
import axios from "axios"
import { useEffect, useState } from "react"

export default function Adminproductpage() {


    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/product")
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div>
            <h1>admin Product page</h1>
            {
                products.map((product) => {
                    return(
                        <div>
                            <h1>{product.productname}</h1>
                        </div>
                    )
                })
            }
            
        </div>
    );
}

