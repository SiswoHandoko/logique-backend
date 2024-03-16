function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }
  
  // Array yang diberikan
  const bilangan = [99, 2, 64, 8, 111, 33, 65, 11, 102, 50];
  
  // Menggunakan fungsi bubbleSort untuk mengurutkan array
  const sortedBilangan = bubbleSort(bilangan);
  
  console.log("Array setelah diurutkan:", sortedBilangan);