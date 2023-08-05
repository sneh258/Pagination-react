import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(2);

  const handleProduct = async () => {
    const { data } = await axios.get('https://dummyjson.com/products?limit=100');
    if (data && data.products) {
      setProductData(data.products)
    }
  }

  const handlePage = (number) => {
    if (number >= 1 && number <= productData.length/10 && number!==page)
      setPage(number)
  }

  useEffect(() => {
    handleProduct();
  }, [])
  return (
    <>
      <div className="App">
        {productData.slice(page * 10 - 10, page * 10).map((data) => {
          return (<div className='products' key={data.id}><img src={data.thumbnail} alt={data.title} />
            <div className='title'>{data.title}</div></div>)
        })}
      </div>
      <div>{productData.length && <div className='pagination'>
        <span onClick={() => { handlePage(page - 1); }} className={page > 1 ? "" : "pagination__disable"}>◀︎</span>
        {[...Array(productData.length / 10)].map((_, i) => {
          return <span key={i} className={page === i + 1 ? "pagination_selected" : ""} onClick={() => { handlePage(i + 1); }}>{i + 1}</span>
        })}
        <span  className={page < productData.length / 10 ? "" : "pagination__disable"} onClick={() => { handlePage(page + 1); }}>▶︎</span>

      </div>}</div>
    </>
  );
}

export default App;
