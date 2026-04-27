function stackPop(stack) {
  if (stack.length === 0) {
    throw new Error("Stack Underflow: Cannot pop from an empty stack.");
  }
    return stack.pop();
}
export default stackPop;