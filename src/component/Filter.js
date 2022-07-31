import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function Filter() {
    const customersBillList = useSelector((state) => state.CustomersBillReducer.customersBillList);
    const customerList = useSelector((state) => state.CustomerReducer.customerList);
    const productList = useSelector((state) => state.ProductReducer.productList);

    const [startBillDate, setStartBillDate] = useState('');
    const [endBillDate, setEndBillDate] = useState('');
    const [customerGender, setCustomerGender] = useState('');
    const [customerCity, setCustomerCity] = useState('');

    const [value, setValue] = useState([18, 40]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function valuetext(value) {
        return `${value}`;
    }

    return (
        <div>
            <div className='container'>
                <div className='col-md-12'>
                    <div className="col-md-12">
                        <h2>Filter Report</h2><hr />
                    </div>
                </div>

                <div className="form-group col-md-12 col-lg-12 mt-2">
                    <label>Date:</label>&nbsp;
                    <input type="date" id="date" name="date" value={startBillDate} onChange={(e) => setStartBillDate(e.target.value)} />&nbsp;
                    <label>to</label>&nbsp;
                    <input type="date" id="date" name="date" value={endBillDate} onChange={(e) => setEndBillDate(e.target.value)} />&nbsp;
                </div><br />

                <div className="form-group col-md-12 col-lg-12 mt-2">
                    <label>Gender: </label>&nbsp;
                    <input type="radio" id="male" name="customerGender" value="Male" onChange={(e) => setCustomerGender(e.target.value)} checked={customerGender === "Male"} />
                    <label htmlFor="credit">Male </label> &nbsp;
                    <input type="radio" id="female" name="customerGender" value="Female" onChange={(e) => setCustomerGender(e.target.value)} checked={customerGender === "Female"} />
                    <label htmlFor="debit">Female</label>
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

                <div>
                    <label>Age:</label>&nbsp;
                    <Box sx={{ width: 300 }}>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                        />
                    </Box>
                </div><br />

                <div className="form-group col-md-12 col-lg-12 mt-2">
                    <p>
                        <a className="btn btn-success" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            View Bills
                        </a>
                    </p>
                    <div className="collapse multi-collapse" id="collapseExample">
                        <div className="card card-body">
                            <div className="container mt-4">
                                <table className="table table-striped table-hover container">
                                    <thead>
                                        <tr className="bg-dark text-light">
                                            <th scope="col">No.</th>
                                            <th scope="col">BillDate</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">View Product</th>
                                        </tr>
                                    </thead>
                                    {
                                        customersBillList.map((val, index) => {
                                            var today = new Date();
                                            var birthDate = new Date(val.customerListData.customerDOB);
                                            var age_now = today.getFullYear() - birthDate.getFullYear();
                                            var m = today.getMonth() - birthDate.getMonth();
                                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                                age_now--;
                                            }
                                            if (((val.customerListData.customerCity === customerCity || customerCity === '') && (val.customerListData.customerGender === customerGender || customerGender === '') && (val.billDate >= startBillDate || startBillDate === '') && (val.billDate <= endBillDate || endBillDate === '') && value[0] <= age_now && value[1] >= age_now)) {
                                                return (
                                                    <>
                                                        <tbody id="flag-list" key={index}>
                                                            <tr >
                                                                <td>{index + 1}</td>
                                                                <td>{val.billDate}</td>
                                                                <td>{val.customerListData.customerName}</td>
                                                                <td>{val.billTotal}</td>
                                                                <td>
                                                                    <p>
                                                                        <a className="btn btn-primary" data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample2">
                                                                            View Products
                                                                        </a>
                                                                    </p>
                                                                    <div className="collapse multi-collapse" id="collapseExample2">
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
                                                                                        {val.billList.map((billListVal, index) => {
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
                                                        </tbody>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Filter