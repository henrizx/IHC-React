import "../styles/globals.css";

export default function ProductCard({ image, name, price, rate }) {
    return (
        <div className="product">
            <img src={image} alt={name} />
            <p className="product-name">{name}</p>
            <p className="rate">{rate}</p>
            <p className="product-price">
                <span>R$</span> {price}
            </p>
        </div>
    );
}
