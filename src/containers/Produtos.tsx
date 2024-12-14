import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import ProdutoComponent from '../components/Produto'
import * as S from './styles'

const ProdutosComponent = () => {
  // Obtemos os produtos e os favoritos diretamente do estado global do Redux
  const produtos = useSelector((state: RootState) => state.cart.produtos)
  const favoritos = useSelector((state: RootState) => state.cart.favoritos)

  // Função para verificar se um produto está nos favoritos
  const produtoEstaNosFavoritos = (produtoId: number) => {
    return favoritos.some((favorito) => favorito.id === produtoId)
  }

  return (
    <S.Produtos>
      {produtos.map((produto) => (
        <ProdutoComponent
          key={produto.id}
          produto={produto}
          estaNosFavoritos={produtoEstaNosFavoritos(produto.id)}
        />
      ))}
    </S.Produtos>
  )
}

export default ProdutosComponent
