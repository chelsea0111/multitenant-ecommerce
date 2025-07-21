import CategoryDropDown from "./category-dropdown";
import { CustomCategory } from "../types";

interface CategoriesProps {
  data: CustomCategory[];
}

const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap item-center">
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropDown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
