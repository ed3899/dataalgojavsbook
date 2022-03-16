class Vertex<T> {
  label: T;
  wasVisited: boolean;

  constructor(_label: T) {
    this.label = _label;
    this.wasVisited = false;
  }
}

class Graph {
  vertices: number;
  edges: number;
  adj: (number | undefined)[][];
  marked: boolean[];
  edgeTo: number[];

  constructor(_v: number) {
    this.vertices = _v;
    this.edges = 0;
    this.adj = [];
    this.marked = [];
    this.edgeTo = [];
    this._init();
  }

  private _init() {
    for (let i = 0; i < this.vertices; i++) {
      this.adj[i] = [];
      this.adj[i].push(undefined);
    }

    for (let i = 0; i < this.vertices; i++) {
      this.marked[i] = false;
    }
  }

  private hasPathTo(_v: number) {
    return this.marked[_v];
  }

  addEdge(_v: number, _w: number) {
    this.adj[_v].push(_w);
    this.adj[_w].push(_v);
    this.edges++;
  }

  showGraph() {
    for (let i = 0; i < this.vertices; i++) {
      console.log(`${i} -> `);
      for (const edge of this.adj[i]) {
        if (edge !== undefined) {
          console.log(`${edge} \n`);
        }
      }
    }
  }

  dfs(_v: number) {
    //change to visited true
    this.marked[_v] = true;

    //if statement for print is not required
    if (this.adj[_v] !== undefined) {
      console.log("Visited vertex: " + _v);

      for (const edge of this.adj[_v]) {
        //If we haven't visited this edge
        if (!this.marked[edge as number]) {
          this.dfs(edge as number);
        }
      }
    }
  }

  bfs(_s: number) {
    const queue = [];

    this.marked[_s] = true;

    //add to back of queue
    queue.push(_s);

    while (queue.length > 0) {
      //remove from front of queue
      const v = queue.shift();

      if (v !== undefined) {
        console.log(`Visited vertex ${v}`);

        for (const edge of this.adj[v]) {
          //Valid edge
          if (edge !== undefined) {
            //Not already visited
            if (!this.marked[edge]) {
              this.marked[edge] = true;
              this.edgeTo[edge] = v;
              queue.push(edge);
            }
          }
        }
      }
    }
  }

  pathTo(_v: number) {
    const source = 0;

    //there's no path
    if (!this.hasPathTo(_v)) {
      return undefined;
    }

    const path = [];

    for (let i = _v; i !== source; i = this.edgeTo[i]) {
      path.push(i);
    }

    path.push(source);

    return path;
  }
}

const g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.showGraph();
g.bfs(0);

console.log(g.pathTo(4));
