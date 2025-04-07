/* eslint-disable no-unused-vars */
import axios from "axios"

export default function Adminproductpage() {

    axios.get("http://localhost:5000/api/product").then((response) => {
        console.log(response.data);
        
    }).catch((error) => {
        console.error("There was an error fetching the products!", error);
    });


    return (
        <div>
            <h1>admin Product page</h1>
            
        </div>
    );
}