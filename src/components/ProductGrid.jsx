import ProductCard from './ProductCard';

export default function ProductGrid({ title, products }) {
    return (
        <div className="page-inner-content">
            <h3 className="section-title">{title}</h3>
            <div className="subtitle-underline"></div>
            <div className={`cols ${products.length > 3 ? 'cols-4' : 'cols-3'}`}>
                {products.map(id => (
                    <ProductCard key={id} id={id} />
                ))}
            </div>
        </div>
    );
}
