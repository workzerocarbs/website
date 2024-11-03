import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import '../promocode/style.scss'
const PromoCodeComponent = () => {
  return (
    <div className='promo-code-container d-flex flex-column gap-1' style={{border: "1px solid lightgrey", padding: "15px 15px"}}>

        <div className='d-flex justify-content-between align-items-center'>
            <div>Enter Promo Code (if available)</div> <div className='d-flex align-items-center'>View All<MdKeyboardArrowRight color='#9cd322' size={20}/></div>
        </div>
      <div className='d-flex gap-1'>
      <input type='text'/> <button className='redeemBtn'>REDEEM</button>
      </div>
    </div>
  )
}

export default PromoCodeComponent