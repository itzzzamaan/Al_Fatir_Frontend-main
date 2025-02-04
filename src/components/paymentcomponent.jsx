import React from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const PaymentComponent = () => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const [cartDetails, setCartDetails] = useState({ items: [], totalAmount: 0 }); // Cart summary details
  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        const response = await axios.get(`/users/user/checkout?token=${token}`);
        console.log(response);
        const { cart, addresses } = response.data;
        
        setCartDetails({
          items: cart.items,
          totalAmount: cart.totalAmount,
        });

       
      } catch (error) {
        setError('Failed to fetch checkout details');
      }
    };

    fetchCheckoutDetails();
  }, [token]);

  const handlePayment = () => {
    

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: cartDetails.totalAmount * 100, // Amount in paise
      currency: 'INR',
      name: 'Your Store Name',
      description: 'Order Payment',
      handler: async function (response) {
        console.log('Payment successful:', response);
        try {
          const orderConfirmation = await axios.post(`/order/confirm?token=${token}`, {
            paymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            products: cartDetails.items.map((item) => ({
              product: { _id: item.product._id },
              quantity: item.quantity || 1,
            })),
            deliveryAddress: selectedAddress,
            userEmail: profile.email,
          });
          if (orderConfirmation.data.success) {
            toast.success('Payment successful and order confirmed.');
            navigate('/order-success');
          } else {
            toast.error('Order confirmation failed. Please contact support.');
          }
        } catch (error) {
          console.error('Error confirming order:', error);
          toast.error('Failed to confirm order. Please contact support.');
        }
      },
      prefill: {
        email: profile.email,
        contact: selectedAddress.phoneNumber || '',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h1>Payment Page</h1>
      {isLoading && <p>Loading Razorpay...</p>}
      {error && <p>Error loading Razorpay: {error}</p>}
      <button onClick={handlePayment} disabled={isLoading}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentComponent;