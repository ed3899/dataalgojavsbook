class CArray {
  dataStore: number[];
  pos: number;
  numElements: number;

  constructor(_numElements: number) {
    this.dataStore = [];
    this.pos = 0;
    this.numElements = _numElements;
    this._init();
  }

  private _init() {
    for (let i = 0; i < this.numElements; i++) {
      this.dataStore[i] = i;
    }
  }

  setData() {
    for (let i = 0; i < this.numElements; i++) {
      this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
    }
  }

  clear() {
    for (let i = 0; i < this.dataStore.length; i++) {
      this.dataStore[i] = 0;
    }
  }

  insert(_element: number) {
    this.dataStore[this.pos++] = _element;
  }

  toString() {
    let retStr = "";

    for (let i = 0; i < this.dataStore.length; i++) {
      retStr += this.dataStore[i] + " ";

      if (i > 0 && i % 10 == 0) {
        retStr += "\n";
      }
    }

    return retStr;
  }

  swap(index1: number, index2: number) {
    [this.dataStore[index1], this.dataStore[index2]] = [
      this.dataStore[index2],
      this.dataStore[index1],
    ];
  }

  bubbleSort() {
    const numElements = this.dataStore.length;

    //We only need to loop 9 times
    for (let outer = numElements; outer >= 2; --outer) {
      for (let inner = 0; inner <= outer - 1; ++inner) {
        if (this.dataStore[inner] > this.dataStore[inner + 1]) {
          this.swap(inner, inner + 1);
        }
      }
    }
  }
}

const myNums = new CArray(10);
myNums.setData();
console.log(myNums.toString());

myNums.bubbleSort();

console.log(myNums.toString());
