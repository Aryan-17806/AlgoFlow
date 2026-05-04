function prefixEvaluation(expression) {
  const stack = [];
  const tokens = expression.split(' ').reverse();
    for (const token of tokens) {
        if (!isNaN(token)) {
            stack.push(Number(token));  
        } else {
            const a = stack.pop();
            const b = stack.pop();
            let result;
            switch (token) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = a / b;
                    break;
            }
            stack.push(result);
        }
    }
    return stack.pop();
}
export default prefixEvaluation;