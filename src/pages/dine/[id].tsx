import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Item, RenderItem } from "@/components/RenderItems";
import { Card } from "@/components/ui/card";

const DinePage = () => {
  const router = useRouter();

  const [items, setItems] = useState<Item[] | null>(null);
  const [filter, setFilter] = useState<
    "all" | "frequent" | "appetizers" | "mainCourse" | "desserts"
  >("all");

  const filterItem = (item: Item): boolean => {
    if (filter === "all") {
      return true;
    }
    if (filter === "frequent") {
      if (item.frequent === true) {
        return true;
      }
    }
    if (filter === "appetizers") {
      if (item.category.name === "Appetizer") {
        return true;
      }
    }
    if (filter === "mainCourse") {
      if (item.category.name === "Main Course") {
        return true;
      }
    }
    if (filter === "desserts") {
      if (item.category.name === "Desserts") return true;
    }
    return false;
  };

  useEffect(() => {
    const getItemsFromApi = async () => {
      const locationId = router.query.id;
      if (!locationId) {
        console.log("ERROR");
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
      {/* <p>{filter}</p> */}
      <div className="filter-buttons">
        <button className="filterBtn" onClick={() => setFilter("all")}>
          Show All
        </button>
        <button className="filterBtn" onClick={() => setFilter("frequent")}>
          Frequent Items
        </button>
        <button className="filterBtn" onClick={() => setFilter("appetizers")}>
          Appetizers
        </button>
        <button className="filterBtn" onClick={() => setFilter("mainCourse")}>
          Main Course
        </button>
        <button className="filterBtn" onClick={() => setFilter("desserts")}>
          Desserts
        </button>
      </div>
      <div className="items-header">
        <ul>
          {items.filter(filterItem).map((item) => (
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
