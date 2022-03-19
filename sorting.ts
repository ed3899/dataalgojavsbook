import {arrayBuffer} from "stream/consumers";

class CArray {
  dataStore: number[];
  pos: number;
  numElements: number;
  gaps: number[];

  constructor(_numElements: number, _gaps: number[] = [5, 3, 1]) {
    this.dataStore = [];
    this.pos = 0;
    this.numElements = _numElements;
    this.gaps = _gaps;
    this._init();
  }

  private _init() {
    for (let i = 0; i < this.numElements; i++) {
      this.dataStore[i] = i;
    }
  }

  /**
   * Bottom up imp
   * @param _arr
   * @param _startLeft
   * @param _stopLeft
   * @param _startRight
   * @param _stopRight
   */
  private mergeArrays(
    _arr: number[],
    _startLeft: number,
    _stopLeft: number,
    _startRight: number,
    _stopRight: number
  ) {
    //Create temp arrays taking into account 1 value, gap.
    const rightArray = new Array(_stopRight - _startRight + 1);
    const leftArray = new Array(_stopLeft - _startLeft + 1);

    let k = _startRight;

    //Populate right array
    for (let i = 0; i < rightArray.length - 1; ++i) {
      rightArray[i] = _arr[k];
      k++;
    }

    k = _startLeft;

    //Populate left array
    for (let i = 0; i < leftArray.length - 1; ++i) {
      leftArray[i] = _arr[k];
      k++;
    }

    //Add sentinel values
    rightArray[rightArray.length - 1] = Infinity;
    leftArray[leftArray.length - 1] = Infinity;

    let m = 0,
      n = 0;

    for (let k = _startLeft; k < _stopRight; k++) {
      //Compare values between both arrays
      if (leftArray[m] <= rightArray[n]) {
        _arr[k] = leftArray[m];
        m++;
      } else {
        _arr[k] = rightArray[n];
        n++;
      }
    }

    console.log(`Array is ${_arr}`);
    console.log(`Left array - ${leftArray}`);
    console.log(`Right array - ${rightArray}`);
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

  shellShort() {
    //Which gap are we applying
    for (let g = 0; g < this.gaps.length; g++) {
      //Select the starting point based on the gap
      for (let i = this.gaps[g]; i < this.dataStore.length; i++) {
        //Initial value, it may cascade down
        let temp = this.dataStore[i];
        //Outside of the for scope
        let j;

        for (
          //Initiate another pointer so we don't change i reference
          j = i;
          //As long as we have enough space for the gap and the left value  is greater
          j >= this.gaps[g] && this.dataStore[j - this.gaps[g]] > temp;
          j -= this.gaps[g]
        ) {
          //Copy to current j
          this.dataStore[j] = this.dataStore[j - this.gaps[g]];
        }
        //Once we are out, assign the initial value to the right spot. Reassign if no changes
        this.dataStore[j] = temp;
      }
    }
  }

  mergeSort() {
    if (this.dataStore.length < 2) {
      return;
    }

    let step = 1;
    let left, right;

    while (step < this.dataStore.length) {
      //Set initial pointer values
      left = 0;
      right = step;

      while (right + step <= this.dataStore.length) {
        this.mergeArrays(
          this.dataStore,
          left,
          left + step,
          right,
          right + step
        );
        //Shift pointers
        left = right + step;
        right = left + step;
      }

      //Includes odd partition
      if (right < this.dataStore.length) {
        this.mergeArrays(
          this.dataStore,
          left,
          left + step,
          right,
          this.dataStore.length
        );
      }

      step *= 2;
    }
  }

  quickSort(_arr: number[] = this.dataStore): number[] {
    if (_arr.length === 0) return [];

    let left = [];
    let right = [];

    let pivot = _arr[0];

    for (let i = 1; i < _arr.length; i++) {
      console.log(`pivot: ${pivot} current element: ${_arr[i]}`);

      if (_arr[i] < pivot) {
        console.log(`moving ${_arr[i]} to the left`);
        left.push(_arr[i]);
      } else {
        console.log(`moving ${_arr[i]} to the right`);
        right.push(_arr[i]);
      }
    }

    return this.quickSort(left).concat(pivot, this.quickSort(right));
  }
}

const ar = new CArray(10);
ar.setData();
console.log(ar.dataStore);
ar.quickSort();
console.log(ar.quickSort());
