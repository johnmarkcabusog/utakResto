import {object, string, lazy, number,array,addMethod, mixed} from "yup";

const validationSchema = () => {
  addMethod(number, "validateNumberField", function (fields) {
    return this.test("number", "", function (value) {
      const { path } = this;
      const val = value === undefined ? -1 : value;
      const isValid = val >= 0;
      if (!isValid) {
        return this.createError({
          path,
          message: "required",
        });
      }
      return true;
    });
  });

  return lazy(values=>{
    const { has_variation } = values;
    return object({
        menu_category: string().required("Menu Category is required"),
        menu_name: string().required("Name is required"),
        variations: has_variation ? lazy(() => {
          return array().of(
            object({
              variation_name: string().required("required"),
              variation_price: number().validateNumberField(),
              variation_cost: number().validateNumberField(),
              variation_stock: number().validateNumberField(),
            })
          );
        }): mixed(),
        price: number().validateNumberField(),
        cost: number().validateNumberField(),
        stock: number().validateNumberField(),
      });
  })
};

export default validationSchema;
