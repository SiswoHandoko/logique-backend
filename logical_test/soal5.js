function printPattern(rows, cols) {
    for (let i = 1; i <= rows; i++) {
      let row = '';
      for (let j = i; j <= i + (cols - 1) * rows; j += rows) {
        row += `${j} `;
      }
      console.log(row.trim());
    }
  }
  
  // Contoh penggunaan
  const rows = 4;
  const cols = 3;
  printPattern(rows, cols);