const gradeOptions = ['None', 'S', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
const storageKey = 'survivor-speed-grades-v1';
const defaultRows = [
  { player: 'Ava', my: 'A-', friend: 'B+', historical: 'A', final: 'B+' },
  { player: 'Noah', my: 'C+', friend: 'A-', historical: 'B-', final: 'B-' },
  { player: 'Mina', my: 'A+', friend: 'S', historical: 'S', final: 'S' },
  { player: 'Leo', my: 'D+', friend: 'C-', historical: 'C', final: 'D+' },
];

function getGradeClassName(grade) {
  if (!grade || grade === 'None' || grade === '—') {
    return 'grade-none';
  }

  const normalized = grade.toLowerCase().replace(/\+/g, '-plus').replace(/-/g, '-minus');
  return `grade-${normalized}`;
}

function getGradeColor(grade) {
  if (!grade || grade === 'None' || grade === '—') {
    return '#8fa3b0';
  }

  const gradeColors = {
    S: '#7cf0c2',
    'A+': '#67d7ff',
    A: '#8fe3ff',
    'A-': '#67d7ff',
    'B+': '#ffd76b',
    B: '#f7d96c',
    'B-': '#ffd76b',
    'C+': '#ff9f5b',
    C: '#ffb36b',
    'C-': '#ff9f5b',
    'D+': '#ff6666',
    D: '#ff7a7a',
    'D-': '#ff6666',
    F: '#ff4d6d',
  };

  return gradeColors[grade] || '#f3f6fb';
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

function createSelect(grade, dataKey) {
  const select = document.createElement('select');
  select.className = 'grade-select';
  select.setAttribute('aria-label', 'Grade');
  select.dataset.gradeKey = dataKey;

  gradeOptions.forEach((optionValue) => {
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionValue;
    select.appendChild(option);
  });

  select.value = grade || 'None';
  return select;
}

function updateRow(row, entry) {
  const cells = row.querySelectorAll('td');
  const finalCell = cells[4];
  const finalSelect = finalCell.querySelector('select');

  if (finalSelect) {
    finalSelect.value = entry.final || 'None';
    finalSelect.className = `grade-select ${getGradeClassName(finalSelect.value)}`;
    finalSelect.style.color = getGradeColor(finalSelect.value);
  }

  [cells[1], cells[2], cells[3]].forEach((cell) => {
    const select = cell.querySelector('select');
    if (select) {
      select.value = entry[select.dataset.gradeKey] || 'None';
      select.className = `grade-select ${getGradeClassName(select.value)}`;
      select.style.color = getGradeColor(select.value);
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
    const mySelect = createSelect(entry.my, 'my');
    myCell.appendChild(mySelect);
    row.appendChild(myCell);

    const friendCell = document.createElement('td');
    friendCell.setAttribute('data-label', "Friend's Grades");
    const friendSelect = createSelect(entry.friend, 'friend');
    friendCell.appendChild(friendSelect);
    row.appendChild(friendCell);

    const historicalCell = document.createElement('td');
    historicalCell.setAttribute('data-label', 'Historical Grades');
    const historicalSelect = createSelect(entry.historical, 'historical');
    historicalCell.appendChild(historicalSelect);
    row.appendChild(historicalCell);

    const finalCell = document.createElement('td');
    finalCell.className = 'final-grade';
    finalCell.setAttribute('data-label', 'Final Grade');
    const finalSelect = createSelect(entry.final, 'final');
    finalCell.appendChild(finalSelect);
    row.appendChild(finalCell);

    tbody.appendChild(row);

    [mySelect, friendSelect, historicalSelect, finalSelect].forEach((select) => {
      select.addEventListener('change', () => {
        const rowIndex = Number(row.dataset.rowIndex);
        rowsData[rowIndex][select.dataset.gradeKey] = select.value;
        saveRows(rowsData);
        updateRow(row, rowsData[rowIndex]);
      });
    });

    updateRow(row, entry);
  });
}

renderTable();
