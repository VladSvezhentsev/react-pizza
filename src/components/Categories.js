import React, { memo } from "react";
import PropTypes from "prop-types";
import { oneOf } from "prop-types";

const Categories = memo(function Categories({
   activeCategory,
   items,
   onClickCategory,
}) {
   return (
      <div className="categories">
         <ul>
            <li
               className={activeCategory === null ? "active" : ""}
               onClick={() => onClickCategory(null)}
            >
               Всі
            </li>
            {items &&
               items.map((item, index) => (
                  <li
                     key={item}
                     className={activeCategory === index ? "active" : ""}
                     onClick={() => onClickCategory(index)}
                  >
                     {item}
                  </li>
               ))}
         </ul>
      </div>
   );
});

Categories.propTypes = {
   activeCategory: oneOf([PropTypes.number, null]),
   items: PropTypes.arrayOf(PropTypes.string).isRequired,
   onClickCategory: PropTypes.func,
};

Categories.defaultProps = {
   activeCategory: null,
   items: [],
};

export default Categories;
