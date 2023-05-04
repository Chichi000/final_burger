import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './layout/MetaData';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import Search from './layout/Search';


import Slider, { Range, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layout/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';


const Home = () => {
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    let { keyword } = useParams();

    const notify = (error = '') => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    
    const categories = [
        'Beefburger',
        'Chickenburger',
        'Veggieburger',
        'Fishburger',
        'Cheeseburger',
        'Baconburger'
    ];

    useEffect(() => {
        if (error) {
            notify(error);
        }
        dispatch(getProducts(keyword, currentPage, price, category));
    }, [dispatch, error, currentPage, keyword, price, category]);

    useEffect(() => {
        setDisplayedProducts([]);
    }, [keyword, price, category]);

    useEffect(() => {
        setDisplayedProducts(prevProducts => [...prevProducts, ...products]);
        setHasMore(products.length > 0 && products.length < productsCount);
    }, [products]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount;
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Buy Best Products Online'} />

                
                   
                  <div>
                    <img src='/images/home.png ' style={{ backgroundRepeat: 'no-repeat',backgroundPosition: "center", backgroundSize:"cover", height:'500px', width:'1800px', marginTop: '5.5rem'}}/>

                  </div>
                    
                     <section id="products" className="row d-flex flex-wrap justify-content-center" style={{backgroundImage: "url(/images/home-bg.png)", backgroundRepeat: 'no-repeat',backgroundPosition: "center", backgroundSize:"cover"}}>
                        
                     <div className="row">

                   

                    {keyword ? (
                        <Fragment>
                            <div className="col-6 col-md-3 mt-5 mb-5">
                                <div className="px-5">
                                    <Range
                                        marks={{
                                            1: `$1`,
                                            1000: `$1000`
                                        }}
                                        min={1}
                                        max={1000}
                                        defaultValue={[1, 1000]}
                                        tipFormatter={value => `$${value}`}
                                        tipProps={{
                                            placement: "top",
                                            visible: true
                                        }}
                                        value={price}
                                        onChange={price => setPrice(price)}
                                    />
                                    <hr className="my-5" />

                                </div>
                            </div>
                      <div className="mt-5">
                      <h4 className="mb-3">
                      Categories
                      </h4>
                      <div style={{ display: 'flex', overflowX: 'auto' }}>
                      <ul className="pl-0" style={{ display: 'flex' }}>
                      {categories.map(category => (
                                      <li
                                      style={{
                                        cursor: 'pointer',
                                        listStyleType: 'none',
                                        marginRight: '1rem',
                                        color: 'orangered',
                                        borderWidth:'5px',
                                        borderStyle: "inset",
                                        borderColor:'orange',
                        
                        
                                    }}
                                    key={category}
                                    onClick={() => setCategory(category)}
                                    >
                                          {category}
                                          </li>
                                  ))}
                              </ul>
                              </div>
                      </div>

                            <div className="col-6 col-md-9">
                                <InfiniteScroll
                                    dataLength={products.length}
                                    next={() => setCurrentPage(currentPage + 1)}
                                    hasMore={resPerPage <= filteredProductsCount}
                                    loader={<Loader />}
                                   
                                   
                                >
                                    <div className="row ">
                                        {products.map(product => (
                                            <Product key={product._id} product={product} col={4} />
                                        ))}
                                    </div>
                                
                                </InfiniteScroll>
                            </div>
                        </Fragment>
                    ) : (
                        <InfiniteScroll
                            dataLength={products.length}
                            next={() => setCurrentPage(currentPage + 1)}
                            hasMore={resPerPage <= productsCount}
                            loader={<Loader />}
                          
                            
                           
                          
                        >
                            {products.map(product => (
                                <Product key={product._id} product={product} col={3} />
                            ))}
                           
                        </InfiniteScroll>
                    )}

                </div>
               
               
                <div>
                <h1 id="products_heading" style={{ marginLeft:'20px', fontSize: '80px', color:'gold'}}>Burger Menu </h1>
               
                < Search/>
                <img src="/images/burger-baner.png" style={{backgroundPosition:'center', width:'350px', height:'250px', marginLeft:'100px'}}/>
           
                </div>
            </section>
          
            {resPerPage <= count && (
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
             

                </div>
                
                
            )}

             <div>
             <img src='/images/down.png ' style={{ backgroundRepeat: 'no-repeat',backgroundPosition: "center", backgroundSize:"cover", height:'700px', width:'2000px'}}/>
             </div>




      
            
        </Fragment>
        
    )
    }
    
    
</Fragment>

)}

export default Home
