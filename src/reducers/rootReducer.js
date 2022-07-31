import { CustomerReducer, ProductReducer, BillReducer, CustomersBillReducer } from "./CustomerReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    CustomerReducer,
    ProductReducer,
    BillReducer,
    CustomersBillReducer
})

export default rootReducer;