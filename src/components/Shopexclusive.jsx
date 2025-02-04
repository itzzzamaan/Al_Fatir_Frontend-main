import Card2 from "./Card2";
import PageTitle from "./sub-components/PageTitle";
import { Products } from "./productData";

const Shopexclusive = () => {
  return (
    <div>
      {/* <PageTitle pageTitle={"Fragrence Floral"} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Products.map((item, index) => (
          <Card2
            key={index}
            image={item.image}
            route={item.route}
            productName={item.productName}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Shopexclusive;
