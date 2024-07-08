import router from "next/router";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import Counter from "./Counter";
import { Order } from "@/pages/dine/[table_id]";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const itemValidator = z
  .object({
    id: z.number().positive(),
    title: z.string(),
    description: z.string(),
    frequent: z.boolean(),
    price: z.number(),
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
  "title" | "description" | "price" | "frequent" | "id"
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
  currentOrder,
  orderUpdater,
}: RenderItemProps) => {
  return (
    <div className="recipe-card">
      <div className="item-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <strong>
          <p>${price.toFixed(2)}</p>
        </strong>
      </div>
      <div className="item-actions">
        <Counter
          itemId={id}
          currentOrder={currentOrder}
          updater={orderUpdater}
        />
      </div>
    </div>
  );
};
