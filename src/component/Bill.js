import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBill, deleteBill, addCustomersBill } from '../actions/action';

function Bill() {
    const [billDate, setBillDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');

    const dispatch = useDispatch();
    const customerList = useSelector((state) => state.CustomerReducer.customerList)
    const productList = useSelector((state) => state.ProductReducer.productList)
    const billList = useSelector((state) => state.BillReducer.billList)
    const customersBillList = useSelector((state) => state.CustomersBillReducer.customersBillList)

    const [selectedProductStock, setSelectedProductStock] = useState(productList.map(val => {
        const obj = {
            productName: val.productName,
            productQuantity: val.productQuantity
        }
        return obj;
    }));

    let selectedProductList = '';
    let priceQuantityTotal = '';
    let billTotal = 0;

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setBillDate('');
        setCustomerName('');
        setProductName('');
        setProductQuantity('');
    }

    const addBillDetails = () => {
        if (productName === "") { alert('please fill productName'); return }
        if (productQuantity === "") { alert('please fill productQuantity'); return }

        productList.map((val, index) => {
            if (val.productName === productName) {
                selectedProductList = val;
            }
        })
        priceQuantityTotal = selectedProductList.productPrice * productQuantity

        if (parseInt(selectedProductStock.filter(e => e.productName === productName)[0].productQuantity) < parseInt(productQuantity)) {
            alert('Please select less Quantity');
        } else if (billList.filter(e => e.selectedProductList.productName === productName).length > 0) {
            billList.map((val, index) => {
                if (val.selectedProductList.productName === productName) {
                    val.productQuantity = parseInt(val.productQuantity) + parseInt(productQuantity)
                    val.priceQuantityTotal = val.selectedProductList.productPrice * val.productQuantity
                }
            })
        } else {
            dispatch(addBill(billDate, customerName, selectedProductList, productQuantity, priceQuantityTotal))
        }

        if (!(parseInt(selectedProductStock.filter(e => e.productName === productName)[0].productQuantity) < parseInt(productQuantity))) {
            selectedProductStock.map(val => {
                if (selectedProductList.productName === val.productName) {
                    val.productQuantity = val.productQuantity - productQuantity;
                    return val;
                }
            })
        }
    }

    const addCustomersBillDetails = () => {
        if (billDate === "") { alert('please fill date'); return }
        if (customerName === "") { alert('please fill CustomerName'); return }
        customerList.map((customerListData) => {
            if (customerName === customerListData.customerName) {
                dispatch(addCustomersBill(billDate, customerListData, billTotal, billList));
            }
        })
        productList.map((productListVal) => {
            billList.map((billListVal) => {
                if (productListVal.productName === billListVal.selectedProductList.productName) {
                    productListVal.productQuantity = parseInt(productListVal.productQuantity) - parseInt(billListVal.productQuantity);
                }
            })
        })
    }

    return (
        <>
            <form className='container' onSubmit={formSubmitHandler}>
                <div className='col-md-12'>
                    <div className="col-md-12">
                        <h2>Generate Bill</h2><hr />
                    </div>
                </div>
                <div className="form-group col-md-12 col-lg-12 mt-2">
                    <label>Bill Date:</label>&nbsp;
                    <input type="date" id="date" name="date" value={billDate} onChange={(e) => setBillDate(e.target.value)} />
                </div><br />
                <div>
                    <label>Customer Name:</label>&nbsp;
                    <select name="customerName" id="customerId" value={customerName} onChange={(e) => setCustomerName(e.target.value)}>
                        <option value="" hidden disabled>--Select--</option>
                        {customerList.map((val, index) => {
                            return (
                                <option key={index} value={val.customerName}>{val.customerName}</option>
                            )
                        })}
                    </select>
                </div><br />

                <div>
                    <label>Product Name:</label>&nbsp;
                    <select name="productName" id="customerId" value={productName} onChange={(e) => setProductName(e.target.value)}>
                        <option value="" hidden disabled>--Select--</option>
                        {productList.map((val, index) => {
                            return (
                                <option key={index} value={val.productName}>{val.productName}</option>
                            )
                        })}
                    </select>
                </div><br />

                <div>
                    <label>Quantity:</label>&nbsp;
                    <input type="text" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
                </div><br />
                <button className='btn btn-sm btn-success' onClick={addBillDetails}>Add</button>
            </form>

            <div className="container mt-4">
                <table className="table table-striped table-hover container">
                    {(billList.length > 0) ?
                        <thead>
                            <tr className="bg-dark text-light">
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Remove</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead> : ''}

                    <tbody id="flag-list">
                        {billList.map((val, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{val.selectedProductList.productName}</td>
                                    <td>{val.selectedProductList.productPrice}</td>
                                    <td>{val.productQuantity}</td>
                                    <td>{val.priceQuantityTotal}</td>
                                    <td><button className="btn btn-sm btn-primary">Edit</button></td>
                                    <td><button className="btn btn-sm btn-danger" onClick={() => dispatch(deleteBill(index))}>Remove</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {
                    (billList.length > 0) ?
                        <>
                            <label>Total:&nbsp;{
                                billList.forEach(val => {
                                    billTotal += val.priceQuantityTotal
                                })
                            }{billTotal}</label><br />
                            <button className='btn btn-success  mt-3 px-4' onClick={addCustomersBillDetails}>Buy</button>
                        </> : ''
                }
            </div>

            <div className="container mt-4">
                <table className="table table-striped table-hover container">
                    {(customersBillList.length > 0) ?
                        <thead>
                            <tr className="bg-dark text-light">
                                <th scope="col">No.</th>
                                <th scope="col">BillDate</th>
                                <th scope="col">Name</th>
                                <th scope="col">Amount</th>
                                <th scope="col">View Product</th>
                            </tr>
                        </thead> : ''}
                    <tbody id="flag-list">
                        {customersBillList.map((customersBillListVal, customersBillListIndex) => {
                            return (
                                <tr key={customersBillListIndex}>
                                    <td>{customersBillListIndex + 1}</td>
                                    <td>{customersBillListVal.billDate}</td>
                                    <td>{customersBillListVal.customerListData.customerName}</td>
                                    <td>{customersBillListVal.billTotal}</td>
                                    <td>
                                        <p>
                                            <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                                View Products
                                            </a>
                                        </p>
                                        <div className="collapse multi-collapse" id="collapseExample">
                                            <div className="card card-body">
                                                <div className="container mt-4">
                                                    <table className="table table-striped table-hover container">
                                                        {(customersBillList.length > 0) ?
                                                            <thead>
                                                                <tr className="bg-dark text-light">
                                                                    <th scope="col">No.</th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Price</th>
                                                                    <th scope="col">Quantity</th>
                                                                    <th scope="col">Total</th>
                                                                </tr>
                                                            </thead> : ''}
                                                        <tbody id="flag-list" >
                                                            {customersBillListVal.billList.map((billListVal, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{billListVal.selectedProductList.productName}</td>
                                                                        <td>{billListVal.selectedProductList.productPrice}</td>
                                                                        <td>{billListVal.productQuantity}</td>
                                                                        <td>{billListVal.priceQuantityTotal}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Bill