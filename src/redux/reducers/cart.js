const initialState = {
   items: {},
   totalPrice: 0,
   totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const getTotalSum = (obj, propKey) => {
   return Object.keys(obj).reduce((sum, key) => {
      const [first, second] = propKey.split(".");
      if (second) {
         return obj[key][first][second] + sum;
      } else {
         return obj[key][first] + sum;
      }
   }, 0);
};

function cart(state = initialState, action) {
   switch (action.type) {
      case "ADD_PIZZA_CART":
         const currentPizzaItems = !state.items[action.payload.id]
            ? [action.payload]
            : [...state.items[action.payload.id].items, action.payload];

         const newItems = {
            ...state.items,
            [action.payload.id]: {
               items: currentPizzaItems,
               totalPrice: getTotalPrice(currentPizzaItems),
            },
         };

         // const totalCount = Object.keys(newItems).reduce(
         //    (sum, key) => newItems[key].items.length + sum,
         //    0
         // );
         // const totalPrice = Object.keys(newItems).reduce(
         //    (sum, key) => newItems[key].totalPrice + sum,
         //    0
         // );

         const totalCount = getTotalSum(newItems, "items.length");
         const totalPrice = getTotalSum(newItems, "totalPrice");

         return {
            ...state,
            items: newItems,
            totalCount,
            totalPrice,
         };

      case "REMOVE_CART_ITEM":
         const newObj = {
            ...state.items,
         };
         const currentTotalPrice = newObj[action.payload].totalPrice;
         const currentTotalCount = newObj[action.payload].items.length;
         delete newObj[action.payload];
         return {
            ...state,
            items: newObj,
            totalPrice: state.totalPrice - currentTotalPrice,
            totalCount: state.totalCount - currentTotalCount,
         };

      case "PLUS_CART_ITEM": {
         const newObjItmes = [
            ...state.items[action.payload].items,
            state.items[action.payload].items[0],
         ];
         const newItems = {
            ...state.items,
            [action.payload]: {
               items: newObjItmes,
               totalPrice: getTotalPrice(newObjItmes),
            },
         };

         const totalCount = getTotalSum(newItems, "items.length");
         const totalPrice = getTotalSum(newItems, "totalPrice");

         return {
            ...state,
            items: newItems,
            totalCount,
            totalPrice,
         };
      }

      case "MINUS_CART_ITEM": {
         const oldItems = state.items[action.payload].items;
         const newObjItems =
            oldItems.length > 1
               ? state.items[action.payload].items.slice(1)
               : oldItems;

         const newItems = {
            ...state.items,
            [action.payload]: {
               items: newObjItems,
               totalPrice: getTotalPrice(newObjItems),
            },
         };

         const totalCount = getTotalSum(newItems, "items.length");
         const totalPrice = getTotalSum(newItems, "totalPrice");

         return {
            ...state,
            items: newItems,
            totalPrice,
            totalCount,
         };
      }

      case "CLEAR_CART":
         return {
            items: {},
            totalPrice: 0,
            totalCount: 0,
         };

      default:
         return state;
   }
}

export default cart;
