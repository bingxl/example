
type NodeT = Node | null;

// 二叉树节点
export class Node {
    public key: any;
    public left: NodeT;
    public right: NodeT;

    constructor(key: any) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

// 搜索二叉树, 左孩子 < 根节点 < 右孩子
export class BinarySearchTree {
    // 节点值得比较函数, 返回 -1, 0, 1
    compareFn: ((src: any, dst: any) => number);

    // 搜索二叉树得根节点
    root: NodeT;

    constructor(compareFn) {
        this.compareFn = compareFn;
        this.root = null;
    }

    insert(key: any, node: NodeT = this.root) {
        // 处理根节点为空得情况
        if (node === this.root && this.root === null) {
            this.root = new Node(key);
            return;
        }

        if (this.compareFn(key, node.key) === -1) {
            if (node.left === null) {
                node.left = new Node(key)
                return;
            }
            this.insert(key, node.left);
            return;
        }

        if (node.right === null) {
            node.right = new Node(key);
            return;
        }
        this.insert(key, node.right);
    }

    // 中序遍历
    inOrderTraverse(node: NodeT = this.root, callback: (key: any) => any) {
        if (node !== null) {
            this.inOrderTraverse(node.left, callback);
            callback(node.key);
            this.inOrderTraverse(node.right, callback)
        }
    }

    // 前序遍历
    preOrderTraverse(node: NodeT = this.root, callback) {
        if (node !== null) {
            callback(node.key)
            this.preOrderTraverse(node.left, callback);
            this.preOrderTraverse(node.right, callback);
        }
    }

    // 后序遍历
    afterOrderTraverse(node: NodeT = this.root, callback) {
        if (node !== null) {
            this.afterOrderTraverse(node.left, callback);
            this.afterOrderTraverse(node.right, callback);
            callback(node.key)
        }
    }

    // 返回最小节点
    min(current: NodeT = this.root): NodeT {
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current
    }

    // 返回最小节点
    max(current: NodeT = this.root): NodeT {
        while (current !== null && current.right !== null) {
            current = current.right;
        }
        return current
    }

    // 查找节点
    search(key: any, node: NodeT = this.root): NodeT {
        if (node == null) {
            // 当前节点已为 null, 没找到
            return null;
        }

        if (this.compareFn(key, node.key) === 1) {
            // 比当前节点大
            return this.search(key, node.left)
        }

        if (this.compareFn(key, node.key) === -1) {
            // 比当前节点小
            return this.search(key, node.right);
        }
        // 和当前节点相等
        return node;
    }
}


const compare = (a, b) => {
    if (a > b) {
        return 1
    }
    if (a < b) {
        return -1
    }
    return 0
}
const bst = new BinarySearchTree(compare)
for (let x of [2, 1, 2, 3, 4, 5, 6, 7]) {
    bst.insert(x)
}
console.log(bst.min())