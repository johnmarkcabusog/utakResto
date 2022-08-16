export const defaultVariation = {
  id:0,
  variation_name:"",
  variation_price:0,
  variation_cost:0,
  variation_stock:0,
}

export const formInitialValues = {
    menu_category: 1,
    menu_name:"",
    has_variation:false,
    variations:[
        defaultVariation
    ],
    price:0,
    cost:0,
    stock:0
}

export const CATEGORY_LIMIT = 10;