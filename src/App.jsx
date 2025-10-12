import Navbar from './components/Navbar';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ExclusiveSection from './components/ExclusiveSection';

function App() {
  const produtosSelecionados = [4, 5, 6, 7];
  const ultimosProdutos = [8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <Navbar />
      <Header />
      <ProductGrid title="Produtos Selecionados" products={produtosSelecionados} />
      <ProductGrid title="Últimos Produtos" products={ultimosProdutos} />
      <ExclusiveSection />
    </>
  );
}

export default App;
