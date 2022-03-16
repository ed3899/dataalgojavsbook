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
  vertexList: string[];

  constructor(_v: number) {
    this.vertices = _v;
    this.edges = 0;
    this.adj = [];
    this.marked = [];
    this.edgeTo = [];
    this.vertexList = [];
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

  private topSortHelper(_v: number, _visited: boolean[], _stack: number[]) {
    _visited[_v] = true;

    for (const edge of this.adj[_v]) {
      if (edge !== undefined && !_visited[edge]) {
        this.topSortHelper(edge, _visited, _stack);
      }
    }

    _stack.push(_v);
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

  topSort() {
    const stack: number[] = [];
    const visited: boolean[] = [];

    for (let i = 0; i < this.vertices; i++) {
      visited[i] = false;
    }

    for (let i = 0; i < this.vertices; i++) {
      if (visited[i] === false) {
        this.topSortHelper(i, visited, stack);
      }
    }

    for (let i = 0; i < stack.length; i++) {
      if (stack[i] !== undefined && visited[i] !== false) {
        console.log(this.vertexList[stack[i]]);
      }
    }
  }
}

const g = new Graph(6);

// g.addEdge(0, 1);
// g.addEdge(1, 2);
// g.addEdge(1, 3);
// g.addEdge(3, 4);
// g.addEdge(3, 5);

g.addEdge(1, 2);
g.addEdge(2, 5);
g.addEdge(1, 3);
g.addEdge(1, 4);
g.addEdge(0, 1);

g.vertexList = [
  "CS1",
  "CS2",
  "Data Structures",
  "Assembly Language",
  "Operating Systems",
  "Algorithms",
];

g.topSort();
