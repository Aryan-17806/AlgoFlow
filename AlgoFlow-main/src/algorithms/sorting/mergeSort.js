function sortingAlgo3(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = sortingAlgo3(arr.slice(0, mid));
    const right = sortingAlgo3(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let merged = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            merged.push(left[i]);
            i++;
        } else {
            merged.push(right[j]);
            j++;
        }
    }
    return merged.concat(left.slice(i)).concat(right.slice(j));
}
export default sortingAlgo3;