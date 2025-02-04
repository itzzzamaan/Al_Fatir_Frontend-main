import Card from "./cards/Card";
import PageTitle from "./sub-components/PageTitle";
import { Products } from "./productData";

const Bakhur = () => {
  return (
    <div>
      {/* <PageTitle pageTitle={"Fragrence Floral"} /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Products.map((item, index) => (
          <Card
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

export default Bakhur;
