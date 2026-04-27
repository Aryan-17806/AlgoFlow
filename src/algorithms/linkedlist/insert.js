function insertNode(head, value) {
    const newNode = {
        value: value,
        next: null
    };
    if (head === null) {
        return newNode;
    }
    let current = head;
    while (current.next !== null) {
        current = current.next;
    }
    current.next = newNode;
    return head;
}
function insertNodeAtFirst(head, value) {
    const newNode = {
        value: value,
        next: head
    };
    return newNode;
}
function insertNodeAtEnd(head, value) {
    const newNode = {
        value: value,
        next: null
    };
    if (head === null) {
        return newNode;
    }
    let current = head;
    while (current.next !== null) {
        current = current.next;
    }
    current.next = newNode;
    return head;
}
export default insertNode;
export { insertNodeAtFirst, insertNodeAtEnd };