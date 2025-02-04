const Checkout = () => {
    const [isFormVisible, setIsFormVisible] = React.useState(false);
    const [newAddress, setNewAddress] = React.useState({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phoneNumber: ''
    });
    const [addresses, setAddresses] = React.useState([]); // Store addresses here
  
    const handleAddAddress = (e) => {
      e.preventDefault(); // Prevent page reload on form submission
      
      // Create a new address object with a unique id (simulate _id)
      const addressWithId = {
        ...newAddress,
        _id: Date.now().toString() // Use a unique id generator like Date.now() or UUID in a real app
      };
  
      // Add the new address to the existing addresses
      setAddresses([...addresses, addressWithId]);
  
      // Clear the form after submission
      setNewAddress({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
      });
  
      // Hide the form
      setIsFormVisible(false);
    };
  
    return (
      <div className="checkout-page">
        {/* Toggle Button */}
        <div className="mt-4 p-4">
          <button
            className="text-black font-medium hover:underline"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? 'Cancel' : '+ Add Address'}
          </button>
        </div>
  
        {/* Add Address Form */}
        {isFormVisible && (
          <form className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md" onSubmit={handleAddAddress}>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Add New Address</h3>
  
            <div className="mb-4">
              <input
                type="text"
                placeholder="Address Line 1"
                value={newAddress.addressLine1}
                onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
              />
            </div>
  
            <div className="mb-4">
              <input
                type="text"
                placeholder="Address Line 2"
                value={newAddress.addressLine2}
                onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
              />
            </div>
  
            <div className="mb-4">
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
              />
            </div>
  
            <div className="mb-4">
              <input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
              />
            </div>
  
            <div className="mb-4">
              <input
                type="text"
                placeholder="Postal Code"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
              />
            </div>
  
            <div className="mb-4">
              <input
                type="text"
                placeholder="Country"
                value={newAddress.country}
                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
              />
            </div>
  
            <div className="mb-4">
              <input
                type="text"
                placeholder="Phone Number"
                value={newAddress.phoneNumber}
                onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
                className="p-3 border w-full rounded-md focus:border-black focus:outline-none"
              />
            </div>
  
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full">
              Add Address
            </button>
          </form>
        )}
  
        {/* Display the list of addresses */}
        <div className="addresses-list mt-6">
          {addresses.map((address) => (
            <div key={address._id} className="address-item p-4 bg-gray-100 rounded-lg mb-4">
              <p>{address.addressLine1}, {address.city}, {address.state}, {address.postalCode}, {address.country}</p>
              <p>Phone: {address.phoneNumber}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Checkout;
  