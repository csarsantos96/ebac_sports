import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Produto } from '../../App'

type CarrinhoState = {
  itens: Produto[]
}

const initialState: CarrinhoState = {
  itens: []
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload

      if (state.itens.find((p) => p.id === produto.id)) {
        alert('Item já adicionado')
      } else {
        //apesar do professor Gian, alertar sobre não ser correto por conta da imutabilidade eu sei que o immer, faz isso e por isso está funcionando a aplicação.
        //por outro lado, na sequencia posso também usar o item que deixo comentado em substituição do PUSH < state.itens = [...state.itens, produto] >
        // mas optei por deixar o push mesmo.
        state.itens.push(produto)
        // state.itens = [...state.itens, produto]
      }
    }
  }
})

export const { adicionar } = carrinhoSlice.actions
export default carrinhoSlice.reducer
