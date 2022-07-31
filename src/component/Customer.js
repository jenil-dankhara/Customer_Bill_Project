import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCustomer, editCustomer, deleteCustomer } from '../actions/action';

function Customer(props) {

    const [customerName, setCustomerName] = useState('');
    const [customerMobileNumber, setCustomerMobileNumber] = useState('');
    const [customerGender, setCustomerGender] = useState('');
    const [customerDOB, setCustomerDOB] = useState('');
    const [addEditButtonChange, setAddEditButtonChange] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const [customerCity, setCustomerCity] = useState('');

    const dispatch = useDispatch();
    const customerList = useSelector((state) => state.CustomerReducer.customerList);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setCustomerName('');
        setCustomerMobileNumber('');
        setCustomerGender('');
        setCustomerDOB('');
        setCustomerCity('');
    }

    return (
        <>
            <form className='container' onSubmit={formSubmitHandler}>
                <div className='col-md-12'>
                    <div className="col-md-12">
                        <h2>Customer Entry</h2><hr />
                    </div>
                    <div className="form-group col-md-12 col-lg-12">
                        <label>Name</label>
                        <input type="text" className="form-control" id="" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    </div>
                    <div className="form-group col-md-12 col-lg-12">
                        <label>Mobile No.</label>
                        <input type="text" className="form-control" id="" value={customerMobileNumber} onChange={(e) => setCustomerMobileNumber(e.target.value)} />
                    </div>
                    <div className="form-group col-md-12 col-lg-12 mt-2">
                        <label>Gender: </label>&nbsp;
                        <input type="radio" id="male" name="customerGender" value="Male" onChange={(e) => setCustomerGender(e.target.value)} checked={customerGender === "Male"} />
                        <label htmlFor="credit">Male </label> &nbsp;
                        <input type="radio" id="female" name="customerGender" value="Female" onChange={(e) => setCustomerGender(e.target.value)} checked={customerGender === "Female"} />
                        <label htmlFor="debit">Female</label><br />
                    </div>
                    <div className="form-group col-md-12 col-lg-12 mt-2">
                        <label htmlFor="date">Birth Date:</label>&nbsp;
                        <input type="date" id="date" name="date" value={customerDOB} onChange={(e) => setCustomerDOB(e.target.value)} />
                    </div><br />
                    <div>
                        <label>City:</label>&nbsp;
                        <select name="customerCity" id="customerId" value={customerCity} onChange={(e) => setCustomerCity(e.target.value)}>
                            <option value="" hidden disabled>--Select--</option>
                            <option value="Surat">Surat</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="Vadodara">Vadodara</option>
                            <option value="Rajkot">Rajkot</option>
                            <option value="Bhavnagar">Bhavnagar</option>
                        </select>
                    </div><br />
                    <div className="form-group col-md-12 mt-3">
                        {
                            (addEditButtonChange) ?
                                <button className='btn btn-success' onClick={() => dispatch(addCustomer(customerName, customerMobileNumber, customerGender, customerDOB, customerCity))}>Add</button>
                                :
                                <button className='btn btn-primary' onClick={() => dispatch(editCustomer(isEditItem, customerName, customerMobileNumber, customerGender, customerDOB, customerCity), setAddEditButtonChange(true))}>Edit</button>
                        }
                    </div>

                </div>
            </form>

            <div className="container mt-4">
                <table className="table table-striped table-hover container">
                    {(customerList.length > 0) ?
                        <thead>
                            <tr className="bg-dark text-light">
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Mobile No.</th>
                                <th scope="col">Gender</th>
                                <th scope="col">DOB</th>
                                <th scope="col">City</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead> : ''}
                    <tbody id="flag-list">
                        {customerList.map((val, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{val.customerName}</td>
                                    <td>{val.customerMobileNumber}</td>
                                    <td>{val.customerGender}</td>
                                    <td>{val.customerDOB}</td>
                                    <td>{val.customerCity}</td>
                                    <td><button className="btn btn-sm btn-primary" onClick={() => { setCustomerName(val.customerName); setCustomerMobileNumber(val.customerMobileNumber); setIsEditItem(index); setAddEditButtonChange(false) }}>Edit</button></td>
                                    <td><button className="btn btn-sm btn-danger" onClick={() => dispatch(deleteCustomer(index))}>Remove</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Customer