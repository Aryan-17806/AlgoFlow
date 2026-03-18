function stackPush(stack, item, maxSize) {
  if (stack.length === maxSize) {
    throw new Error("Stack Overflow: Cannot push onto a full stack.");
  }
    stack.push(item);
}
export default stackPush;