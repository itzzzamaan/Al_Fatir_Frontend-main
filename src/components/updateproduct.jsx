// import React, { useEffect, useState } from 'react';
// import axios from '../utils/axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Updateproduct = () => {
//   const { productId } = useParams(); // Get productId from URL params
//   const navigate = useNavigate(); // For redirecting after success
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     stock: '',
//     images:[],
//     discount: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
//       if (token) {
//         try {
//           const response = await axios.get(`/products/product/${productId}?token=${token}`);
//           const productData = response.data.product;
//           setProduct({
//             ...productData,
//             price: productData.price ? String(productData.price) : '', // Convert price to string
//           });
//         } catch (error) {
//           console.error('Error fetching product details:', error.response ? error.response.data : error.message);
//           setError('Failed to load product details.');
//           toast.error('Error fetching product details.');
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//         toast.error('User does not have a token.');
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prevProduct => ({
//       ...prevProduct,
//       [name]: value
//     }));
//   };

//   const logSubmission = () => {
//     console.log('Form submitted with the following product details:', product);
//   };




//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
//     if (!token) {
//       toast.error('Authentication token not found. Please log in again.');
//       console.error('No token found.');
//       return;
//     }
  
//     const formData = new FormData();
  
//     // Append text fields to FormData
//     formData.append('name', product.name);
//     formData.append('description', product.description);
//     formData.append('price', product.price);
//     formData.append('category', product.category);
//     formData.append('stock', product.stock);
//     formData.append('discount', product.discount);
  
//     // Append each image file to FormData
//     product.images.forEach((image) => {
//       formData.append('images', image); // Append each file
//     });
  
//     try {
//       const response = await axios.put(`/products/product/update/${productId}?token=${token}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       console.log('API Response:', response.data);
//       toast.success('Product updated successfully.');
//       navigate('/products');
//     } catch (error) {
//       console.error('Error updating product:', error.response ? error.response.data : error.message);
//       toast.error('Failed to update product.');
//     }
//   };
  
// const handleFileChange = (e) => {
//   // Store the first selected file
//   setProduct({
//       ...product,
//       images: Array.from(e.target.files) // Get the first selected file
//   });
// };





//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="update-product-page p-4">
      
//       <h1 className="text-3xl font-bold mb-8">Update Product</h1>
//       <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
//         <div className="form-group">
//           <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
//           <input
//             type="text" // Ensure the input is a text field
//             id="price"
//             name="price"
//             value={product.price} // Set price as a string
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="block text-gray-700 mb-2" htmlFor="stock">Stock</label>
//           <input
//             type="number"
//             id="stock"
//             name="stock"
//             value={product.stock}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="form-group">
//   <label className="block text-gray-700 mb-2" htmlFor="images">Upload Image</label>
//   <input
//     type="file"
//     id="images"
//     name="images"
//     // accept="image/*" // Uncomment this to restrict to image file types
//     onChange={handleFileChange}
//     className="w-full p-2 border border-gray-300 rounded"
//     required
//     multiple // Add this if you want to allow multiple file uploads
//   />
// </div>

//         <div className="form-group">
//           <label className="block text-gray-700 mb-2" htmlFor="discount">Discount (%)</label>
//           <input
//             type="number"
//             id="discount"
//             name="discount"
//             value={product.discount}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//         onSubmit={handleSubmit}
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition-colors duration-300"
//         >
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Updateproduct;
import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Updateproduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
    discount: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (token) {
        try {
          const response = await axios.get(`/products/product/${productId}?token=${token}`);
          const productData = response.data.product;
          setProduct({
            ...productData,
            price: productData.price ? String(productData.price) : '',
          });
        } catch (error) {
          setError('Failed to load product details.');
          toast.error('Error fetching product details.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.error('User does not have a token.');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (!token) {
      toast.error('Authentication token not found.');
      return;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('stock', product.stock);
    formData.append('discount', product.discount);
    product.images.forEach(image => formData.append('images', image));

    try {
      const response = await axios.put(`/products/product/update/${productId}?token=${token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Product updated successfully.');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to update product.');
    }
  };

  const handleFileChange = (e) => {
    setProduct({
      ...product,
      images: Array.from(e.target.files)
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="update-product-page flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-10 mx-4">
        <h1 className="text-4xl font-bold text-center mb-10">Update Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="images">Upload Images</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 file:bg-black file:text-white focus:ring-blue-500"
              required
              multiple
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="discount">Discount (%)</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-3 rounded-lg font-semibold hover:bg-white hover:text-black border border-black transition-colors duration-300"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updateproduct;
