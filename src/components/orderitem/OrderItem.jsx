import React from 'react'
import '../orderitem/style.scss';
import veg from '../../assets/images/veg.svg'
import nonVeg from '../../assets/images/non_veg.svg'
const OrderItem = ({name, price, description, type, id, qty}) => {
  console.log(qty)
  return (
    <div className='ordered-item-container' key={id}>
        <div className='image-container'>
            <img src='https://api.zerocarbs.in/uploads/menu/item/1725360653640343.jpg'/>
        </div>
        <div className='ordered-item-description-container'>
           <div className='food-type'>
            <img src={ type == "veg" ? veg: nonVeg}/>
            </div> 
            <div className='ordered-item-description'>
                    <span className='ordered-item-name'>{name}</span>
                    <span className='ordered-item-desc'>{description}</span>
                    <span>{qty}XRs <span className='ordered-item-price'>{price}</span></span>
            </div>
        </div>
    </div>
  )
}

export default OrderItem