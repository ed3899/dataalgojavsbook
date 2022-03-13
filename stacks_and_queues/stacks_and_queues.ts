import {print} from "../utils";

class Queue {
  dataStore: number[];

  constructor() {
    this.dataStore = [];
  }

  enqueue(_element: number) {
    this.dataStore.push(_element);
  }

  dequeue() {
    if (this.dataStore.length !== 0) {
      return this.dataStore.shift();
    }
  }

  front() {
    return this.dataStore[0];
  }

  back() {
    return this.dataStore[this.dataStore.length - 1];
  }

  toString() {
    let retStr = "";

    for (let i = 0; i < this.dataStore.length; i++) {
      retStr += `${this.dataStore[i]} \n`;
    }

    return retStr;
  }

  empty() {
    if (this.dataStore.length === 0) return true;

    return false;
  }
}

const distribute = function (
  _nums: number[],
  _queues: InstanceType<typeof Queue>[],
  _n: number,
  _digit: number
) {
  for (let i = 0; i < _n; i++) {
    if (_digit === 1) {
      _queues[_nums[i] % 10].enqueue(_nums[i]);
    } else {
      _queues[Math.floor(_nums[i] / 10)].enqueue(_nums[i]);
    }
  }
};

const collect = function (
  _queues: InstanceType<typeof Queue>[],
  _nums: number[]
) {
  let i = 0;

  for (let digit = 0; digit < 10; ++digit) {
    //Current queue not empty
    while (!_queues[digit].empty()) {
      //Place at index and then increase index
      _nums[i++] = _queues[digit].dequeue() as number;
    }
  }
};

//Main program
let queues: InstanceType<typeof Queue>[] = [];

//Generate queues
for (let i = 0; i < 10; ++i) {
  queues[i] = new Queue();
}

let nums = [];

//Generate random numbers
for (let i = 0; i < 10; ++i) {
  nums[i] = Math.floor(Math.floor(Math.random() * 101));
}

print("Before radix sort: ");
print(nums);
//Create bins
distribute(nums, queues, 10, 1);
collect(queues, nums);

//Create 2nd round of bins
distribute(nums, queues, 10, 10);
collect(queues, nums);

print("After radix sort");
print(nums);
