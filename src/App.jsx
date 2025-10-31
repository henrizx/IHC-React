// App.jsx
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import ExclusiveSection from "./components/ExclusiveSection";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  const produtosSelecionados = [
    {
      image: "/images/products/product-4.png",
      name: "Combo Gamer Meetion",
      price: "300,99",
      rate: "★★★★☆",
    },
    {
      image: "/images/products/product-5.png",
      name: "Placa de Vídeo MSI RTX 3050",
      price: "1.299,00",
      rate: "★★★★☆",
    },
    {
      image: "/images/products/product-6.png",
      name: "Controle DualSense",
      price: "499,90",
      rate: "★★★★★",
    },
    {
      image: "/images/products/product-7.png",
      name: "Cadeira Gamer Snake",
      price: "429,00",
      rate: "★★★★☆",
    },
  ];

  const ultimosProdutos = [
    {
      image: "/images/products/product-8.png",
      name: "iPhone 16 Pro",
      price: "8.279,10",
      rate: "★★★★☆",
    },
    {
      image: "/images/products/product-9.png",
      name: "Samsung Galaxy S24 Ultra",
      price: "5.332,00",
      rate: "★★★★☆",
    },
    {
      image: "/images/products/product-12.png",
      name: "Console Xbox Series X",
      price: "5.410,00",
      rate: "★★★★☆",
    },
    {
      image: "/images/products/product-15.png",
      name: "Gabinete Gamer Mancer CV100",
      price: "262,73",
      rate: "★★★★☆",
    },
  ];

  return (
    <>
      <Navbar />
      <Header />
      <ProductGrid title="Produtos Selecionados" products={produtosSelecionados} />
      <ProductGrid title="Últimos Produtos" products={ultimosProdutos} />
      <ExclusiveSection />
      <Testimonials />
      <Footer />
    </>
  );
}

export default App;