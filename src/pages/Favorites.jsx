import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Iniciando requisitos bônus~
        Aqui: pegar favs da api/localstorage ->
        usar loading page ->
        coisar o music card com o array que a api dá ->
        func de remover, prolly já deve dar -> loading page */}
        <div data-testid="page-favorites">Componente Favorites</div>
      </>);
  }
}

export default Favorites;
