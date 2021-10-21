class ArrayGraph {
  constructor(direction) {
    this.graph = [];
    this.v = [];
    this.direction = direction;
  }

  // 插入点
  insertVertexes(vArr) {
    this.v = vArr;
    for (let i = 0; i < vArr.length; i++) {
      this.graph[i] = [];
      for (let j = 0; j < vArr.length; j++) {
        this.graph[i][j] = 0;
      }
    }
  }

  // 插入边
  insertEdge(v1, v2) {
    let n1, n2;
    for (let i = 0; i < this.v.length; i++) {
      if (v1 === this.v[i]) n1 = i;
      if (v2 === this.v[i]) n2 = i;
      if (n1 !== undefined && n2 !== undefined) break;
    }
    if (n1 === undefined || n2 === undefined) return -1;

    if (this.direction) {
      this.graph[n1][n2] = 1;
    } else {
      this.graph[n1][n2] = 1;
      this.graph[n2][n1] = 1;
    }
  }
}

console.log("------------test-----------");
let g = new ArrayGraph(false);
g.insertVertexes([1, 2, 3, 4]);
g.insertEdge(1, 2);
g.insertEdge(1, 3);
g.insertEdge(2, 3);
g.insertEdge(2, 4);
g.insertEdge(3, 4);
console.log(g);
let dg = new ArrayGraph(true);
dg.insertVertexes([1, 2, 3, 4]);
dg.insertEdge(1, 2);
dg.insertEdge(3, 1);
dg.insertEdge(2, 3);
dg.insertEdge(3, 2);
dg.insertEdge(4, 2);
dg.insertEdge(4, 3);
console.log(dg);
