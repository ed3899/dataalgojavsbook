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

  selectionSort() {
    let min;

    //Only focus on the first 8 elements
    for (let outer = 0; outer <= this.dataStore.length - 2; outer++) {
      min = outer;

      //Focus on the elements following (i+1) keeping a difference of 1 to stay ahead
      for (let inner = outer + 1; inner <= this.dataStore.length - 1; inner++) {
        //Set the min
        if (this.dataStore[inner] < this.dataStore[min]) {
          min = inner;
        }
      }

      this.swap(outer, min);
    }
  }

  insertionSort() {
    let inner, temp;

    for (let outer = 1; outer <= this.dataStore.length - 1; ++outer) {
      temp = this.dataStore[outer];
      inner = outer;

      while (inner > 0 && this.dataStore[inner - 1] >= temp) {
        this.dataStore[inner] = this.dataStore[inner - 1];
        --inner;
      }

      this.dataStore[inner] = temp;
    }
  }
}

const myNums = new CArray(10);
myNums.setData();
console.log(myNums.toString());

myNums.insertionSort();

console.log(myNums.toString());
