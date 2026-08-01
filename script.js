const rows = document.querySelectorAll('tbody tr');
const gradeMap = {
  'S': 5.0,
  'A+': 4.3,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

function getLetterGrade(average) {
  if (average >= 4.8) return 'S';
  if (average >= 4.0) return 'A';
  if (average >= 3.7) return 'A-';
  if (average >= 3.3) return 'B+';
  if (average >= 3.0) return 'B';
  if (average >= 2.7) return 'B-';
  if (average >= 2.3) return 'C+';
  if (average >= 2.0) return 'C';
  if (average >= 1.7) return 'C-';
  if (average >= 1.3) return 'D+';
  if (average >= 1.0) return 'D';
  if (average >= 0.7) return 'D-';
  return 'F';
}

rows.forEach((row) => {
  const cells = row.querySelectorAll('td');
  const myGrade = gradeMap[cells[1].textContent.trim()];
  const friendGrade = gradeMap[cells[2].textContent.trim()];
  const historicalGrade = gradeMap[cells[3].textContent.trim()];
  const finalGradeCell = cells[4];
  const average = (myGrade + friendGrade + historicalGrade) / 3;
  const finalLetter = getLetterGrade(average);

  finalGradeCell.textContent = finalLetter;
  finalGradeCell.classList.add(`grade-${finalLetter.toLowerCase().replace('+', 'plus').replace('-', 'minus')}`);

  [cells[1], cells[2], cells[3]].forEach((cell) => {
    const grade = cell.textContent.trim();
    cell.classList.add(`grade-${grade.toLowerCase().replace('+', 'plus').replace('-', 'minus')}`);
  });
});
