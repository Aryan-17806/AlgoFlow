function linklistSearch(head, target) {
    let current = head;
    while (current !== null) {
        if (current.value === target) {
            return true;
        }
        current = current.next;
    }
    return false;
}
export default linklistSearch;