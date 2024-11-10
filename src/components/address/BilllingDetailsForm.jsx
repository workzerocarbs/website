import React, { useState } from 'react';
import "../address/style.scss"
function BillingDetailsForm({
  initialData,
  onSave,
}) {
  console.log("initialData", initialData)
  const [formData, setFormData] = useState({
    buildingHouseNo: initialData.buildingHouseNo || '',
    society: initialData.society || '',
    landmark: initialData.landmark || '',
    contactDetails: initialData.contactDetails || '',
    phoneNo: initialData.phoneNo || '',
    addressType: initialData.addressType || 'Home',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);  // Calls the onSave function passed as a prop with the form data
    }
  };

  return (
    <div className="container p-3" style={{backgroundColor: "white"}}>
      <p className="mb-3 sub-section-header">Enter Address Details</p>

      <form onSubmit={handleSave}>
        <div className="mb-3">
        
          <input
            type="text"
            className=""
            id="buildingHouseNo"
            name="buildingHouseNo"
            value={formData.buildingHouseNo}
            onChange={handleChange}
            placeholder="Enter building or house number"
            required
          />
        </div>

        <div className="mb-3">
     
          <input
            type="text"
            className=""
            id="society"
            name="society"
            value={formData.society}
            onChange={handleChange}
            placeholder="Enter society name"
            required
          />
        </div>

        <div className="mb-3">
       
          <input
            type="text"
            className=""
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="Enter nearby landmark"
          />
        </div>
        <p className="mb-2 sub-section-header">Receiver’s contact details*</p>
        <div className="mb-2">
        
          <input
            type="tel"
            className=""
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="mb-3">
       
          <div className="d-flex gap-2 align-items-center">
          <label className="form-label mb-0">Save as:</label>
            {['Home', 'Office', 'Other'].map((type) => (
              <React.Fragment key={type}>
                <input
                  type="radio"
                  className="btn-check"
                  name="addressType"
                  id={type}
                  value={type}
                  checked={formData.addressType === type}
                  onChange={handleChange}
                />
                <label className="btn address-label-btn" htmlFor={type}>{type}</label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <button type="submit" className="btn  w-100 save-address-detail-btn text-black">Save Address Details</button>
      </form>
    </div>
  );
}

export default BillingDetailsForm;
