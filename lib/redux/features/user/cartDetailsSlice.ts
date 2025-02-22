import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "@/lib/redux/hook";

interface cartDetailsState {
    productDetails: any;
    totalQuantity: number;
    itemsPrice: number;
}

const initialState: cartDetailsState = {
    productDetails: [],
    totalQuantity: 0,
    itemsPrice: 0,
}

export const fetchCartDetails = createAsyncThunk('cartDetails/fetchCartDetails', async (
    {userId, productId, addProduct = false, removeProduct = false}: {userId: string, productId?: string, addProduct?: boolean, removeProduct?: boolean}) => {
        const storeId = parseInt(sessionStorage.getItem('store')  || '');
    try {
        if(userId){
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId: userId, storeId: storeId, productId: productId, addProduct: addProduct, removeProduct: removeProduct}),
            });
            if(response.ok){
                const data = await response.json();
                console.log("THUNK data", data);
                return data;
            }
        }
    } catch (error: any) {
        return error.message;  
    }
})

export const cartDetailsSlice = createSlice({
    name: 'cartDetails',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartDetails.fulfilled, (state: cartDetailsState, action: PayloadAction<any>) => {
                state.productDetails = action.payload.productDetails;
                state.totalQuantity = action.payload.totalQuantity;
                state.itemsPrice = action.payload.productDetails.reduce((acc: number, res: any) => acc + Number(res.price) * Number(res.quantity), 0);
            })
            .addCase(fetchCartDetails.rejected, (state: cartDetailsState, action: PayloadAction<any>) => {
                console.log("Error fetching cart details", action.payload);
            })
    }
})

export default cartDetailsSlice.reducer;