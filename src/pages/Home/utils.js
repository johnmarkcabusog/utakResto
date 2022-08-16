import {
  ref,
  get as getFirebase,
  child,
  push,
  set,
  remove,
} from "firebase/database";
import { get } from "lodash";

export const getVariations = async (menu, db) => {
  const variationList = [];
  if (menu.has_variation) {
    const variations = get(menu, "variations", []);
    if (variations.length > 0) {
      const dbRef = ref(db);
      for(let vary of variations){
        const data =  await getFirebase(child(dbRef, "variations/" + vary));
        if(data.exists()){
          variationList.push({ id: vary, ...data.val() })
        }
      }
    }
  }
  return variationList;
};

export const getCategory = (categories, category_id) => {
  const found = categories.find((c) => c.value === category_id);
  return !found ? "Unknown" : found.label;
};

export const addCategory = async (db, category_name) => {
  const categoryRef = ref(db, "categories");
  const newCategory = push(categoryRef);
  const newCategoryRef = ref(db, "categories/" + newCategory.key);
  await set(newCategoryRef, { label: category_name, value: newCategory.key });
};

export const variationData = (variation) => {
  return {
    variation_name: variation.variation_name,
    variation_price: variation.variation_price,
    variation_cost: variation.variation_cost,
    variation_stock: variation.variation_stock,
  };
};

export const menuData = (values) => {
  return {
    menu_name: values.menu_name,
    has_variation: values.has_variation,
    menu_category: values.menu_category,
    price: values.price,
    stock: values.stock,
    cost: values.cost,
  };
};

export const addNewItem = async ({ values, db }) => {
  const { has_variation, variations } = values;
  const menuCollectionRef = ref(db, "menu");
  try {
    if (!has_variation) {
      const newMenuItem = push(menuCollectionRef);
      const menuItemRef = ref(db, "menu/" + newMenuItem.key);
      await set(menuItemRef, { ...values, variations: [] });
    } else {
      // ==> add new variations
      const newMenuItem = push(menuCollectionRef);
      const variationCollectionRef = ref(db, "variations");
      const variationIds = [];
      for (let vData of variations) {
        const newVariation = push(variationCollectionRef);
        const variationItemRef = ref(db, "variations/" + newVariation.key);
        variationIds.push(newVariation.key);
        set(variationItemRef, variationData(vData));
      }
      const menuItemRef = ref(db, "menu/" + newMenuItem.key);
      await set(menuItemRef, { ...menuData(values), variations: variationIds });
    }
  } catch (err) {
    alert("Something went wrong");
  }
};

export const deleteItem = async ({ db, id }) => {
  const dbRef = ref(db);
  const menuItemRef = ref(db, "menu/" + id);
  const menuItem = await getFirebase(child(dbRef, "menu/" + id));
  if (menuItem.exists()) {
    const data = menuItem.val();
    const db_variations = get(data, "variations", []);
    if (data.has_variation) {
      await removeAllVariations(db_variations, db);
    }
  }
  await remove(menuItemRef);
};

export const deleteCategory = async ({ db, id }) => {
  try {
    const categoryRef = ref(db, "categories/" + id);
    await remove(categoryRef);
  } catch (err) {
    console.log("err", err, id);
  }
};

const removeAllVariations = async (db_variations, db) => {
  if (db_variations.length > 0) {
    for (let db_v of db_variations) {
      const variationItemRef = ref(db, "variations/" + db_v);
      await remove(variationItemRef);
    }
  }
};

export const updateItem = async ({ values, db }) => {
  const {
    has_variation,
    variations,
    id,
    cost,
    menu_category,
    menu_name,
    price,
    stock,
  } = values;
  const dbRef = ref(db);

  try {
    const menuItem = await getFirebase(child(dbRef, "menu/" + id));
    if (menuItem.exists()) {
      const data = menuItem.val();
      const db_variations = get(data, "variations", []);

      if (!has_variation) {
        const menuItemRef = ref(db, "menu/" + id);
        await set(menuItemRef, {
          cost,
          has_variation,
          menu_category,
          menu_name,
          price,
          stock,
          variations: [],
        });
        await removeAllVariations(db_variations, db);
      } else {
        //===> remove all existing variations to avoid unseen use cases, needs improvement
        await removeAllVariations(db_variations, db);
        // ==> add new variations
        const variationCollectionRef = ref(db, "variations");
        const variationIds = [];
        for (let vData of variations) {
          const newVariation = push(variationCollectionRef);
          const variationItemRef = ref(db, "variations/" + newVariation.key);
          variationIds.push(newVariation.key);
          set(variationItemRef, variationData(vData));
        }
        const menuItemRef = ref(db, "menu/" + id);
        set(menuItemRef, { ...menuData(values), variations: variationIds });
      }
    }
  } catch (err) {
    console.log("err", err);
    alert("Something went wrong");
  }
};
