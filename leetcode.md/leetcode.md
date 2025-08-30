 # LeetCode 设计链表

// 定义链表节点类
<!-- 列表编号 -->
class ListNode {
    constructor(val, next = null) {
        this.val = val;   // 节点存储的值
        this.next = next; // 指向下一个节点的指针
    }
}
<!-- 我的链接列表 -->
class MyLinkedList {
    constructor() {
        this.head = null; // 链表头指针，初始为空
        this.size = 0;    // 链表长度，初始为0
    }

    // 获取指定位置的节点值
    get(index) {
        // 如果索引无效（小于0或大于等于链表长度），返回-1
        if (index < 0 || index >= this.size) {
            return -1;
        }
        
        // 从头节点开始遍历
        let current = this.head;
        // 移动到指定索引的位置
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        
        // 返回该节点的值
        return current.val;
    }

    // 在头部添加节点
    addAtHead(val) {
        // 创建新节点，其next指向当前头节点
        const new_node = new ListNode(val, this.head);
        // 更新头节点为新节点
        this.head = new_node;
        // 链表长度增加
        this.size++;
    }

    // 在尾部添加节点
    addAtTail(val) {
        // 创建新节点
        const new_node = new ListNode(val);
        
        // 如果链表为空，新节点就是头节点
        if (this.size === 0) {
            this.head = new_node;
        } else {
            // 找到最后一个节点
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            // 将新节点连接到最后一个节点后面
            current.next = new_node;
        }
        
        // 链表长度增加
        this.size++;
    }

    // 在指定位置添加节点
    addAtIndex(index, val) {
        // 如果索引大于链表长度，不执行操作
        if (index > this.size) {
            return;
        }
        
        // 如果在头部添加
        if (index <= 0) {
            this.addAtHead(val);
            return;
        }
        
        // 如果在尾部添加
        if (index === this.size) {
            this.addAtTail(val);
            return;
        }
        
        // 找到要插入位置的前一个节点
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        // 创建新节点并插入
        const new_node = new ListNode(val, current.next);
        current.next = new_node;
        
        // 链表长度增加
        this.size++;
    }

    // 删除指定位置的节点
    deleteAtIndex(index) {
        // 如果索引无效，不执行操作
        if (index < 0 || index >= this.size) {
            return;
        }
        
        // 如果要删除头节点
        if (index === 0) {
            this.head = this.head.next;
        } else {
            // 找到要删除节点的前一个节点
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }
            // 跳过要删除的节点
            current.next = current.next.next;
        }
        
        // 链表长度减少
        this.size--;
    }
}