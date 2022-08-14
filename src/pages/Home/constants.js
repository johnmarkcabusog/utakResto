export const defaultVariation = {
  variation_name:"",
  variation_price:0,
  variation_cost:0,
  variation_stock:0,
}
export const formInitialValues = {
    id:0,
    menu_category: "dessert",
    menu_name:"",
    has_variation:false,
    variations:[
        defaultVariation
    ],
    price:0,
    cost:0,
    stock:0
}


export const categories = [
    {
      value: "",
      label: "Add Category...",
    },
    {
      value: "dessert",
      label: "Dessert",
    },
    {
      value: "snacks",
      label: "Snacks",
    },
    {
      value: "drinks",
      label: "Drinks",
    },
  ];
