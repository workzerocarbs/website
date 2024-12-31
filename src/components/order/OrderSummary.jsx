import { Link } from "react-router-dom";
import "../order/style.scss";
import vegImage from "../../assets/images/veg.svg";
import nonVegImage from "../../assets/images/non_veg.svg";
import { GiCookingPot } from "react-icons/gi";

function OrderSummary({
  cart,
  imageUrl,
  appliedCoupon,
  handleIncrement,
  handleDecrement,
  handleRemoveCoupon,
  setModalVisible,
}) {
  console.log("🚀 ~ cart:", cart);
  return (
    <div className="order-summary">
      <div
        // style={{
        //   border: "1px solid lightgrey",
        //   padding: "5px 5px",
        //   marginBottom: "10px",
        // }}
        className="tw-border-2 tw-border-stone-200 tw-mb-[10px] tw-p-[5px] tw-shadow-inner tw-rounded-sm"
      >
        {Object.values(cart).map((item) => (
          <div key={item.id}>
            <div className="orderSummary d-flex gap-2 w-100 p-2">
              <div className="itemImageContainer d-flex">
                {/* <img src={`${imageUrl}${item.image}`} alt={item.name} /> */}
              </div>
              <div className="d-flex flex-column w-100">
                <div className="d-flex gap-2 align-items-center">
                  <h6 className="tw-font-medium tw-text-stone-700">
                    {item.name}
                  </h6>
                  <img
                    className="food-type"
                    src={item.type === "veg" ? vegImage : nonVegImage}
                    alt={item.type === "veg" ? "Veg" : "Non-Veg"}
                  />
                </div>

                {/* ITEMS PRICE AND INCREMENT AND DECREMENT CONTAINER */}
                <div className="d-flex justify-content-between align-items-center tw-py-2 tw-text-sm">
                  <span className="tw-font-semibold">
                    <span>&#8377; </span>
                    {(item.totalPrice + item.total_toppings_price).toFixed(2)}
                  </span>
                  <div className="tw-border tw-divide-x-2 *:tw-px-2 tw-rounded-md">
                    <button
                      className=""
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="" onClick={() => handleIncrement(item)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-end self-align-center addMore mt-1">
          <Link to="/menu" className="tw-font-medium">
            Add More
          </Link>
        </div>
        <div className="tw-mx-3 tw-mb-3 tw-flex tw-items-center tw-gap-3 tw-border tw-rounded-md tw-px-2 tw-py-2">
          <GiCookingPot className="tw-left-2" size={30} color="#9cd322" />
          <input
            type="text"
            id="additional-info"
            name="additional-info"
            placeholder="Cooking instruction"
            className="tw-border-none tw-outline-none focus:tw-ring-0 placeholder:tw-text-stone-300 placeholder:tw-font-light"
          ></input>
        </div>
      </div>
      {/* <div className="coupons"> 
       {appliedCoupon ? (
          <div className="applied-coupon">
            <h4>
              {appliedCoupon.title} <span>(Applied Coupon)</span>
            </h4>
            <button onClick={handleRemoveCoupon}>Remove</button>
          </div>
        ) : (
          <button
            type="button"
            className="apply-coupon"
            onClick={() => setModalVisible(true)}
          >
            Apply Coupon
          </button>
        )}
       </div> */}
    </div>
  );
}

export default OrderSummary;
