import { ref, get as getFirebase, child } from "firebase/database";
import { get } from "lodash";

export const getVariations = (menu, db) => {

  const variationList = [];
  if (menu.has_variation) {
    const variations = get(menu, "variations", []);
    if (variations.length > 0) {
      const dbRef = ref(db);
      variations.forEach((v) => {
        getFirebase(child(dbRef, "variations/" + v)).then((snapshot) => {
          if (snapshot.exists()) {
            variationList.push(snapshot.val());
          }
        });
      });

    }

  }
  return variationList;
};

export const getCategory = (categories, category_id) =>{
    const found = categories.find((c) => c.value === category_id );
      return !found ? "Unknown" : found.label;
}