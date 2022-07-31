const customerInitialState = {
    customerList: [{ customerName: 'Jenil', customerMobileNumber: '9898653245', customerGender: 'Male', customerDOB: '1998-07-09', customerCity: 'Surat' },
    { customerName: 'Mayur', customerMobileNumber: '9060325656', customerGender: 'Male', customerDOB: '2010-01-08', customerCity: 'Ahmedabad' },
    { customerName: 'Tejas', customerMobileNumber: '9636654512', customerGender: 'Male', customerDOB: '2001-05-10', customerCity: 'Vadodara' }
    ]
}
const productInitialState = {
    productList: [
        { productName: 'Balaji', productPrice: '13', productQuantity: '105', productMRP: '15' },
        { productName: 'ParleG', productPrice: '8', productQuantity: '90', productMRP: '10' },
        { productName: 'Orio', productPrice: '18', productQuantity: '70', productMRP: '20' }
    ]
}
const billInitialState = {
    billList: []
}

const customersBillInitialState = {
    customersBillList: []
}

const CustomerReducer = (state = customerInitialState, action) => {
    switch (action.type) {
        case 'ADD_CUSTOMER':
            const { customerName, customerMobileNumber, customerGender, customerDOB, customerCity } = action.payload;
            return {
                ...state,
                customerList: [
                    ...state.customerList,
                    {
                        customerName,
                        customerMobileNumber,
                        customerGender,
                        customerDOB,
                        customerCity
                    }
                ]
            }
        case 'EDIT_CUSTOMER':
            state.customerList[action.payload.index] = action.payload
            return {
                customerList: state.customerList
            }
        case 'DELETE_CUSTOMER':
            const newCustomerList = state.customerList.filter((elem, index) => index !== action.index);
            return {
                ...state,
                customerList: newCustomerList
            }
        default: return state
    }
}

const ProductReducer = (state = productInitialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            const { productName, productPrice, productQuantity, productMRP } = action.payload;
            return {
                ...state,
                productList: [
                    ...state.productList,
                    {
                        productName,
                        productPrice,
                        productQuantity,
                        productMRP
                    }
                ]
            }

        case 'EDIT_PRODUCT':
            state.productList[action.payload.index] = action.payload
            return {
                productList: state.productList
            }
        case 'DELETE_PRODUCT':
            const newCustomerList = state.productList.filter((elem, index) => index !== action.index);
            return {
                ...state,
                productList: newCustomerList
            }
        default: return state
    }
}

const BillReducer = (state = billInitialState, action) => {
    switch (action.type) {
        case 'ADD_BILL':
            const { billDate, customerName, selectedProductList, productQuantity, priceQuantityTotal } = action.payload;
            return {
                ...state,
                billList: [
                    ...state.billList,
                    {
                        billDate,
                        customerName,
                        selectedProductList,
                        productQuantity,
                        priceQuantityTotal
                    }
                ]
            }

        // case 'EDIT_BILL':
        //     state.billList[action.payload.index] = action.payload
        //     return {
        //         billList: state.billList
        //     }
        case 'DELETE_BILL':
            const newBillList = state.billList.filter((elem, index) => index !== action.index);
            return {
                ...state,
                billList: newBillList
            }

        case 'ADD_CUSTOMERS_BILL':
            return {
                billList: []
            }

        default: return state
    }
}

const CustomersBillReducer = (state = customersBillInitialState, action) => {
    switch (action.type) {
        case 'ADD_CUSTOMERS_BILL':
            const { billDate, customerListData, billTotal, billList } = action.payload;
            return {
                ...state,
                customersBillList: [
                    ...state.customersBillList,
                    {
                        billDate,
                        customerListData,
                        billTotal,
                        billList
                    }
                ]
            }
        default: return state
    }
}

export { CustomerReducer, ProductReducer, BillReducer, CustomersBillReducer };