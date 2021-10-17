class ArrayGraph {
  constructor(direction) {
    // 邻接矩阵
    this.grapg = [];
    // 点数组
    this.v = [];
    // 边数
    this.enum = 0;
    // 是否有向
    this.direction = direction;
  }

  // 插入点
  insertVertexes(vArr) {
    this.v = vArr;
    // 初始化邻接矩阵
    for (let i = 0; i < this.v.length; i++) {
      this.grapg[i] = [];
      for (let j = 0; j < this.v.length; j++) {
        this.grapg[i][j] = 0;
      }
    }
  }

  // 插入边
  insertEdge(v1, v2) {
    let n1, n2;
    // 在点数组里找值的对应下标
    for (let i = 0; i < this.v.length; i++) {
      if (this.v[i] === v1) n1 = i;
      if (this.v[i] === v2) n2 = i;
      if (n1 !== undefined && n2 !== undefined) break;
    }
    // 有向
    if (!this.direction) {
      this.grapg[n1][n2] = 1;
      this.grapg[n2][n1] = 1;
      // 无向
    } else {
      this.grapg[n1][n2] = 1;
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
