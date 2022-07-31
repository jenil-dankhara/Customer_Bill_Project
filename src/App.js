import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SideNav from './component/SideNav';
import Customer from './component/Customer';
import Product from './component/Product';
import TopNav from './component/TopNav';
import Bill from './component/Bill';
import Report from './component/Report';
import Filter from './component/Filter';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideNav />
        <div className="main">
          <TopNav />
          <Routes>
            <Route path="/" element={<Customer />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Bill" element={<Bill />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/Filter" element={<Filter />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
