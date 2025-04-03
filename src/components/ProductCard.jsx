export default function  ProductCard(props) {
    console.log(props);
  return (
    <div className="card">
      <img src="https://via.placeholder.com/150" alt="Product" />
      <h2>{props.name}</h2>
      <p>{props.age}</p>
      <button>Add to Cart</button>
    </div>
  )
}