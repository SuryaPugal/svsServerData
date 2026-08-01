const gradeOptions = ['None', 'S', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
const storageKey = 'survivor-speed-grades-v1';
const votesStorageKey = 'survivor-speed-votes-v6';
const defaultRows = [
  { player: 'Ava', my: 'A-', friend: 'B+', historical: 'A', final: 'B+', notes: '' },
  { player: 'Noah', my: 'C+', friend: 'A-', historical: 'B-', final: 'B-', notes: '' },
  { player: 'Mina', my: 'A+', friend: 'S', historical: 'S', final: 'S', notes: '' },
  { player: 'Leo', my: 'D+', friend: 'C-', historical: 'C', final: 'D+', notes: '' },
  { player: 'Ivy', my: 'B', friend: 'B+', historical: 'A-', final: 'A-', notes: '' },
  { player: 'Kai', my: 'B-', friend: 'C+', historical: 'B', final: 'C+', notes: '' },
  { player: 'Zoe', my: 'A', friend: 'A', historical: 'A+', final: 'A', notes: '' },
  { player: 'Rex', my: 'C', friend: 'D+', historical: 'C-', final: 'D', notes: '' },
  { player: 'Ty', my: 'B+', friend: 'B', historical: 'C+', final: 'B', notes: '' },
  { player: 'Sora', my: 'C-', friend: 'B-', historical: 'C', final: 'C', notes: '' },
  { player: 'Quinn', my: 'A-', friend: 'A', historical: 'B+', final: 'A', notes: '' },
  { player: 'Miles', my: 'B', friend: 'B-', historical: 'B+', final: 'B+', notes: '' },
  { player: 'Nora', my: 'A', friend: 'A-', historical: 'A', final: 'A-', notes: '' },
  { player: 'Elle', my: 'C+', friend: 'C', historical: 'B-', final: 'C+', notes: '' },
  { player: 'Beck', my: 'B-', friend: 'C+', historical: 'C', final: 'B-', notes: '' },
  { player: 'Tori', my: 'A+', friend: 'A', historical: 'A-', final: 'A', notes: '' },
  { player: 'Sam', my: 'D+', friend: 'C-', historical: 'D', final: 'C-', notes: '' },
  { player: 'Juno', my: 'B+', friend: 'A-', historical: 'B', final: 'A-', notes: '' },
  { player: 'Drew', my: 'C', friend: 'B-', historical: 'C+', final: 'C-', notes: '' },
  { player: 'Piper', my: 'A-', friend: 'B+', historical: 'A', final: 'A', notes: '' },
];

function buildRoundVotes(activePlayers, votePlan) {
  const votes = {};
  const voters = [...activePlayers];
  let voterIndex = 0;

  votePlan.forEach((entry) => {
    for (let i = 0; i < entry.count && voterIndex < voters.length; i += 1, voterIndex += 1) {
      votes[voters[voterIndex]] = entry.target;
    }
  });

  const fallbackTarget = votePlan.length ? votePlan[votePlan.length - 1].target : '';
  while (voterIndex < voters.length && fallbackTarget) {
    votes[voters[voterIndex]] = fallbackTarget;
    voterIndex += 1;
  }

  return votes;
}

function buildDefaultVotes() {
  const players = defaultRows.map((row) => row.player);
  const roundPlans = [
    { eliminated: 'Ty', votePlan: [{ target: 'Ty', count: 9 }, { target: 'Mina', count: 4 }, { target: 'Zoe', count: 3 }, { target: 'Ava', count: 2 }, { target: 'Noah', count: 2 }] },
    { eliminated: 'Sora', votePlan: [{ target: 'Sora', count: 8 }, { target: 'Zoe', count: 5 }, { target: 'Mina', count: 3 }, { target: 'Ivy', count: 3 }] },
    { eliminated: 'Quinn', votePlan: [{ target: 'Quinn', count: 7 }, { target: 'Mina', count: 5 }, { target: 'Zoe', count: 4 }, { target: 'Ava', count: 2 }] },
    { eliminated: 'Miles', votePlan: [{ target: 'Miles', count: 6 }, { target: 'Zoe', count: 5 }, { target: 'Mina', count: 4 }, { target: 'Ivy', count: 2 }] },
    { eliminated: 'Nora', votePlan: [{ target: 'Nora', count: 6 }, { target: 'Mina', count: 4 }, { target: 'Zoe', count: 3 }, { target: 'Ava', count: 3 }] },
    { eliminated: 'Elle', votePlan: [{ target: 'Elle', count: 5 }, { target: 'Zoe', count: 4 }, { target: 'Mina', count: 3 }, { target: 'Beck', count: 3 }] },
    { eliminated: 'Beck', votePlan: [{ target: 'Beck', count: 5 }, { target: 'Mina', count: 4 }, { target: 'Zoe', count: 3 }, { target: 'Tori', count: 2 }] },
    { eliminated: 'Tori', votePlan: [{ target: 'Tori', count: 4 }, { target: 'Zoe', count: 4 }, { target: 'Mina', count: 3 }, { target: 'Sam', count: 2 }] },
    { eliminated: 'Sam', votePlan: [{ target: 'Sam', count: 4 }, { target: 'Mina', count: 3 }, { target: 'Zoe', count: 3 }, { target: 'Juno', count: 2 }] },
    { eliminated: 'Juno', votePlan: [{ target: 'Juno', count: 4 }, { target: 'Zoe', count: 3 }, { target: 'Mina', count: 2 }, { target: 'Drew', count: 2 }] },
    { eliminated: 'Drew', votePlan: [{ target: 'Drew', count: 3 }, { target: 'Mina', count: 3 }, { target: 'Zoe', count: 2 }, { target: 'Piper', count: 2 }] },
    { eliminated: 'Piper', votePlan: [{ target: 'Piper', count: 4 }, { target: 'Mina', count: 3 }, { target: 'Zoe', count: 2 }] },
    { eliminated: 'Leo', votePlan: [{ target: 'Leo', count: 4 }, { target: 'Mina', count: 2 }, { target: 'Zoe', count: 2 }] },
    { eliminated: 'Rex', votePlan: [{ target: 'Rex', count: 3 }, { target: 'Mina', count: 2 }, { target: 'Zoe', count: 2 }] },
    { eliminated: 'Kai', votePlan: [{ target: 'Kai', count: 3 }, { target: 'Ivy', count: 2 }, { target: 'Mina', count: 1 }] },
    { eliminated: 'Ava', votePlan: [{ target: 'Ava', count: 3 }, { target: 'Zoe', count: 1 }, { target: 'Mina', count: 1 }] },
    { eliminated: 'Noah', votePlan: [{ target: 'Noah', count: 2 }, { target: 'Mina', count: 1 }, { target: 'Ivy', count: 1 }] },
  ];

  const rounds = [];
  let activePlayers = [...players];

  roundPlans.forEach((step, index) => {
    rounds.push({
      round: index + 1,
      votes: buildRoundVotes(activePlayers, step.votePlan),
      eliminated: step.eliminated,
    });
    activePlayers = activePlayers.filter((player) => player !== step.eliminated);
  });

  return {
    players: players,
    rounds: rounds,
    juryVotes: {
      Ty: 'Mina',
      Sora: 'Zoe',
      Quinn: 'Mina',
      Miles: 'Zoe',
      Nora: 'Mina',
      Elle: 'Zoe',
      Beck: 'Mina',
      Tori: 'Mina',
      Sam: 'Zoe',
      Juno: 'Mina',
      Drew: 'Zoe',
      Piper: 'Mina',
      Leo: 'Ivy',
      Rex: 'Mina',
      Kai: 'Ivy',
      Ava: 'Mina',
      Noah: 'Mina',
    },
  };
}

const defaultVotes = buildDefaultVotes();

const allianceGroups = [
  { name: 'Sunset Alliance', color: '#78e3b4', members: ['Mina', 'Ava', 'Ivy', 'Piper', 'Nora'] },
  { name: 'Underdog Pact', color: '#67d7ff', members: ['Noah', 'Leo', 'Rex', 'Drew', 'Miles'] },
  { name: 'Late-Game Shield', color: '#ffd76b', members: ['Mina', 'Zoe', 'Kai', 'Juno', 'Sam'] },
  { name: 'North Star Crew', color: '#ff9f5b', members: ['Tori', 'Beck', 'Elle', 'Quinn'] },
  { name: 'Fracture Cell', color: '#b78cff', members: ['Ty', 'Sora', 'Mina', 'Zoe', 'Tori'] },
];

const tribeTimeline = {
  original: {
    Ember: ['Ava', 'Noah', 'Mina', 'Leo', 'Ivy', 'Kai', 'Zoe'],
    Drift: ['Rex', 'Ty', 'Sora', 'Quinn', 'Miles', 'Nora', 'Elle'],
    Pulse: ['Beck', 'Tori', 'Sam', 'Juno', 'Drew', 'Piper'],
  },
  swapOne: {
    Aurora: ['Ava', 'Mina', 'Zoe', 'Rex', 'Beck'],
    Current: ['Noah', 'Leo', 'Ivy', 'Tori', 'Sam'],
    Forge: ['Kai', 'Elle', 'Juno', 'Drew', 'Piper'],
  },
  swapTwo: {
    North: ['Ava', 'Mina', 'Zoe', 'Kai', 'Drew'],
    South: ['Noah', 'Leo', 'Ivy', 'Rex', 'Piper'],
  },
  merge: {
    Unity: ['Ava', 'Noah', 'Mina', 'Leo', 'Ivy'],
  },
};

function getPhaseTribe(player, phase, placement) {
  const phaseCutoffs = {
    original: Number.MAX_SAFE_INTEGER,
    swapOne: 15,
    swapTwo: 10,
    merge: 5,
  };

  if (placement > (phaseCutoffs[phase] || Number.MAX_SAFE_INTEGER)) {
    return '—';
  }

  const groups = tribeTimeline[phase];
  const tribeName = Object.keys(groups).find((name) => groups[name].indexOf(player) >= 0);
  return tribeName || '—';
}

function ordinalLabel(value) {
  const suffixMap = { 1: 'st', 2: 'nd', 3: 'rd' };
  const suffix = suffixMap[value % 10] && value % 100 !== 11 && value % 100 !== 12 && value % 100 !== 13 ? suffixMap[value % 10] : 'th';
  return `${value}${suffix}`;
}
function toAllianceKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function getTribeBadgeClassName(name) {
  if (name === '—') {
    return 'tribe-empty';
  }

  return `tribe-${toAllianceKey(name)}`;
}

function getRoundOutcome(votes, activePlayers) {
  const validTargets = new Set(activePlayers);
  const voteCounts = activePlayers.reduce((accumulator, player) => {
    accumulator[player] = 0;
    return accumulator;
  }, {});

  Object.entries(votes || {}).forEach(([voter, target]) => {
    if (!activePlayers.includes(voter)) {
      return;
    }

    if (typeof target === 'string' && target.trim() && validTargets.has(target.trim())) {
      voteCounts[target.trim()] = (voteCounts[target.trim()] || 0) + 1;
    }
  });

  const topCount = Math.max(...Object.values(voteCounts));
  const leaders = Object.entries(voteCounts)
    .filter(([, count]) => count === topCount)
    .map(([player]) => player)
    .sort((left, right) => left.localeCompare(right));

  return leaders[0] || '';
}

function getRoundVoteCounts(votes, activePlayers) {
  const validTargets = new Set(activePlayers);
  const voteCounts = activePlayers.reduce((accumulator, player) => {
    accumulator[player] = 0;
    return accumulator;
  }, {});

  Object.entries(votes || {}).forEach(([voter, target]) => {
    if (!activePlayers.includes(voter)) {
      return;
    }

    if (typeof target === 'string' && target.trim() && validTargets.has(target.trim())) {
      voteCounts[target.trim()] = (voteCounts[target.trim()] || 0) + 1;
    }
  });

  return voteCounts;
}

function formatVoteSplit(voteCounts, targetPlayer) {
  const counts = Object.values(voteCounts || {})
    .filter((count) => typeof count === 'number' && count > 0)
    .sort((left, right) => right - left);
  const split = counts.join('-');
  if (split) {
    return split;
  }

  const topCount = typeof voteCounts[targetPlayer] === 'number' ? voteCounts[targetPlayer] : 0;
  return String(topCount);
}

function enforceMinimumNodeSpacing(positions, fixedPlayers, minDistance, width, height) {
  const fixed = new Set(fixedPlayers || []);
  const keys = Object.keys(positions);
  const padding = 56;

  for (let pass = 0; pass < 28; pass += 1) {
    let moved = false;

    for (let i = 0; i < keys.length; i += 1) {
      for (let j = i + 1; j < keys.length; j += 1) {
        const leftKey = keys[i];
        const rightKey = keys[j];
        const left = positions[leftKey];
        const right = positions[rightKey];
        if (!left || !right) {
          continue;
        }

        let dx = right.x - left.x;
        let dy = right.y - left.y;
        let distance = Math.hypot(dx, dy);
        if (!distance) {
          dx = (i % 2 === 0 ? 1 : -1) * 0.5;
          dy = (j % 2 === 0 ? 1 : -1) * 0.5;
          distance = Math.hypot(dx, dy);
        }

        if (distance >= minDistance) {
          continue;
        }

        const push = (minDistance - distance) / 2;
        const nx = dx / distance;
        const ny = dy / distance;
        const leftMovable = !fixed.has(leftKey);
        const rightMovable = !fixed.has(rightKey);

        if (leftMovable && rightMovable) {
          left.x -= nx * push;
          left.y -= ny * push;
          right.x += nx * push;
          right.y += ny * push;
        } else if (leftMovable) {
          left.x -= nx * (push * 2);
          left.y -= ny * (push * 2);
        } else if (rightMovable) {
          right.x += nx * (push * 2);
          right.y += ny * (push * 2);
        }

        moved = true;
      }
    }

    Object.keys(positions).forEach((player) => {
      if (fixed.has(player)) {
        return;
      }

      positions[player].x = Math.min(width - padding, Math.max(padding, positions[player].x));
      positions[player].y = Math.min(height - padding, Math.max(padding, positions[player].y));
    });

    if (!moved) {
      break;
    }
  }
}

function computeRoundEliminations(votesData) {
  const players = votesData.players || defaultRows.map((row) => row.player);
  const rounds = votesData.rounds || [];
  const eliminations = [];
  let activePlayers = [...players];

  rounds.forEach((roundEntry) => {
    const outcome = roundEntry.eliminated || getRoundOutcome(roundEntry.votes || {}, activePlayers);
    eliminations.push(outcome);

    if (outcome) {
      activePlayers = activePlayers.filter((player) => player !== outcome);
    }
  });

  return eliminations;
}

function getFinalJurySummary(votesData) {
  const players = votesData.players || defaultRows.map((row) => row.player);
  const rounds = votesData.rounds || [];
  let activePlayers = [...players];
  const juryMembers = [];

  for (const roundEntry of rounds) {
    const outcome = roundEntry.eliminated || getRoundOutcome(roundEntry.votes || {}, activePlayers);
    if (outcome) {
      juryMembers.push(outcome);
      activePlayers = activePlayers.filter((player) => player !== outcome);
    }

    if (activePlayers.length === 3) {
      break;
    }
  }

  const finalists = activePlayers.length === 3 ? [...activePlayers] : [];
  const votes = votesData.juryVotes || {};
  const tally = finalists.reduce((accumulator, player) => {
    accumulator[player] = 0;
    return accumulator;
  }, {});

  juryMembers.forEach((juror) => {
    const target = votes[juror];
    if (target && tally[target] !== undefined) {
      tally[target] += 1;
    }
  });

  const sortedFinalists = finalists.slice().sort((left, right) => {
    const leftScore = tally[left] || 0;
    const rightScore = tally[right] || 0;
    if (leftScore === rightScore) {
      return left.localeCompare(right);
    }
    return rightScore - leftScore;
  });

  return {
    finalists,
    juryMembers,
    tally,
    winner: finalists.length === 3 ? sortedFinalists[0] : '',
  };
}

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
        const merged = defaultRows.map((defaultRow) => {
          const match = parsed.find((row) => row.player === defaultRow.player);
          return match ? { ...defaultRow, ...match } : defaultRow;
        });
        return merged;
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
    finalSelect.style.fontWeight = '700';
  }

  [cells[1], cells[2], cells[3]].forEach((cell) => {
    const select = cell.querySelector('select');
    if (select) {
      select.value = entry[select.dataset.gradeKey] || 'None';
      select.className = `grade-select ${getGradeClassName(select.value)}`;
      select.style.color = getGradeColor(select.value);
      select.style.fontWeight = '700';
    }
  });
}

function renderTable() {
  const tbody = document.getElementById('rankings-body');
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
    myCell.setAttribute('data-label', "Bubbles' Evaluation");
    const mySelect = createSelect(entry.my, 'my');
    myCell.appendChild(mySelect);
    row.appendChild(myCell);

    const friendCell = document.createElement('td');
    friendCell.setAttribute('data-label', "Heist's Evaluation");
    const friendSelect = createSelect(entry.friend, 'friend');
    friendCell.appendChild(friendSelect);
    row.appendChild(friendCell);

    const historicalCell = document.createElement('td');
    historicalCell.setAttribute('data-label', 'Historical Grade');
    const historicalSelect = createSelect(entry.historical, 'historical');
    historicalCell.appendChild(historicalSelect);
    row.appendChild(historicalCell);

    const finalCell = document.createElement('td');
    finalCell.className = 'final-grade';
    finalCell.setAttribute('data-label', "Seal's Determination");
    const finalSelect = createSelect(entry.final, 'final');
    finalCell.appendChild(finalSelect);
    row.appendChild(finalCell);

    const notesCell = document.createElement('td');
    notesCell.setAttribute('data-label', 'Notes');
    const notesArea = document.createElement('textarea');
    notesArea.className = 'notes-input';
    notesArea.placeholder = 'Add notes…';
    notesArea.setAttribute('aria-label', `Notes for ${entry.player}`);
    notesArea.value = entry.notes || '';
    notesArea.rows = 2;
    notesCell.appendChild(notesArea);
    row.appendChild(notesCell);

    tbody.appendChild(row);

    [mySelect, friendSelect, historicalSelect, finalSelect].forEach((select) => {
      select.addEventListener('change', () => {
        const rowIndex = Number(row.dataset.rowIndex);
        rowsData[rowIndex][select.dataset.gradeKey] = select.value;
        saveRows(rowsData);
        updateRow(row, rowsData[rowIndex]);
      });
    });

    notesArea.addEventListener('input', () => {
      const rowIndex = Number(row.dataset.rowIndex);
      rowsData[rowIndex].notes = notesArea.value;
      saveRows(rowsData);
    });

    updateRow(row, entry);
  });
}

function parseLegacyVotes(votesText) {
  return votesText
    .split(/\r?\n/)
    .filter(Boolean)
    .reduce((accumulator, line) => {
      const match = line.match(/^\s*([^->]+?)\s*->\s*(.+?)\s*$/);
      if (match) {
        accumulator[match[1].trim()] = match[2].trim();
      }
      return accumulator;
    }, {});
}

function loadVotes() {
  const stored = localStorage.getItem(votesStorageKey);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.rounds)) {
        return {
          players: defaultRows.map((row) => row.player),
          rounds: parsed.rounds.map((entry, index) => ({
            round: entry.round || index + 1,
            votes: entry.votes || {},
            eliminated: entry.eliminated || '',
          })),
          juryVotes: parsed.juryVotes || {},
        };
      }

      if (Array.isArray(parsed) && parsed.length) {
        return {
          players: defaultRows.map((row) => row.player),
          rounds: parsed.map((entry, index) => ({
            round: index + 1,
            votes: parseLegacyVotes(entry.votes || ''),
            eliminated: '',
          })),
          juryVotes: {},
        };
      }
    } catch (error) {
      console.warn('Could not parse stored vote data', error);
    }
  }
  return defaultVotes;
}

function saveVotes(votes) {
  localStorage.setItem(votesStorageKey, JSON.stringify(votes));
}

function renderVotesTable() {
  const head = document.getElementById('votes-head');
  const tbody = document.getElementById('votes-body');
  const votesData = loadVotes();
  const players = votesData.players || defaultRows.map((row) => row.player);
  const rounds = votesData.rounds || [];
  const roundEliminations = computeRoundEliminations(votesData);
  const jurySummary = getFinalJurySummary(votesData);
  const juryMembers = jurySummary.juryMembers || [];
  const finalists = jurySummary.finalists || [];
  const juryVotes = votesData.juryVotes || {};
  const juryColumnEnabled = finalists.length === 3 || juryMembers.length > 0 || Object.keys(juryVotes).length > 0;
  const finalistOrder = finalists
    .slice()
    .sort((left, right) => {
      const leftScore = jurySummary.tally[left] || 0;
      const rightScore = jurySummary.tally[right] || 0;
      if (leftScore === rightScore) {
        return left.localeCompare(right);
      }
      return rightScore - leftScore;
    });
  const finalistRank = new Map(finalistOrder.map((player, index) => [player, index]));

  head.innerHTML = '';
  tbody.innerHTML = '';

  const headerRow = document.createElement('tr');
  const playerHeader = document.createElement('th');
  playerHeader.setAttribute('scope', 'col');
  playerHeader.textContent = 'Player';
  headerRow.appendChild(playerHeader);

  rounds.forEach((roundEntry) => {
    const roundHeader = document.createElement('th');
    roundHeader.setAttribute('scope', 'col');
    roundHeader.textContent = `Round ${roundEntry.round}`;
    headerRow.appendChild(roundHeader);
  });

  if (juryColumnEnabled) {
    const juryHeader = document.createElement('th');
    juryHeader.setAttribute('scope', 'col');
    juryHeader.textContent = 'Jury';
    headerRow.appendChild(juryHeader);
  }

  head.appendChild(headerRow);

  const eliminationRank = new Map();
  roundEliminations.forEach((player, index) => {
    if (player) {
      eliminationRank.set(player, index);
    }
  });

  const sortedPlayers = [...players].sort((left, right) => {
    const leftIndex = eliminationRank.get(left) ?? Number.MAX_SAFE_INTEGER;
    const rightIndex = eliminationRank.get(right) ?? Number.MAX_SAFE_INTEGER;

    const leftIsFinalist = finalistRank.has(left);
    const rightIsFinalist = finalistRank.has(right);

    if (leftIsFinalist && rightIsFinalist) {
      return finalistRank.get(left) - finalistRank.get(right);
    }

    if (leftIsFinalist !== rightIsFinalist) {
      return leftIsFinalist ? -1 : 1;
    }

    if (leftIndex === rightIndex) {
      return left.localeCompare(right);
    }
    return rightIndex - leftIndex;
  });

  sortedPlayers.forEach((player) => {
    const row = document.createElement('tr');

    const playerCell = document.createElement('td');
    playerCell.setAttribute('data-label', 'Player');
    playerCell.textContent = player;
    row.appendChild(playerCell);

    rounds.forEach((roundEntry, roundIndex) => {
      const cell = document.createElement('td');
      cell.setAttribute('data-label', `Round ${roundEntry.round}`);

      const voteTarget = roundEntry.votes[player] || '';
      const voteValue = voteTarget ? `${voteTarget}` : '—';
      const voteCell = document.createElement('div');
      voteCell.className = 'vote-value';
      voteCell.textContent = voteValue;

      const eliminatedInRound = roundEliminations[roundIndex] === player;
      if (eliminatedInRound) {
        voteCell.classList.add('vote-eliminated');
      }

      cell.appendChild(voteCell);
      row.appendChild(cell);
    });

    if (juryColumnEnabled) {
      const juryCell = document.createElement('td');
      juryCell.setAttribute('data-label', 'Jury');
      juryCell.className = 'jury-vote-cell';

      if (juryMembers.indexOf(player) >= 0 && finalists.length === 3) {
        const select = document.createElement('select');
        select.className = 'jury-select';
        select.setAttribute('aria-label', `Jury vote for ${player}`);
        select.dataset.voter = player;

        ['No vote'].concat(finalists).forEach((optionValue) => {
          const option = document.createElement('option');
          option.value = optionValue;
          option.textContent = optionValue;
          select.appendChild(option);
        });

        select.value = juryVotes[player] || 'No vote';
        juryCell.appendChild(select);

        select.addEventListener('change', () => {
          const votesDataToSave = loadVotes();
          votesDataToSave.juryVotes = votesDataToSave.juryVotes || {};
          votesDataToSave.juryVotes[player] = select.value === 'No vote' ? '' : select.value;
          saveVotes(votesDataToSave);
          renderVotesTable();
        });
      } else if (finalists.indexOf(player) >= 0 && finalists.length === 3) {
        const count = jurySummary.tally[player] || 0;
        const voteCell = document.createElement('div');
        voteCell.className = 'vote-value jury-vote-count';
        if (jurySummary.winner === player) {
          voteCell.classList.add('jury-winner-cell');
          voteCell.textContent = `Winner (${count} vote${count === 1 ? '' : 's'})`;
        } else {
          voteCell.textContent = `${count} vote${count === 1 ? '' : 's'}`;
        }
        juryCell.appendChild(voteCell);
      } else {
        const juryPlaceholder = document.createElement('div');
        juryPlaceholder.className = 'vote-value';
        juryPlaceholder.textContent = '—';
        juryCell.appendChild(juryPlaceholder);
      }

      row.appendChild(juryCell);
    }

    tbody.appendChild(row);
  });

  const eliminationRow = document.createElement('tr');
  eliminationRow.className = 'elimination-row';

  const eliminationLabel = document.createElement('td');
  eliminationLabel.setAttribute('data-label', 'Player');
  eliminationLabel.textContent = 'Voted Off';
  eliminationRow.appendChild(eliminationLabel);

  rounds.forEach((roundEntry, roundIndex) => {
    const eliminationCell = document.createElement('td');
    eliminationCell.setAttribute('data-label', `Round ${roundEntry.round}`);

    const eliminatedPlayer = roundEliminations[roundIndex];
    const voteCounts = getRoundVoteCounts(roundEntry.votes || {}, players.filter((player) => !roundEliminations.slice(0, roundIndex).includes(player)));
    const voteCountText = eliminatedPlayer ? `${eliminatedPlayer} (${formatVoteSplit(voteCounts, eliminatedPlayer)})` : '—';
    eliminationCell.textContent = voteCountText;
    eliminationRow.appendChild(eliminationCell);
  });

  if (juryColumnEnabled) {
    const juryCell = document.createElement('td');
    juryCell.setAttribute('data-label', 'Jury');
    juryCell.className = 'jury-vote-cell';

    if (finalists.length === 3) {
      const juryResult = document.createElement('div');
      juryResult.className = 'vote-value jury-vote-count';
      if (jurySummary.winner) {
        juryResult.classList.add('jury-winner-cell');
        juryResult.textContent = `Winner: ${jurySummary.winner} (${jurySummary.tally[jurySummary.winner] || 0} vote${(jurySummary.tally[jurySummary.winner] || 0) === 1 ? '' : 's'})`;
      } else {
        juryResult.textContent = 'No winner yet';
      }
      juryCell.appendChild(juryResult);
    } else {
      const juryResult = document.createElement('div');
      juryResult.className = 'vote-value';
      juryResult.textContent = 'Final 3 jury vote';
      juryCell.appendChild(juryResult);
    }

    eliminationRow.appendChild(juryCell);
  }

  tbody.appendChild(eliminationRow);
}

function renderAllianceGraph() {
  const container = document.getElementById('alliance-graph');
  if (!container) {
    return;
  }

  const players = loadRows().map((row) => row.player);
  const alliances = allianceGroups.map((group) => ({
    name: group.name,
    key: toAllianceKey(group.name),
    color: group.color,
    members: group.members.filter((member) => players.indexOf(member) >= 0),
  }));
  const width = Math.max(1200, 420 + (players.length * 54));
  const height = Math.max(560, 360 + (players.length * 28));
  const playerRadius = 24;
  const allianceCenters = [
    { x: width * 0.50, y: height * 0.18 },
    { x: width * 0.22, y: height * 0.40 },
    { x: width * 0.78, y: height * 0.40 },
    { x: width * 0.32, y: height * 0.78 },
    { x: width * 0.68, y: height * 0.78 },
  ];
  let activeAllianceKey = '';

  const connectionMap = players.reduce((accumulator, player) => {
    accumulator[player] = new Set();
    return accumulator;
  }, {});

  const edgePairs = alliances.reduce((accumulator, alliance) => {
    const pairs = [];
    for (let i = 0; i < alliance.members.length; i += 1) {
      for (let j = i + 1; j < alliance.members.length; j += 1) {
        pairs.push([alliance.members[i], alliance.members[j]]);
        connectionMap[alliance.members[i]].add(alliance.members[j]);
        connectionMap[alliance.members[j]].add(alliance.members[i]);
      }
    }

    accumulator.push({
      key: alliance.key,
      color: alliance.color,
      pairs: pairs,
    });
    return accumulator;
  }, []);

  const centralPlayer = players.slice().sort((left, right) => {
    const leftDegree = connectionMap[left].size;
    const rightDegree = connectionMap[right].size;
    if (leftDegree === rightDegree) {
      return left.localeCompare(right);
    }
    return rightDegree - leftDegree;
  })[0];

  const positions = players.reduce((accumulator, player, index) => {
    if (player === centralPlayer) {
      accumulator[player] = { x: width / 2, y: height / 2 };
      return accumulator;
    }

    const allianceIndexes = alliances.reduce((indexes, alliance, allianceIndex) => {
      if (alliance.members.indexOf(player) >= 0) {
        indexes.push(allianceIndex);
      }
      return indexes;
    }, []);

    const anchor = allianceIndexes.length
      ? allianceIndexes.reduce((sum, allianceIndex) => {
          sum.x += allianceCenters[allianceIndex].x;
          sum.y += allianceCenters[allianceIndex].y;
          return sum;
        }, { x: 0, y: 0 })
      : { x: width / 2, y: height / 2 };
    const base = allianceIndexes.length
      ? { x: anchor.x / allianceIndexes.length, y: anchor.y / allianceIndexes.length }
      : { x: width / 2, y: height / 2 };
    const angle = (index + 1) * 2.399963229728653;
    const jitterRadius = allianceIndexes.length ? Math.max(72, 42 + (players.length * 1.5)) : 32;

    accumulator[player] = {
      x: base.x + Math.cos(angle) * jitterRadius,
      y: base.y + Math.sin(angle) * jitterRadius,
    };
    return accumulator;
  }, {});

  enforceMinimumNodeSpacing(positions, [centralPlayer], Math.max(168, Math.round(players.length * 8.5)), width, height);

  const legend = alliances
    .map((alliance) => {
      return `
        <span class="graph-chip" data-alliance-key="${alliance.key}"><span class="graph-chip-swatch" style="background:${alliance.color}"></span>${alliance.name}</span>
      `;
    })
    .join('');

  const edgeMarkup = edgePairs
    .map((alliance) => {
      return alliance.pairs
        .map((pair) => {
          return `<line class="graph-edge alliance-link" data-alliance-key="${alliance.key}" data-pair="${pair[0]}|${pair[1]}" stroke="${alliance.color}" x1="0" y1="0" x2="0" y2="0" />`;
        })
        .join('');
    })
    .join('');

  const playerNodes = players
    .map((player) => {
      const position = positions[player];
      const alliancesForPlayer = alliances.filter((alliance) => alliance.members.indexOf(player) >= 0);
      const fill = alliancesForPlayer.length ? alliancesForPlayer[0].color : '#8fa3b0';
      const allianceKeys = alliancesForPlayer.map((alliance) => alliance.key).join(' ');
      const labelDirection = position.y > height / 2 ? -1 : 1;
      const labelOffset = labelDirection > 0 ? 48 : -64;
      const labelWidth = Math.max(78, (player.length * 10) + 34);
      const labelHeight = 34;
      const isCentral = player === centralPlayer;
      return `
        <g class="player-group${isCentral ? ' is-central' : ''}" data-player="${player}" data-alliance-keys="${allianceKeys}" transform="translate(${position.x}, ${position.y})">
          <circle class="player-node${isCentral ? ' is-central' : ''}" cx="0" cy="0" r="${playerRadius}" fill="${fill}" />
          <g class="player-label-group${isCentral ? ' is-central' : ''}" transform="translate(0, ${labelOffset})">
            <rect class="player-label-bg${isCentral ? ' is-central' : ''}" x="${-(labelWidth / 2)}" y="-${labelHeight / 2}" width="${labelWidth}" height="${labelHeight}" rx="14" ry="14" />
            <text class="player-label${isCentral ? ' is-central' : ''}" x="0" y="5">${player}</text>
          </g>
        </g>
      `;
    })
    .join('');

  container.innerHTML = `
    <div class="graph-shell" data-active-alliance="">
      <div class="graph-legend">${legend}</div>
      <svg class="graph-svg" style="width:${width}px; max-width:none; display:block;" viewBox="0 0 ${width} ${height}" role="img" aria-label="Alliance graph showing players connected to alliances">
        ${edgeMarkup}
        ${playerNodes}
      </svg>
    </div>
  `;

  const shell = container.querySelector('.graph-shell');
  const chips = Array.from(container.querySelectorAll('.graph-chip'));
  const edges = Array.from(container.querySelectorAll('.alliance-link'));
  const nodes = Array.from(container.querySelectorAll('.player-group'));

  function updateGraph() {
    edges.forEach((edge) => {
      const pair = (edge.dataset.pair || '').split('|');
      if (pair.length !== 2) {
        return;
      }

      const leftPosition = positions[pair[0]];
      const rightPosition = positions[pair[1]];
      if (!leftPosition || !rightPosition) {
        return;
      }

      edge.setAttribute('x1', leftPosition.x);
      edge.setAttribute('y1', leftPosition.y);
      edge.setAttribute('x2', rightPosition.x);
      edge.setAttribute('y2', rightPosition.y);
    });

    setAllianceFocus(activeAllianceKey);
  }

  function setAllianceFocus(nextAllianceKey) {
    activeAllianceKey = nextAllianceKey || '';
    shell.dataset.activeAlliance = activeAllianceKey;

    chips.forEach((chip) => {
      const isActive = chip.dataset.allianceKey === activeAllianceKey;
      chip.classList.toggle('is-active', isActive);
      chip.style.opacity = !activeAllianceKey || isActive ? '1' : '0.55';
    });

    edges.forEach((edge) => {
      const isActive = !!activeAllianceKey && edge.dataset.allianceKey === activeAllianceKey;
      edge.style.opacity = !activeAllianceKey ? '0.52' : (isActive ? '0.95' : '0.08');
      edge.style.strokeWidth = isActive ? '4' : '1.5';
      edge.style.filter = isActive ? 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.32))' : '';
    });

    nodes.forEach((node) => {
      const allianceKeys = (node.dataset.allianceKeys || '').split(/\s+/).filter(Boolean);
      const isActive = !!activeAllianceKey && allianceKeys.indexOf(activeAllianceKey) >= 0;
      node.style.opacity = !activeAllianceKey ? '1' : (isActive ? '1' : '0.42');
      node.style.stroke = isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
      node.style.strokeWidth = isActive ? '3' : '2';
      node.style.filter = isActive ? 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.2))' : '';
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener('mouseenter', () => {
      setAllianceFocus(chip.dataset.allianceKey || '');
    });

    chip.addEventListener('mouseleave', () => {
      setAllianceFocus('');
    });
  });

  updateGraph();
}

function renderTribesTable() {
  const tbody = document.getElementById('tribes-body');
  if (!tbody) {
    return;
  }

  const votesData = loadVotes();
  const players = votesData.players || defaultRows.map((row) => row.player);
  const roundEliminations = computeRoundEliminations(votesData);
  const jurySummary = getFinalJurySummary(votesData);
  const finalists = jurySummary.finalists || [];
  const finalistOrder = finalists
    .slice()
    .sort((left, right) => {
      const leftScore = jurySummary.tally[left] || 0;
      const rightScore = jurySummary.tally[right] || 0;
      if (leftScore === rightScore) {
        return left.localeCompare(right);
      }
      return rightScore - leftScore;
    });
  const finalistRank = new Map(finalistOrder.map((player, index) => [player, index]));
  const eliminationRank = new Map();
  roundEliminations.forEach((player, index) => {
    if (player) {
      eliminationRank.set(player, index);
    }
  });

  const sortedPlayers = [...players].sort((left, right) => {
    const leftIsFinalist = finalistRank.has(left);
    const rightIsFinalist = finalistRank.has(right);

    if (leftIsFinalist && rightIsFinalist) {
      return finalistRank.get(left) - finalistRank.get(right);
    }

    if (leftIsFinalist !== rightIsFinalist) {
      return leftIsFinalist ? 1 : -1;
    }

    return (eliminationRank.get(left) ?? Number.MAX_SAFE_INTEGER) - (eliminationRank.get(right) ?? Number.MAX_SAFE_INTEGER);
  });

  function getPlacement(player) {
    if (finalistRank.has(player)) {
      return finalistRank.get(player) + 1;
    }

    if (eliminationRank.has(player)) {
      return players.length - eliminationRank.get(player);
    }

    return players.length;
  }

  tbody.innerHTML = '';

  sortedPlayers.forEach((player) => {
    const row = document.createElement('tr');
    const placement = getPlacement(player);
    const juror = !finalistRank.has(player) && placement >= 4 && placement <= 12;
    const jurorNumber = juror ? (13 - placement) : 0;

    const nameCell = document.createElement('td');
    nameCell.setAttribute('data-label', 'Castaway');
    nameCell.textContent = player;
    row.appendChild(nameCell);

    const originalCell = document.createElement('td');
    originalCell.setAttribute('data-label', 'Original Tribe');
    const originalBadge = document.createElement('span');
    originalBadge.className = `tribe-badge ${getTribeBadgeClassName(getPhaseTribe(player, 'original', placement))}`;
    originalBadge.textContent = getPhaseTribe(player, 'original', placement);
    originalCell.appendChild(originalBadge);
    row.appendChild(originalCell);

    const swappedCell = document.createElement('td');
    swappedCell.setAttribute('data-label', 'Swap 1');
    const swappedBadge = document.createElement('span');
    swappedBadge.className = `tribe-badge ${getTribeBadgeClassName(getPhaseTribe(player, 'swapOne', placement))}`;
    swappedBadge.textContent = getPhaseTribe(player, 'swapOne', placement);
    swappedCell.appendChild(swappedBadge);
    row.appendChild(swappedCell);

    const mergedCell = document.createElement('td');
    mergedCell.setAttribute('data-label', 'Swap 2');
    const mergedBadge = document.createElement('span');
    mergedBadge.className = `tribe-badge ${getTribeBadgeClassName(getPhaseTribe(player, 'swapTwo', placement))}`;
    mergedBadge.textContent = getPhaseTribe(player, 'swapTwo', placement);
    mergedCell.appendChild(mergedBadge);
    row.appendChild(mergedCell);

    const mergeCell = document.createElement('td');
    mergeCell.setAttribute('data-label', 'Merge');
    const mergeBadge = document.createElement('span');
    mergeBadge.className = `tribe-badge ${getTribeBadgeClassName(getPhaseTribe(player, 'merge', placement))}`;
    mergeBadge.textContent = getPhaseTribe(player, 'merge', placement);
    mergeCell.appendChild(mergeBadge);
    row.appendChild(mergeCell);

    const finishCell = document.createElement('td');
    finishCell.setAttribute('data-label', 'Finish');
    if (finalistRank.has(player)) {
      const rank = finalistRank.get(player);
      finishCell.textContent = rank === 0 ? 'Sole Survivor' : (rank === 1 ? 'Runner-Up' : 'Second Runner-Up');
    } else {
      finishCell.textContent = juror ? `${ordinalLabel(placement)} voted out (${ordinalLabel(jurorNumber)} jury member)` : `${ordinalLabel(placement)} voted out`;
    }
    row.appendChild(finishCell);

    tbody.appendChild(row);
  });
}

function setupTabs() {
  const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
  const panels = Array.from(document.querySelectorAll('.tab-panel'));

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedTab = button.dataset.tab;

      tabButtons.forEach((tab) => {
        const isActive = tab === button;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      panels.forEach((panel) => {
        const isActive = panel.id === `${selectedTab}-panel`;
        panel.hidden = !isActive;
        panel.classList.toggle('active', isActive);
      });
    });
  });
}

renderTable();
renderVotesTable();
renderTribesTable();
renderAllianceGraph();
setupTabs();