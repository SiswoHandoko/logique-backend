function printPattern(rows) {
    for (let i = 1; i <= rows; i++) {
      let row = '';
      for (let j = 1; j <= i; j++) {
        row += `${j} `;
      }
      console.log(row.trim());
    }
  }
  
  // Contoh penggunaan
  const rows = 8;
  printPattern(rows);