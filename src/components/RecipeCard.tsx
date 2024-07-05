import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RecipeCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recipe Title</CardTitle>
        <CardDescription>Recipe Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
export default RecipeCard;
