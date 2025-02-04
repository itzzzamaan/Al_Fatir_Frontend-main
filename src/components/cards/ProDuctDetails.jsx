import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTruck, FaGift, FaBox, FaShieldAlt } from 'react-icons/fa';

export const ProDuctDetails = () => {    
      const [activeIndex, setActiveIndex] = useState(null);
    const data = [
        {
          heading: "Do you ship overseas?",
          description: "Yes, we ship all over the world. Shipping costs will apply, and will be added at checkout. We run discounts and promotions all year, so stay tuned for exclusive deals."
        },
        {
          heading: "How long will it take to get my orders?",
          description: "It depends on where you are. Orders processed here will take 5-7 business days to arrive. Overseas deliveries can take anywhere from 7-16 days. Delivery details will be provided in your confirmation email."
        },
        {
          heading: "Can I get my order gift wrapped?",
          description: "Yes, You can get your order gift wrapped! Simply click on the gift wrap option on the product page and select what you want to add. You can also get a handwritten note added."
        }
      ];
    
      const toggleDescription = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
      };

    return (
        <div>
            <div
                className="container-fluid mb-3"
                style={{
                    backgroundColor: '#f9f9f9',
                    padding: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backgroundImage: 'url("https://img.freepik.com/premium-photo/arabian-oud-attar-perfume-agarwood-oil-fragrances-mini-bottle_926199-3065366.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    opacity: 0.8,
                    minHeight: '60vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center" style={{ width: '100%' }}>
                        <h1 className="mb-1 text-white" style={{ fontWeight: 'bold', fontSize: '28px' }}>Subscribe to Our Newsletter</h1>
                        <p className="mb-2 text-white">Get all the latest offers and product updates sent to your inbox</p>

                        <div className="input-group mb-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                aria-label="Email"
                                aria-describedby="basic-addon2"
                                style={{
                                    borderRadius: '20px',
                                    padding: '12px 20px',
                                    fontSize: '16px',
                                    width: 'calc(100% - 120px)',
                                }}
                            />
                            <button
                                className="btn btn-dark"
                                type="button"
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: '20px',
                                    padding: '12px 20px',
                                    marginLeft: '10px',
                                    width: '100px',
                                }}
                            >
                                Subscribe
                            </button>

                        </div>

                    </div>
                </div>
            </div>


            <div
                className="container-fluid mb-3"
                style={{
                    backgroundColor: '#f9f9f9',
                    padding: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div className="row text-center">
                    <div className="col-md-3 col-6 icon-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150px', gap: '5px' }}>
                        <FaTruck style={{ fontSize: '40px', color: '#000' }} />
                        <h4 style={{ fontSize: '17px', fontWeight: '500', color: '#333', marginTop: '5px' }}>Free domestic delivery</h4>
                        <p >On all orders above INR 1000</p>
                    </div>
                    <div className="col-md-3 col-6 icon-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150px', gap: '5px' }}>
                        <FaGift style={{ fontSize: '40px', color: '#000' }} />
                        <h4 style={{ fontSize: '17px', fontWeight: '500', color: '#333', marginTop: '5px' }}>
                            Free sample
                        </h4>

                        <p>Not applicable on Discovery Packs</p>
                    </div>
                    <div className="col-md-3 col-6 icon-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150px', gap: '5px' }}>
                        <FaBox style={{ fontSize: '40px', color: '#000' }} />
                        <h4 style={{ fontSize: '17px', fontWeight: '500', color: '#333', marginTop: '5px' }}>Gift-Wrap</h4>
                        <p>Gift wrap your order along with the name.</p>
                    </div>
                    <div className="col-md-3 col-6 icon-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150px', gap: '5px' }}>
                        <FaShieldAlt style={{ fontSize: '40px', color: '#000' }} />
                        <h4 style={{ fontSize: '17px', fontWeight: '500', color: '#333', marginTop: '5px' }}>Secure payments</h4>
                        <p>Encrypted data to ensure payment security</p>
                    </div>
                </div>
            </div>

            <div
                className="container"
                style={{
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3 text-center">
                            <h1 style={{ fontWeight: 'bold', color: '#333', fontSize: '20px' }}>Frequently Asked Questions</h1>
                        </div>
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="faq-item mb-3"
                                style={{
                                    borderBottom: '1px solid #e0e0e0',
                                    paddingBottom: '15px',
                                    marginBottom: '15px',
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            >
                                <div
                                    className="faq-header d-flex justify-content-between align-items-center"
                                    style={{
                                        cursor: 'pointer',
                                        color: '#007bff',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px 0',
                                        transition: 'background-color 0.3s ease-in-out',
                                    }}
                                    onClick={() => toggleDescription(index)}
                                >
                                    <h4
                                        style={{
                                            margin: 0,
                                            fontSize: '1.2rem',
                                            fontWeight: '500',
                                            color: '#333',
                                        }}
                                    >
                                        {item.heading}
                                    </h4>
                                    {activeIndex === index ? (
                                        <FaMinus style={{ fontSize: '18px', color: '#007bff' }} />
                                    ) : (
                                        <FaPlus style={{ fontSize: '18px', color: '#007bff' }} />
                                    )}
                                </div>
                                <div
                                    style={{
                                        maxHeight: activeIndex === index ? '200px' : '0',
                                        overflow: 'hidden',
                                        transition: 'max-height 0.5s ease-in-out',
                                    }}
                                >
                                    <p
                                        style={{
                                            marginTop: '5px',
                                            fontSize: '1.2rem',
                                            lineHeight: '1.5',
                                            color: '#555',
                                            paddingLeft: '10px',
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div></div>
    )
}
