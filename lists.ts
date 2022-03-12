import {print} from "./utils";

class List {
  listSize: number;
  pos: number;
  dataStore: unknown[];

  constructor() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
  }

  private find(_element: unknown) {
    for (let i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] == _element) {
        return i;
      }
    }
    return -1;
  }

  clear() {}

  toString() {
    return this.dataStore;
  }

  insert(_element: unknown, _after: unknown) {
    let insertPos = this.find(_after);

    if (insertPos > -1) {
      this.dataStore.splice(insertPos + 1, 0, _element);
      ++this.listSize;
      return true;
    }

    return false;
  }

  append(_element: unknown) {
    //After the element is appended, listSize is incremented by 1.
    this.dataStore[this.listSize++] = _element;
  }

  remove(_element: unknown) {
    let foundAt = this.find(_element);

    if (foundAt > -1) {
      this.dataStore.splice(foundAt, 1);
      --this.listSize;
      return true;
    }

    return false;
  }

  front() {}

  end() {}

  prev() {}

  next() {}

  length() {
    return this.listSize;
  }

  currentPos() {}

  moveTo() {}

  getElement() {}

  contains() {}
}
