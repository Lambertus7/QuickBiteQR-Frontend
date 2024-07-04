import router from "next/router";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import Counter from "./Counter";
import { Order } from "@/pages/dine/[location_id].tsx/[table_id]";

export const itemValidator = z
  .object({
    id: z.number().positive(),
    title: z.string(),
    description: z.string(),
    frequent: z.boolean(),
    // imgUrl: z.string().url(),
    price: z.number(),
    categoryId: z.number().positive(),
    locationId: z.number().positive(),
    category: z.object({
      id: z.number(),
      name: z.string(),
    }),
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
  // | "imgUrl"
  | "id"
  | "categoryId"
> & {
  currentOrder: Order;
  orderUpdater: (val: Order) => void;
};

export const RenderItem = ({
  id,
  title,
  description,
  frequent,
  price,
  categoryId,
  currentOrder,
  orderUpdater,
}: RenderItemProps) => {
  return (
    <div className="list-container" key={title}>
      <h2>
        {title} {description}
      </h2>
      <strong>
        <p>{price}</p>
      </strong>
      <Counter itemId={id} currentOrder={currentOrder} updater={orderUpdater} />
    </div>
  );
};
