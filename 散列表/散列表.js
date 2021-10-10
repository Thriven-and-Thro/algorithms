/****
 *  带碰撞处理的Hash表
 *  实际上在js中,单独实现一个Hash表感觉不是很有实用价值
 *  如果需要通常是直接将Object,Map,Set来当Hash表用
 *
 * 总结：
 *  我写的这个实现把store 从Object换成Array不会有运行性能上的区别
 *  把hash函数改成生成一定范围的值的类型,然后初始化一个指定长度的数组因该会有一定的性能提升
 *  把store换成Map，然后修改相关实现会获得飞越性的提升，因为在js中Map的实现对这种类型的操作做了优化
 */
class HashTable {
  constructor() {
    //创建一个没有原型链的对象
    this.store = Object.create(null);
  }
  /**
   *  Donald E. Knuth在“计算机编程艺术第3卷”中提出的算法，主题是排序和搜索第6.4章。
   * @param {*} string
   *  翻译自别的语言的实现
   *  需要注意的是由于js中没有int类型，number是dobule的标准实现
   *  所以返回前的位运算实际和本来的设想不一致，也就是同样的实现，在别的语言中返回可能不同
   */
  // &：位与 |：位或 ^：位异或
  hash(string) {
    let len = string.length;
    let hash = len;
    for (let i = 0; i < len; i++) {
      hash = (hash << 5) ^ (hash >> 27) ^ string.charCodeAt(i);
    }
    return hash & 0x7fffffff;
  }

  isCresh(item) {
    return Object.prototype.toString.call(item) === "[object Map]";
  }
  /**
   * 约定item必须要有key
   * @param {*} item
   */
  put(item) {
    if (typeof item.key !== "string") {
      throw "item must have key!";
    }
    let hash = this.hash(item.key);
    //碰撞处理
    let cresh = this.store[hash];
    if (cresh) {
      if (cresh.key === item.key) {
        this.store[hash] = item;
        return;
      }

      if (!this.isCresh(cresh)) {
        this.store[hash] = new Map();
      }
      this.store[hash].set(item.key, item);
    } else {
      this.store[hash] = item;
    }
  }
  get(key) {
    let hash = this.hash(key);
    let value = this.store[hash] || null;
    if (this.isCresh(value)) {
      return value.get(key);
    } else {
      return value;
    }
  }
  remove(key) {
    let hash = this.hash(key);
    let value = this.store[hash];
    if (!value) {
      return null;
    }
    if (this.isCresh(value)) {
      value.delete(key);
    } else {
      delete this.store[hash];
    }
  }
  clear() {
    this.store = {};
  }
  print() {
    let values = Object.values(this.store);
    values.forEach((element) => {
      if (this.isCresh(element)) {
        element.forEach((item) => {
          console.log(item);
        });
      } else {
        console.log(element);
      }
    });
  }
}

/**
 * 相比使用Object和Array做store 运行时的性能提升了三分之一
 * 但当前这种用法没有直接使用Map方便，而且直接使用Map会快的多
 */
/**
 * 基础测试
 */
function baseTest() {
  let hashTable = new HashTable();
  for (let i = 0; i < 10; i++) {
    hashTable.put({
      key: "test" + i,
      value: "some value" + i,
    });
  }
  for (let i = 0; i < 10; i++) {
    hashTable.put({
      key: "test" + (10 - i),
      value: "some value" + (10 - i),
    });
  }
  console.log("step1:");
  //随机获取5次
  for (let j = 0; j < 5; j++) {
    let key = "test" + Math.floor(Math.random() * 10);
    console.log(key);
    console.log(hashTable.get(key));
  }
  //获得一次空值
  console.log("get null:", hashTable.get("test10"));
  //修改一次值
  hashTable.put({
    key: "test1",
    value: "change",
  });
  //删除一次值
  hashTable.remove("test2");
  console.log("step2:");
  //输出修改后所有的
  hashTable.print();
}

/**
 * 有序key存取，性能测试
 */
/**
 *  无序key性能测试
 *  这个查找稍微有点不准，会有一定量随机字符串重复
 *  实际结果，创建没有区别，大数据量下由于无序key有一些会碰撞，get的总体用的时间会多不少。
 */
/**
 *  直接使用Object的性能测试
 *  有序就不测了，估计不会有区别，只看不使用hash的无序key
 *  结果:想达到同样的结果创建会比hash后的慢接近四分之三,获取用时差不多
 */
/**
 *  直接使用Map的性能测试
 *  结果：创建用时差不多，但是获取快了一个数量级(十倍不止)
 */

//生成指定长度的字符串
function randomString(len) {
  len = len || 24;
  var chars = "ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
  var maxPos = chars.length;
  var pwd = "";
  for (i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
