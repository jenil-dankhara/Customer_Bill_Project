import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Report() {
    const customersBillList = useSelector((state) => state.CustomersBillReducer.customersBillList);
    const customerList = useSelector((state) => state.CustomerReducer.customerList);
    const productList = useSelector((state) => state.ProductReducer.productList);

    const [billDate, setBillDate] = useState('');
    const [startBillDate, setStartBillDate] = useState('');
    const [endBillDate, setEndBillDate] = useState('');
    const [dateTotalAmount, setDateTotalAmount] = useState(0);
    const [dateDurationTotalAmount, setDateDurationTotalAmount] = useState(0);

    const addDateTotalAmount = () => {
        let _dateTotalAmount = 0;
        customersBillList.map(val => {
            if (val.billDate === billDate) {
                _dateTotalAmount += val.billTotal;
            }
        })
        setDateTotalAmount(_dateTotalAmount);
    }

    const addDateDurationTotalAmount = () => {
        let _dateTotalAmount = 0;
        customersBillList.map(val => {
            if (val.billDate >= startBillDate && val.billDate <= endBillDate) {
                _dateTotalAmount += val.billTotal;
            }
        })
        setDateDurationTotalAmount(_dateTotalAmount);
    }

    return (
        <div>
            <div className='container'>
                <div className='col-md-12'>
                    <div className="col-md-12">
                        <h2>Bill Report</h2><hr />
                    </div>
                </div>

                <div className="form-group col-md-12 col-lg-12 mt-2">
                    <label>Date:</label>&nbsp;
                    <input type="date" id="date" name="date" value={billDate} onChange={(e) => setBillDate(e.target.value)} />&nbsp;
                    <button className='btn btn-sm btn-success' onClick={addDateTotalAmount}>Get Report</button>&nbsp;&nbsp;
                    <label>Total Amount :</label>&nbsp; {dateTotalAmount}
                </div>

                <div className="form-group col-md-12 col-lg-12 mt-2">
                    <label>Date:</label>&nbsp;
                    <input type="date" id="date" name="date" value={startBillDate} onChange={(e) => setStartBillDate(e.target.value)} />&nbsp;
                    <label>to</label>&nbsp;
                    <input type="date" id="date" name="date" value={endBillDate} onChange={(e) => setEndBillDate(e.target.value)} />&nbsp;
                    <button className='btn btn-sm btn-success' onClick={addDateDurationTotalAmount}>Get Report</button>&nbsp;&nbsp;
                    <label>Total Amount :</label>&nbsp; {dateDurationTotalAmount}
                </div><br />

                <div className="form-group col-md-12 col-lg-12 mt-2">
                    <p>
                        <label>Customer Wise Total Bill :</label>&nbsp;
                        <a className="btn btn-sm btn-success" data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample2" onClick={addDateTotalAmount}>
                            View
                        </a>
                    </p>
                    <div className="collapse multi-collapse" id="collapseExample2">
                        <div className="card card-body">
                            <div className="container mt-4">
                                <table className="table table-striped table-hover container">
                                    {
                                        <thead>
                                            <tr className="bg-dark text-light">
                                                <th scope="col">No.</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>}
                                    <tbody id="flag-list" >
                                        {customerList.map((customerListVal, index) => {
                                            let _total = 0;
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{customerListVal.customerName}</td>
                                                    <td>
                                                        {customersBillList.forEach((customersBillListVal, customersBillListIndex) => {
                                                            if (customerListVal.customerName === customersBillListVal.customerListData.customerName) {
                                                                _total += parseFloat(customersBillListVal.billTotal)
                                                            }
                                                        })}
                                                        {_total}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group col-md-12 col-lg-12 mt-2">
                    <p>
                        <label>Customer Wise Sell Quantity :</label>&nbsp;
                        <a className="btn btn-sm btn-success" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" onClick={addDateTotalAmount}>
                            View Products
                        </a>
                    </p>
                    <div className="collapse multi-collapse" id="collapseExample">
                        <div className="card card-body">
                            <div className="container mt-4">
                                <table className="table table-striped table-hover container">
                                    {
                                        <thead>
                                            <tr className="bg-dark text-light">
                                                <th scope="col">No.</th>
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>}
                                    <tbody id="flag-list" >
                                        {productList.map((productListVal, index) => {
                                            let _total = 0;
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{productListVal.productName}</td>
                                                    <td>
                                                        {customersBillList.forEach((customersBillListVal, customersBillListIndex) => {
                                                            if (productListVal.productName === customersBillListVal.billList[0].selectedProductList.productName) {
                                                                _total += parseFloat(customersBillListVal.billList[0].productQuantity)
                                                            }
                                                        })}
                                                        {_total}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    )
}

export default Report