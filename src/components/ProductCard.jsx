export default function ProductCard({ id }) {
    return (
        <div className="product">
            <img src={`/images/products/product-${id}.png`} alt={`product-${id}`} />
            <p className="product-name">Combo Gamer meetion</p>
            <p className="rate">&#9733;&#9733;&#9733;&#9733;&#9734;</p>
            <p className="product-price">300,99 <span>R$</span></p>
        </div>
    );
}
