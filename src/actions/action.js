export const addCustomer = (customerName, customerMobileNumber, customerGender, customerDOB, customerCity) => {
    return (
        {
            type: 'ADD_CUSTOMER',
            payload: {
                customerName: customerName,
                customerMobileNumber: customerMobileNumber,
                customerGender: customerGender,
                customerDOB: customerDOB,
                customerCity: customerCity
            }
        })
}
export const editCustomer = (index, customerName, customerMobileNumber, customerGender, customerDOB, customerCity) => {
    return (
        {
            type: 'EDIT_CUSTOMER',
            payload: {
                index,
                customerName,
                customerMobileNumber,
                customerGender,
                customerDOB,
                customerCity
            }
        })
}
export const deleteCustomer = (index) => {
    return ({
        type: 'DELETE_CUSTOMER',
        index
    })
}

// =================================================================

export const addProduct = (productName, productPrice, productQuantity, productMRP) => {
    return (
        {
            type: 'ADD_PRODUCT',
            payload: {
                productName: productName,
                productPrice: productPrice,
                productQuantity: productQuantity,
                productMRP: productMRP
            }
        })
}
export const editProduct = (index, productName, productPrice, productQuantity, productMRP) => {
    return (
        {
            type: 'EDIT_PRODUCT',
            payload: {
                index,
                productName,
                productPrice,
                productQuantity,
                productMRP
            }
        })
}
export const deleteProduct = (index) => {
    return ({
        type: 'DELETE_PRODUCT',
        index
    })
}
// =================================================================
export const addBill = (billDate, customerName, selectedProductList, productQuantity, priceQuantityTotal) => {
    return (
        {
            type: 'ADD_BILL',
            payload: {
                billDate: billDate,
                customerName: customerName,
                selectedProductList: selectedProductList,
                productQuantity: productQuantity,
                priceQuantityTotal: priceQuantityTotal
            }
        })
}

export const deleteBill = (index) => {
    return ({
        type: 'DELETE_BILL',
        index
    })
}

// ==================================================================

export const addCustomersBill = (billDate, customerListData, billTotal, billList) => {
    return (
        {
            type: 'ADD_CUSTOMERS_BILL',
            payload: {
                billDate: billDate,
                customerListData: customerListData,
                billTotal: billTotal,
                billList: billList
            }
        })
}