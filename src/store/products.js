import { createSlice} from '@reduxjs/toolkit';

const initialState = [{
    title: "Test",
    desc : 'Amizing product',
    price: 6,
    id: 'p1'
},
{
    title: "Product",
    desc : 'This is second product',
    price: 6.5,
    id: 'p2'
}
]

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {}
})

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;