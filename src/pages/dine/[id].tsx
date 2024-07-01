import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Item, RenderItem } from "@/components/RenderItems";
import { Card } from "@/components/ui/card";

const DinePage = () => {
  const router = useRouter();

  const [items, setItems] = useState<Item[] | null>(null);
  const [appetizers, setAppetizers] = useState<boolean>(false);

  useEffect(() => {
    const getItemsFromApi = async () => {
      const locationId = router.query.id;
      if (!locationId) {
        console.log("ERRROR");
        return;
      }
      const response = await fetch(
        `http://localhost:3001/locations/${locationId}/items`
      );
      const data = await response.json();
      setItems(data);
    };
    getItemsFromApi();
  }, [router.query]);

  if (!items) {
    return <p>Loading...</p>;
  }

  //---//

  return (
    <div className="items-page">
      <h1>
        Hello diners! Welcome and enjoy this [Location's] assortment of meals
      </h1>
      <div className="category-buttons">
        <button
          className="category-button"
          onClick={() => setAppetizers(!appetizers)}
        ></button>
      </div>
      <div className="items-header">
        <ul>
          {items.map((item) => (
            <div className="items-card">
              <RenderItem
                key={item.title}
                id={item.id}
                title={item.title}
                categoryId={item.categoryId}
                description={item.description}
                price={item.price}
                frequent={item.frequent}
                imgUrl={item.imgUrl}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default DinePage;
