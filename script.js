const rows = document.querySelectorAll('tbody tr');
const gradeMap = { S: 5, A: 4, B: 3, C: 2, D: 1, F: 0 };

function getLetterGrade(average) {
  if (average >= 4.5) return 'S';
  if (average >= 4.0) return 'A';
  if (average >= 3.0) return 'B';
  if (average >= 2.0) return 'C';
  if (average >= 1.0) return 'D';
  return 'F';
}

rows.forEach((row) => {
  const cells = row.querySelectorAll('td');
  const myGrade = gradeMap[cells[1].textContent.trim().toUpperCase()];
  const friendGrade = gradeMap[cells[2].textContent.trim().toUpperCase()];
  const historicalGrade = gradeMap[cells[3].textContent.trim().toUpperCase()];
  const finalGradeCell = cells[4];
  const average = (myGrade + friendGrade + historicalGrade) / 3;
  const finalLetter = getLetterGrade(average);

  finalGradeCell.textContent = finalLetter;
  finalGradeCell.classList.add(`grade-${finalLetter.toLowerCase()}`);

  [cells[1], cells[2], cells[3]].forEach((cell) => {
    const grade = cell.textContent.trim().toUpperCase();
    cell.classList.add(`grade-${grade.toLowerCase()}`);
  });
});
