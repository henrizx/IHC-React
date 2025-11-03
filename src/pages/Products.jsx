import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [sortBy, setSortBy] = useState('nome');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [recentSearches, setRecentSearches] = useState([]);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Dados mockados dos produtos
    const mockProducts = [
        {
            id: 1,
            name: "Notebook Gamer MSI",
            price: 4500.00,
            originalPrice: 5200.00,
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
            category: "eletronicos",
            rating: 4.5,
            description: "Notebook Gamer MSI com Intel Core i7, 16GB RAM, SSD 512GB, GTX 1650",
            specs: ["Intel Core i7", "16GB RAM", "SSD 512GB", "GTX 1650"],
            inStock: true,
            featured: true
        },
        {
            id: 2,
            name: "Smartphone Samsung Galaxy",
            price: 1200.00,
            originalPrice: 1500.00,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
            category: "celulares",
            rating: 4.3,
            description: "Smartphone Samsung Galaxy S21 com 128GB, 5G, Câmera Tripla",
            specs: ["128GB", "5G", "Câmera Tripla", "Android"],
            inStock: true
        },
        {
            id: 3,
            name: "Fone de Ouvido Bluetooth",
            price: 250.00,
            originalPrice: 350.00,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
            category: "acessorios",
            rating: 4.7,
            description: "Fone de ouvido wireless com cancelamento de ruído",
            specs: ["Wireless", "Cancelamento de Ruído", "Bateria 30h"],
            inStock: true
        },
        {
            id: 4,
            name: "Smart TV 55\" 4K",
            price: 2800.00,
            originalPrice: 3200.00,
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
            category: "eletronicos",
            rating: 4.4,
            description: "Smart TV LED 55 Polegadas 4K UHD com Android TV",
            specs: ["55 Polegadas", "4K UHD", "Android TV", "3 HDMI"],
            inStock: false
        },
        {
            id: 5,
            name: "Tablet iPad Air",
            price: 3200.00,
            originalPrice: 3800.00,
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
            category: "tablets",
            rating: 4.8,
            description: "Tablet iPad Air com Chip M1, 64GB, Tela Liquid Retina",
            specs: ["Chip M1", "64GB", "Tela Liquid Retina", "iOS"],
            inStock: true
        },
        {
            id: 6,
            name: "Smartwatch Apple Watch",
            price: 1800.00,
            originalPrice: 2200.00,
            image: "https://www.iplace.com.br/ccstore/v1/images/?source=/file/v8669592869403369835/products/100051868.00-apple-watch-series-10-gps-caixa-preta-brilhante-aluminio-42mm-pulseira-loop-esportiva-tinto-mwwg3am-a.jpg&height=424&width=424&quality=0.9",
            category: "wearables",
            rating: 4.6,
            description: "Apple Watch Series 7 GPS + Cellular, 45mm",
            specs: ["GPS + Cellular", "45mm", "Resistente à Água", "iOS"],
            inStock: true
        },
        {
            id: 7,
            name: "Câmera DSLR Canon",
            price: 3500.00,
            originalPrice: 4200.00,
            image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
            category: "fotografia",
            rating: 4.9,
            description: "Câmera DSLR Canon EOS 90D com Lente 18-55mm",
            specs: ["24.1MP", "Lente 18-55mm", "Gravação 4K", "Wi-Fi"],
            inStock: true
        },
        {
            id: 8,
            name: "Console PlayStation 5",
            price: 3800.00,
            originalPrice: 4500.00,
            image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
            category: "games",
            rating: 4.8,
            description: "Console PlayStation 5 com Controle DualSense",
            specs: ["SSD 825GB", "4K", "Ray Tracing", "DualSense"],
            inStock: false
        }
    ];

    const categories = [
        { value: 'todos', label: 'Todos os Produtos' },
        { value: 'eletronicos', label: 'Eletrônicos' },
        { value: 'celulares', label: 'Celulares' },
        { value: 'tablets', label: 'Tablets' },
        { value: 'wearables', label: 'Wearables' },
        { value: 'fotografia', label: 'Fotografia' },
        { value: 'games', label: 'Games' },
        { value: 'acessorios', label: 'Acessórios' }
    ];

    const searchSuggestions = ["notebook", "smartphone", "tablet", "câmera", "smartwatch", "fone"];

    // HEURÍSTICA 1: Status do sistema - Loading e URL state
    useEffect(() => {
        const timer = setTimeout(() => {
            setProducts(mockProducts);
            setFilteredProducts(mockProducts);
            setLoading(false);
        }, 800); // Simula carregamento

        return () => clearTimeout(timer);
    }, []);

    // HEURÍSTICA 7: Flexibilidade - URL compartilhável
    useEffect(() => {
        const category = searchParams.get('categoria');
        const search = searchParams.get('busca');
        const ordenacao = searchParams.get('ordenacao');

        if (category) setSelectedCategory(category);
        if (search) setSearchTerm(search);
        if (ordenacao) setSortBy(ordenacao);
    }, [searchParams]);

    useEffect(() => {
        updateURL();
        filterProducts();
    }, [selectedCategory, sortBy, searchTerm, products]);

    const updateURL = () => {
        const params = {};
        if (selectedCategory !== 'todos') params.categoria = selectedCategory;
        if (searchTerm) params.busca = searchTerm;
        if (sortBy !== 'nome') params.ordenacao = sortBy;

        setSearchParams(params);
    };

    const filterProducts = () => {
        let filtered = products;

        // Filtro por categoria
        if (selectedCategory !== 'todos') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Filtro por busca
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Ordenação
        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'preco-menor':
                    return a.price - b.price;
                case 'preco-maior':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'destaque':
                    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
                case 'nome':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        setFilteredProducts(filtered);
    };

    // HEURÍSTICA 3: Controle do usuário - Limpar filtros
    const clearAllFilters = () => {
        setSelectedCategory('todos');
        setSortBy('nome');
        setSearchTerm('');
        setSearchParams({});
    };

    const handleProductClick = (productId) => {
        navigate(`/produto/${productId}`);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
                aria-label={`${index < Math.floor(rating) ? 'Estrela preenchida' : 'Estrela vazia'}`}
            >
                ★
            </span>
        ));
    };

    // HEURÍSTICA 1: Loading skeleton
    if (loading) {
        return (
            <>
            <Navbar />
            <main className="products-page">
                <div className="page-inner-content">
                    <div className="products-header">
                        <div className="skeleton skeleton-title"></div>
                        <div className="subtitle-underline"></div>
                        <div className="skeleton skeleton-subtitle"></div>
                    </div>

                    <div className="products-controls">
                        <div className="skeleton skeleton-search"></div>
                        <div className="skeleton skeleton-filter"></div>
                        <div className="skeleton skeleton-filter"></div>
                    </div>

                    <div className="products-grid cols-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="product-card skeleton">
                                <div className="skeleton skeleton-image"></div>
                                <div className="product-info">
                                    <div className="skeleton skeleton-text"></div>
                                    <div className="skeleton skeleton-text short"></div>
                                    <div className="skeleton skeleton-rating"></div>
                                    <div className="skeleton skeleton-price"></div>
                                    <div className="skeleton skeleton-button"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            </>
        );
    }

    return (
        <>
        <Navbar />
        <main className="products-page">
            <div className="page-inner-content">
                {/* HEURÍSTICA 3: Breadcrumbs para navegação */}
                <nav className="breadcrumbs" aria-label="Navegação estrutural">
                    <a href="/">Home</a> &gt; <span>Produtos</span>
                    {selectedCategory !== 'todos' && (
                        <> &gt; <span>{categories.find(c => c.value === selectedCategory)?.label}</span></>
                    )}
                </nav>

                {/* HEURÍSTICA 1: Cabeçalho informativo */}
                <div className="products-header">
                    <h1 className="section-title">Nossos Produtos</h1>
                    <div className="subtitle-underline"></div>
                    <p className="products-subtitle">
                        Encontre os melhores produtos com os preços mais competitivos
                    </p>
                </div>

                {/* HEURÍSTICA 5,6,7: Controles avançados com prevenção de erros */}
                <div className="products-controls">
                    <div className="search-section">
                        <div className="search-with-suggestions">
                            <input
                                type="text"
                                placeholder="Buscar produtos por nome ou descrição..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                                aria-label="Campo de busca de produtos"
                            />
                            {searchTerm && (
                                <button
                                    className="clear-search"
                                    onClick={() => setSearchTerm('')}
                                    aria-label="Limpar busca"
                                    title="Limpar busca"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {/* HEURÍSTICA 6: Sugestões de busca */}
                        {!searchTerm && (
                            <div className="search-suggestions">
                                <span>Termos populares: </span>
                                {searchSuggestions.map((term, index) => (
                                    <button
                                        key={index}
                                        className="suggestion-tag"
                                        onClick={() => setSearchTerm(term)}
                                        aria-label={`Buscar por ${term}`}
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="filters-container">
                        <div className="filter-group">
                            <label htmlFor="category-filter" className="filter-label">
                                Categoria
                                <span className="help-tooltip" title="Filtre os produtos por categoria">ℹ️</span>
                            </label>
                            <select
                                id="category-filter"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="filter-select"
                                aria-describedby="category-help"
                            >
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                            <span id="category-help" className="sr-only">Selecione uma categoria para filtrar os produtos</span>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="sort-filter" className="filter-label">
                                Ordenar por
                                <span className="help-tooltip" title="Escolha como os produtos serão organizados">ℹ️</span>
                            </label>
                            <select
                                id="sort-filter"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="filter-select"
                                aria-describedby="sort-help"
                            >
                                <option value="nome">Nome A-Z</option>
                                <option value="preco-menor">Menor Preço</option>
                                <option value="preco-maior">Maior Preço</option>
                                <option value="rating">Melhor Avaliado</option>
                                <option value="destaque">Em Destaque</option>
                            </select>
                            <span id="sort-help" className="sr-only">Selecione como ordenar os produtos</span>
                        </div>

                        {/* HEURÍSTICA 3: Botão limpar filtros */}
                        {(selectedCategory !== 'todos' || searchTerm || sortBy !== 'nome') && (
                            <button
                                className="clear-filters-btn"
                                onClick={clearAllFilters}
                                aria-label="Limpar todos os filtros"
                            >
                                Limpar Filtros
                            </button>
                        )}
                    </div>
                </div>

                {/* HEURÍSTICA 1,6: Status do sistema e filtros ativos */}
                <div className="products-status">
                    <p className="products-count" aria-live="polite" aria-atomic="true">
                        <strong>{filteredProducts.length}</strong> produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                        {selectedCategory !== 'todos' && ` em ${categories.find(c => c.value === selectedCategory)?.label}`}
                        {searchTerm && ` para "${searchTerm}"`}
                    </p>

                    {/* HEURÍSTICA 6: Mostrar filtros ativos */}
                    <div className="active-filters">
                        {selectedCategory !== 'todos' && (
                            <span className="active-filter">
                                Categoria: {categories.find(c => c.value === selectedCategory)?.label}
                                <button
                                    onClick={() => setSelectedCategory('todos')}
                                    aria-label={`Remover filtro de categoria ${categories.find(c => c.value === selectedCategory)?.label}`}
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {searchTerm && (
                            <span className="active-filter">
                                Busca: "{searchTerm}"
                                <button
                                    onClick={() => setSearchTerm('')}
                                    aria-label="Remover termo de busca"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {sortBy !== 'nome' && (
                            <span className="active-filter">
                                Ordenação: {
                                    sortBy === 'preco-menor' ? 'Menor Preço' :
                                        sortBy === 'preco-maior' ? 'Maior Preço' :
                                            sortBy === 'rating' ? 'Melhor Avaliado' : 'Em Destaque'
                                }
                                <button
                                    onClick={() => setSortBy('nome')}
                                    aria-label="Voltar para ordenação padrão"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                </div>

                {/* HEURÍSTICA 2,4,8: Grid de Produtos consistente */}
                <div className="products-grid cols-4" role="grid" aria-label="Lista de produtos">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onProductClick={handleProductClick}
                        />
                    ))}
                </div>

                {/* HEURÍSTICA 9: Mensagens de erro melhoradas */}
                {filteredProducts.length === 0 && !loading && (
                    <div className="no-products" role="alert" aria-live="polite">
                        <div className="no-products-icon">🔍</div>
                        <h3>Nenhum produto encontrado</h3>
                        <p>
                            {searchTerm
                                ? `Não encontramos resultados para "${searchTerm}". Tente outros termos de busca.`
                                : 'Não há produtos disponíveis com os filtros selecionados.'
                            }
                        </p>

                        {/* HEURÍSTICA 9: Sugestões de recuperação */}
                        <div className="recovery-suggestions">
                            <button className="suggestion-button" onClick={clearAllFilters}>
                                Ver todos os produtos
                            </button>

                            <div className="search-suggestions">
                                <p>Talvez você queira buscar por:</p>
                                {searchSuggestions.map((term, index) => (
                                    <button
                                        key={index}
                                        className="suggestion-tag"
                                        onClick={() => setSearchTerm(term)}
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
        <Footer />
        </>
    );
};

// Componente de Card separado para melhor organização e reuso
const ProductCard = ({ product, onProductClick }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
                aria-label={`${index < Math.floor(rating) ? 'Estrela preenchida' : 'Estrela vazia'}`}
            >
                ★
            </span>
        ));
    };

    return (
        <article
            className={`product-card ${!product.inStock ? 'out-of-stock' : ''} ${product.featured ? 'featured' : ''}`}
            onClick={() => onProductClick(product.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onProductClick(product.id)}
            aria-label={`Ver detalhes do produto ${product.name}. Preço: ${formatPrice(product.price)}. ${!product.inStock ? 'Produto esgotado' : 'Disponível para compra'}. Avaliação: ${product.rating} estrelas.`}
        >
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                />
                {!product.inStock && (
                    <div className="out-of-stock-badge" aria-hidden="true">ESGOTADO</div>
                )}
                {product.originalPrice > product.price && (
                    <div className="discount-badge" aria-label={`Desconto de ${Math.round((1 - product.price / product.originalPrice) * 100)}%`}>
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                )}
                {product.featured && (
                    <div className="featured-badge" aria-label="Produto em destaque">⭐ Destaque</div>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-rating" aria-label={`Avaliação: ${product.rating} de 5 estrelas`}>
                    <div className="stars">
                        {renderStars(product.rating)}
                        <span className="rating-value">({product.rating})</span>
                    </div>
                </div>

                <div className="product-specs">
                    {product.specs.slice(0, 2).map((spec, index) => (
                        <span key={index} className="spec-tag">{spec}</span>
                    ))}
                    {product.specs.length > 2 && (
                        <span className="spec-tag more">+{product.specs.length - 2}</span>
                    )}
                </div>

                <div className="product-pricing">
                    {product.originalPrice > product.price && (
                        <span className="original-price" aria-label={`Preço original: ${formatPrice(product.originalPrice)}`}>
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                    <span className="current-price" aria-label={`Preço atual: ${formatPrice(product.price)}`}>
                        {formatPrice(product.price)}
                    </span>
                </div>

                <button
                    className={`buy-button ${!product.inStock ? 'disabled' : ''}`}
                    disabled={!product.inStock}
                    aria-disabled={!product.inStock}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (product.inStock) {
                            // Lógica de adicionar ao carrinho
                            console.log('Produto adicionado ao carrinho:', product.name);
                        }
                    }}
                >
                    {product.inStock ? '🛒 Comprar Agora' : '❌ Produto Esgotado'}
                </button>
            </div>
        </article>
    );
};

export default Products;