const gradeOptions = ['None', 'S', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
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
const storageKey = 'survivor-speed-grades-v1';
const defaultRows = [
  { player: 'Ava', my: 'A-', friend: 'B+', historical: 'A' },
  { player: 'Noah', my: 'C+', friend: 'A-', historical: 'B-' },
  { player: 'Mina', my: 'A+', friend: 'S', historical: 'S' },
  { player: 'Leo', my: 'D+', friend: 'C-', historical: 'C' },
];

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

function getGradeClassName(grade) {
  if (!grade || grade === 'None' || grade === '—') {
    return 'grade-none';
  }
  return `grade-${grade.toLowerCase().replace('+', 'plus').replace('-', 'minus')}`;
}

function loadRows() {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed;
      }
    } catch (error) {
      console.warn('Could not parse stored grade data', error);
    }
  }
  return defaultRows;
}

function saveRows(rows) {
  localStorage.setItem(storageKey, JSON.stringify(rows));
}

function createSelect(grade) {
  const select = document.createElement('select');
  select.className = 'grade-select';
  select.setAttribute('aria-label', 'Grade');

  gradeOptions.forEach((optionValue) => {
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionValue;
    select.appendChild(option);
  });

  select.value = grade;
  return select;
}

function updateRow(row, entry) {
  const cells = row.querySelectorAll('td');
  const grades = [entry.my, entry.friend, entry.historical].filter((grade) => grade !== 'None');
  const finalGradeCell = cells[4];

  if (grades.length === 0) {
    finalGradeCell.textContent = '—';
    finalGradeCell.className = 'final-grade grade-none';
  } else {
    const average = grades.reduce((total, grade) => total + gradeMap[grade], 0) / grades.length;
    const finalLetter = getLetterGrade(average);
    finalGradeCell.textContent = finalLetter;
    finalGradeCell.className = `final-grade ${getGradeClassName(finalLetter)}`;
  }

  [cells[1], cells[2], cells[3]].forEach((cell) => {
    const select = cell.querySelector('select');
    if (select) {
      select.className = `grade-select ${getGradeClassName(select.value)}`;
    }
  });
}

function renderTable() {
  const tbody = document.querySelector('tbody');
  const rowsData = loadRows();
  tbody.innerHTML = '';

  rowsData.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.dataset.rowIndex = String(index);

    const playerCell = document.createElement('td');
    playerCell.setAttribute('data-label', 'Player');
    playerCell.textContent = entry.player;
    row.appendChild(playerCell);

    const myCell = document.createElement('td');
    myCell.setAttribute('data-label', 'My Grades');
    const mySelect = createSelect(entry.my);
    mySelect.dataset.gradeType = 'my';
    myCell.appendChild(mySelect);
    row.appendChild(myCell);

    const friendCell = document.createElement('td');
    friendCell.setAttribute('data-label', "Friend's Grades");
    const friendSelect = createSelect(entry.friend);
    friendSelect.dataset.gradeType = 'friend';
    friendCell.appendChild(friendSelect);
    row.appendChild(friendCell);

    const historicalCell = document.createElement('td');
    historicalCell.setAttribute('data-label', 'Historical Grades');
    const historicalSelect = createSelect(entry.historical);
    historicalSelect.dataset.gradeType = 'historical';
    historicalCell.appendChild(historicalSelect);
    row.appendChild(historicalCell);

    const finalCell = document.createElement('td');
    finalCell.className = 'final-grade';
    finalCell.setAttribute('data-label', 'Final Grade');
    row.appendChild(finalCell);

    tbody.appendChild(row);

    [mySelect, friendSelect, historicalSelect].forEach((select) => {
      select.addEventListener('change', () => {
        const rowIndex = Number(row.dataset.rowIndex);
        const type = select.dataset.gradeType;
        rowsData[rowIndex][type] = select.value;
        saveRows(rowsData);
        updateRow(row, rowsData[rowIndex]);
      });
    });

    updateRow(row, entry);
  });
}

renderTable();
