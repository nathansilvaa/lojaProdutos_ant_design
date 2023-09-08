import axios from 'axios';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Button, Space } from 'antd';
const { Meta } = Card;

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null); // Estado para rastrear o produto clicado
  const url = 'https://fakestoreapi.com/products';

  useEffect(() => {
    axios.get(url).then((resposta) => {
      setProdutos(resposta.data);
    });
  }, []);

  // Função para lidar com o clique em um produto
  const handleProdutoClick = (produto) => {
    setProdutoSelecionado(produto);
  };

  return (
    <div className="App">
      <h1>Minha loja</h1>

      {produtoSelecionado ? (
        // Se um produto for selecionado, exiba suas informações
        <div>
          <h2>Detalhes do Produto</h2>
          <Card
            className="card"
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={produtoSelecionado.image} />}
          >
            <Meta title={produtoSelecionado.title} description={produtoSelecionado.price} />
          </Card>
          <Button
            type="primary"
            className="botao"
            onClick={() => setProdutoSelecionado(null)} // Adicione um botão para voltar à lista de produtos
          >
            Voltar
          </Button>
        </div>
      ) : (
        // Se nenhum produto estiver selecionado, exiba a lista de produtos
        <ul>
          {produtos.map((p) => (
            <li key={p.id} onClick={() => handleProdutoClick(p)}>
              <Card
                className="card"
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src={p.image} />}
              >
                <Meta title={p.title} description={p.price} />
              </Card>
              <Button type="primary" className="botao">
                Ver mais
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
