import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count: count,
      unit: unit,
      ingredient: ingredient
    };
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const idx = this.items.findIndex(el => el.id === id);
    // [2,4, 8] splice(1, 2) -> return [4, 8], original array [2]
    // [2,4, 8] slice(1, 2) -> return 4, original array [2,4, 8]
    this.items.splice(idx, 1);
  }

  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }
}
