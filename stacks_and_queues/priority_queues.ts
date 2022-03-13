import {print} from "../utils";

class Patient {
  name: string;
  code: number;

  constructor(_name: string, _code: number) {
    this.name = _name;
    this.code = _code;
  }
}

class PriorityQueue {
  dataStore: Patient[];

  constructor() {
    this.dataStore = [];
  }

  enqueue(_element: Patient) {
    this.dataStore.push(_element);
  }

  dequeue() {
    //! Possible issue, stop when reach the minimum, set a mininum?
    if (this.dataStore.length !== 0) {
      let priority = this.dataStore[0].code;
      let index = 0;

      for (let i = 1; i < this.dataStore.length; ++i) {
        if (this.dataStore[i].code < priority) {
          //set new current priority
          priority = this.dataStore[i].code;
          //set new index of priority patient

          index = i;
        }
      }
      return this.dataStore.splice(index, 1);
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
    for (let i = 0; i < this.dataStore.length; ++i) {
      retStr +=
        this.dataStore[i].name + " code: " + this.dataStore[i].code + "\n";
    }
    return retStr;
  }

  empty() {
    if (this.dataStore.length === 0) return true;

    return false;
  }
}

let p = new Patient("Smith", 5);

let ed = new PriorityQueue();

ed.enqueue(p);
p = new Patient("Jones", 4);
ed.enqueue(p);
p = new Patient("Fehrenbach", 6);
ed.enqueue(p);
p = new Patient("Brown", 1);
ed.enqueue(p);
p = new Patient("Ingram", 1);
ed.enqueue(p);

print(ed.toString());

let seen = ed.dequeue()!;

print("Patient being treated: " + seen[0].name);
