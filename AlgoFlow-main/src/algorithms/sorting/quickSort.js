function sortingAlgo4(arr, low, high) {
    if (low < high) {
        const pi = partition(arr, low, high);
        sortingAlgo4(arr, low, pi - 1);
        sortingAlgo4(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}
export default sortingAlgo4;