type IterableObject = readonly any[] | null | undefined;

class MySet extends Set {
  constructor(...args: any[]) {
    super(...args);
  }

  union(_set: Set<unknown>): Set<unknown> {
    const tempSet = new Set();

    //Add prexisting values
    for (const item of this.values()) {
      tempSet.add(item);
    }

    //Add new values
    for (const extItem of _set.values()) {
      tempSet.add(extItem);
    }

    return tempSet;
  }
}

const t = new MySet();
t.add("Mike");
t.add("Clayton");
t.add("Jennifer");
t.add("Raymond");

const u = new MySet();
u.add("Raymond");
u.add("Cynthia");
u.add("Jonathan");

const res = t.union(u);

for (const i of res.values()) {
  console.log(i);
}
