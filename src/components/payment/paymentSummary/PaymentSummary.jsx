import React from 'react'

const PaymentSummary = ({itemTotal, gst, packagingCharges, discountAmount, total, appliedCoupon}) => {
  return (
    <div className="payment-summary">
    <table>
        <tbody>
            <tr>
                <td><h5>Sub Total </h5></td>
                <td><h5>{itemTotal}</h5></td>
            </tr>
            <tr>
                <td><h5>Packaging Charges</h5></td>
                <td><h5>{packagingCharges}</h5></td>
            </tr>
            <tr>
                <td><h5>SGST (2.5%)</h5></td>
                <td><h5>{(gst / 2).toFixed(2)}</h5></td>
            </tr>
            <tr>
                <td><h5>CGST (2.5%)</h5></td>
                <td><h5>{(gst / 2).toFixed(2)}</h5></td>
            </tr>

            {
              appliedCoupon  &&     <tr>
                   <td><h5>Discount</h5></td>
                   <td><h5>-{(discountAmount).toFixed(2)}</h5></td>
               </tr>
            }
            <tr>
                <td><h4>Total</h4></td>
                <td><h4>Rs {Math.round(total)}</h4></td>
            </tr>
        </tbody>

    </table> 
</div>
  )
}
export default PaymentSummary