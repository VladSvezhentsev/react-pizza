import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Categories, LoadingBlock, PizzaBlock, SortPopup } from "../components";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";

const categoryNames = [
   "М'ясні",
   "Вегетаріанські",
   "Гриль",
   "Гострі",
   "Закриті",
];

const sortItems = [
   { name: "популярності", type: "popular" },
   { name: "ціні", type: "price" },
   { name: "алфавіту", type: "name" },
];

function Home() {
   const dispatch = useDispatch();
   const items = useSelector(({ pizzas }) => pizzas.items);
   const cartItems = useSelector(({ cart }) => cart.items);
   const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
   const { category, sortBy } = useSelector(({ filters }) => filters);

   useEffect(() => {
      dispatch(fetchPizzas(sortBy, category));
   }, [category, sortBy]);

   const onSelectCategory = useCallback((index) => {
      dispatch(setCategory(index));
   }, []);

   const onSelectSortType = useCallback((type) => {
      dispatch(setSortBy(type));
   }, []);

   const handleAddPizzaToCart = (obj) => dispatch(addPizzaToCart(obj));

   return (
      <div className="container">
         <div className="content__top">
            <Categories
               activeCategory={category}
               onClickCategory={onSelectCategory}
               items={categoryNames}
            />
            <SortPopup
               activeSortType={sortBy}
               items={sortItems}
               onClickSortType={onSelectSortType}
            />
         </div>
         <h2 className="content__title">Всі піцци</h2>
         <div className="content__items">
            {isLoaded
               ? items.map((item) => (
                    <PizzaBlock
                       onClickAddPizza={handleAddPizzaToCart}
                       key={item.id}
                       addedCount={
                          cartItems[item.id] && cartItems[item.id].items.length
                       }
                       {...item}
                    />
                 ))
               : Array(10)
                    .fill(0)
                    .map((_, index) => <LoadingBlock key={index} />)}
         </div>
      </div>
   );
}

export default Home;
