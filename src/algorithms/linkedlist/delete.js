function deleteNode(head, value) {
    if (head === null) {
        return null;
    }
    if (head.value === value) {
        return head.next;
    }
    let current = head;
    while (current.next !== null) {
        if (current.next.value === value) {
            current.next = current.next.next;
            return head;
        }
        current = current.next;
    }
    return head;
}

function deleteNodeAtfirst(head) {
    if (head === null) {
        return null;
    }
    return head.next;
}
function deleteNodeAtEnd(head) {
    if (head === null) {
        return null;
    }
    if (head.next === null) {
        return null;
    }
    let current = head;     
    while (current.next.next !== null) {
        current = current.next;
    }
    current.next = null;
    return head;
}

export default deleteNode;
export { deleteNodeAtfirst, deleteNodeAtEnd };
