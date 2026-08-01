const rows = document.querySelectorAll('tbody tr');

rows.forEach((row) => {
  const cells = row.querySelectorAll('td');
  const myGrade = Number(cells[1].textContent.trim());
  const friendGrade = Number(cells[2].textContent.trim());
  const historicalGrade = Number(cells[3].textContent.trim());
  const finalGradeCell = cells[4];
  const average = ((myGrade + friendGrade + historicalGrade) / 3).toFixed(1);

  finalGradeCell.textContent = `${average} / 100`;
});
