import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Produto {
  id: number
  nome: string
  preco: number
  imagem: string
}

interface CartState {
  produtos: Produto[]
  itens: Produto[]
  favoritos: Produto[]
}

const initialState: CartState = {
  produtos: [],
  itens: [],
  favoritos: []
}

// Thunk para buscar produtos
export const fetchProdutos = createAsyncThunk(
  'cart/fetchProdutos',
  async () => {
    const response = await fetch(
      'https://fake-api-tau.vercel.app/api/ebac_sports'
    )
    const data = await response.json()
    return data
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    adicionarAoCarrinho: (state, action: PayloadAction<Produto>) => {
      const existe = state.itens.find((item) => item.id === action.payload.id)
      if (!existe) {
        state.itens.push(action.payload)
      }
    },
    favoritarProduto: (state, action: PayloadAction<Produto>) => {
      const existe = state.favoritos.find(
        (favorito) => favorito.id === action.payload.id
      )
      if (existe) {
        state.favoritos = state.favoritos.filter(
          (favorito) => favorito.id !== action.payload.id
        )
      } else {
        state.favoritos.push(action.payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProdutos.fulfilled, (state, action) => {
      state.produtos = action.payload
    })
  }
})

export const { adicionarAoCarrinho, favoritarProduto } = cartSlice.actions
export default cartSlice.reducer
