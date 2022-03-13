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

  clear() {
    this.dataStore = [];
    this.listSize = this.pos = 0;
  }

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

  front() {
    this.pos = 0;
  }

  end() {
    this.pos = this.listSize - 1;
  }

  prev() {
    if (this.pos > 0) {
      --this.pos;
    }
  }

  next() {
    if (this.pos < this.listSize - 1) {
      this.pos++;
    }
  }

  length() {
    return this.listSize;
  }

  currPos() {
    return this.pos;
  }

  moveTo(_position: number) {
    this.pos = _position;
  }

  getElement() {
    return this.dataStore[this.pos];
  }

  contains(_element: unknown) {
    for (let i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] == _element) {
        return true;
      }
    }
    return false;
  }
}

const names = new List();

names.append("Clayton");
names.append("Raymond");
names.append("Cynthia");
names.append("Jennifer");
names.append("Bryan");
names.append("Danny");

// names.front();
// print(names.getElement());

// names.next();
// print(names.getElement());

// names.next();
// names.next();
// names.prev();

// print(names.getElement());
// print(names.listSize);

//Traverse forwards
for (names.front(); names.currPos() <= names.length() - 1; names.next()) {
  print(names.getElement());

  if (names.currPos() === names.length() - 1) break;
}

//Traverse backwards

for (names.end(); names.currPos() >= 0; names.prev()) {
  print(names.getElement());

  if (names.currPos() === 0) break;
}
