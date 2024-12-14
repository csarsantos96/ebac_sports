import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { adicionarAoCarrinho, favoritarProduto } from '../../store/cartSlice'
import * as S from './styles'

type Props = {
  produto: {
    id: number
    nome: string
    preco: number
    imagem: string
  }
  estaNosFavoritos: boolean
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useDispatch()

  // Seleciona os favoritos do estado global
  const favoritos = useSelector((state: RootState) => state.cart.favoritos)

  // Verifica se o produto está nos favoritos
  const estaNosFavoritos = favoritos.some(
    (favorito) => favorito.id === produto.id
  )

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar
        onClick={() => dispatch(favoritarProduto(produto))}
        type="button"
      >
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar
        onClick={() => dispatch(adicionarAoCarrinho(produto))}
        type="button"
      >
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
