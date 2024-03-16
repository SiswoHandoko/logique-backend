function findMaxNumber(arr) {
    if (arr.length === 0) {
      return null;
    }
  
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
  
    return max;
  }
  
  // Array yang diberikan
  const bilangan = [11, 6, 31, 201, 99, 861, 1, 7, 14, 79];
  
  // Menggunakan fungsi untuk mencari bilangan terbesar
  const maxNumber = findMaxNumber(bilangan);
  
  console.log(`Bilangan terbesar dari array adalah: ${maxNumber}`);