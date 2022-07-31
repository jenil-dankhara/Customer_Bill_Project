import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, editProduct, deleteProduct } from '../actions/action';

function Product() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productMRP, setProductMRP] = useState('');
    const [addEditButtonChange, setAddEditButtonChange] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.ProductReducer.productList);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setProductName('');
        setProductPrice('');
        setProductQuantity('');
        setProductMRP('');
    }
    return (
        <>
            <form className='container' onSubmit={formSubmitHandler}>
                <div className='col-md-12'>
                    <div className="col-md-12">
                        <h2>Product Entry</h2><hr />
                    </div>
                    <div className="form-group col-md-12 col-lg-12">
                        <label>Product Name</label>
                        <input type="text" className="form-control" id="" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="form-group col-md-12 col-lg-12">
                        <label>Price</label>
                        <input type="text" className="form-control" id="" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                    </div>
                    <div className="form-group col-md-12 col-lg-12">
                        <label>Quantity</label>
                        <input type="text" className="form-control" id="" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
                    </div>
                    <div className="form-group col-md-12 col-lg-12">
                        <label>MRP</label>
                        <input type="text" className="form-control" id="" value={productMRP} onChange={(e) => setProductMRP(e.target.value)} />
                    </div>
                    <div className="form-group col-md-12 mt-3">
                        {
                            (addEditButtonChange) ?
                                <button className='btn btn-success' onClick={() => dispatch(addProduct(productName, productPrice, productQuantity, productMRP))}>Add</button>
                                :
                                <button className='btn btn-primary' onClick={() => dispatch(editProduct(isEditItem, productName, productPrice, productQuantity, productMRP), setAddEditButtonChange(true))}>Edit</button>
                        }
                    </div>

                </div>
            </form>

            <div className="container mt-4">
                <table className="table table-striped table-hover container">
                    {(productList.length > 0) ?
                        <thead>
                            <tr className="bg-dark text-light">
                                <th scope="col">No.</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">MRP</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead> : ''}
                    <tbody id="flag-list">
                        {productList.map((val, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{val.productName}</td>
                                    <td>{val.productPrice}</td>
                                    <td>{val.productQuantity}</td>
                                    <td>{val.productMRP}</td>
                                    <td><button className="btn btn-sm btn-primary" onClick={() => { setProductName(val.productName); setProductPrice(val.productPrice); setProductQuantity(val.productQuantity); setProductMRP(val.productMRP); setIsEditItem(index); setAddEditButtonChange(false) }}>Edit</button></td>
                                    <td><button className="btn btn-sm btn-danger" onClick={() => dispatch(deleteProduct(index))}>Remove</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Product