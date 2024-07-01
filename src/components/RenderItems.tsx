import router from "next/router";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";

export const itemValidator = z
  .object({
    id: z.number().positive(),
    title: z.string(),
    description: z.string(),
    frequent: z.boolean(),
    imgUrl: z.string().url(),
    price: z.number(),
    categoryId: z.number().positive(),
    locationId: z.number().positive(),
  })
  .strict();

export const arrayOfItemsValidator = z.array(itemValidator);

export type Item = z.infer<typeof itemValidator>;

export type RenderItemProps = Pick<
  Item,
  | "title"
  | "description"
  | "price"
  | "frequent"
  | "imgUrl"
  | "id"
  | "categoryId"
>;

// interface RenderItemProps {
//   title: string;
//   description: string;
//   price: number;
//   frequent: boolean;
//   imgUrl: string;
// }

export const RenderItem = ({
  id,
  title,
  description,
  frequent,
  imgUrl,
  price,
  categoryId,
}: RenderItemProps) => {
  const handleClick = () => {
    router.push(`locations/${id}/items/${id}`);
  };

  return (
    <div className="list-container" key={title}>
      <h2 onClick={handleClick}>
        {title} {imgUrl} {description}
      </h2>
      <div>
        <img src="https://picsum.photos/200/200" alt={title}></img>
      </div>
      <p>{categoryId ? "Appetizer" : "Show all Items"}</p>
      <strong>
        <p>{price}</p>
      </strong>
    </div>
  );
};

const ListofItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setErrors] = useState<ZodError | null>(null);
  const [frequent, setFrequent] = useState<boolean>(false);
  const [appetizers, setAppetizers] = useState<boolean>(false);
  const [mainCourse, setMainCourse] = useState<boolean>(false);
  const [desserts, setDesserts] = useState<boolean>(false);

  useEffect(() => {
    const getItemsFromApi = async () => {
      const response = await fetch("http://localhost:3001/items");
      const data = await response.json();

      const validated = arrayOfItemsValidator.safeParse(data);

      if (validated.success) {
        validated.data.sort((a, b) => a.title.localeCompare(b.title));
        setItems(validated.data);
      } else {
        setErrors(validated.error);
      }
    };
    getItemsFromApi;
  }, []);

  // const frequentItems = frequent
  //   ? items.filter((item) => !item.frequent)
  //   : items;

  const Appetizers = appetizers
    ? items?.filter((item) => !item.categoryId)
    : items;

  if (error !== null) {
    return (
      <div>
        <p>Something went wrong, try again later:</p>
        {error.issues.map((issue, index) => (
          <p key={index}>{issue.message}</p>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="title">List of Meals:</h1>
      <button
        className="appetizer-button"
        onClick={() => setAppetizers(!appetizers)}
      >
        {appetizers ? "Show Appetizers" : "Show all Items"}
      </button>
      {Appetizers.length > 0 ? (
        Appetizers.map((item) => (
          <RenderItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            frequent={item.frequent}
            price={item.price}
            imgUrl={item.imgUrl}
            categoryId={item.categoryId}
          />
        ))
      ) : (
        <p>Loading items...</p>
      )}
    </div>
  );
};
export default ListofItems;
