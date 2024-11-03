import React, { useState } from 'react'
import '../order-details/style.scss';
import OrderItem from '../../components/orderitem/OrderItem';
import { fetchOrderDetails } from '../../utils/WebApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const OrderDetails = () => {
const [orderDetails, setOrderDetails] = useState({})
    const location = useLocation();
    const { id } = location.state || {}; 
    useEffect(() => {
        const getMenu = async () => {
          try {
            if(id !=null){
                const fetchedMenu = await fetchOrderDetails(id);
                // console.log('Fetched menu:', fetchedMenu.data);
                    setOrderDetails(fetchedMenu?.data)
                console.log(fetchedMenu)
            }else{
              navigate('/menu');
            }
          
          } catch (error) {
            console.error('Error fetching menu:', error);
          }
        };
        getMenu();
      }, [id]);
    




    const recentOrders = [
        { name: 'Exotic Oats Meal Bowl', price: 8.99 },
        { name: 'Oats Chilla with Mixed Egg', price: 7.49 },
        { name: 'Fajita Chicken Salad', price: 10.99 },
        { name: 'Quinoa Bowl with Avocado', price: 9.49 },
        { name: 'Berry Smoothie', price: 5.99 },
      ];
      
  return (
    <>
    <div className='order-details'>OrderDetails

    <div className='order-info'>
<div className='order-id'>
    <span><span style={{fontWeight:"bold"}}>Order#</span> {id}</span>
</div>
<hr/>
<div className='order-delivery-info'>
<ul>
    <li>
        Pick up Order
    </li>
    <li>
        Pick up Time
    </li>
</ul>
</div>

    </div>

    <div className='order-items'>
      {/* {orderDetails && orderDetails?.order_summary && orderDetails?.order_summary[0]?.item}
        {orderDetails && orderDetails?.order_summary && orderDetails?.order_summary[0]?.item?.map((item)=>{

            console.log(item)
            return         <OrderItem key={item?.id} qty={item?.qty} id={item?.id} name={item?.name} price={item.price} description={item?.description} type={item?.type}/>
        })} */}


{orderDetails && orderDetails?.order_summary?.map((item) => {
        const product = item.item[0];  // Access the first item in the nested array
        return (
          <OrderItem
            key={item.id}
            qty={item.qty}
            id={product.id}
            name={product.name}
            price={item.price}
            description={product.description}
            type={product.type}
            image={product.image}
          />
        );
      })}
      
    </div>
    
    <div style={{margin:"10px"}}>
    <div className='order-summary-list-container'>
    <h5 className='order-summary-title'>Order Summary</h5>
        <ul>
        {orderDetails && orderDetails?.order_summary?.map((summaryItem, index) => (
            <li key={index} className="order-item">
              <span className='order-item-name'>{summaryItem.name}</span>
              <span className='order-item-kcal fw-bold'>{summaryItem.qty}  X {summaryItem.price}</span>
            </li>
          ))}
        </ul>

   

        <hr/>
        <div className='payable-amount'>
            <span>Total Payable Amount</span>
            <span className='fw-bold'>Rs {orderDetails?.grand_total}</span>
        </div>
</div>
       
    </div>
    </div>
    
    </>
  )
}

export default OrderDetails