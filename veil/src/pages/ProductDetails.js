import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams(); // This will get the ID from the URL

  // Fetch product data from your backend using the ID
  // ...

  return (
    <div>
      {/* Display product details here */}
    </div>
  );
};

export default ProductDetails;
