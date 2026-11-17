const API_URL = 'http://localhost:4000';

const formatDateTime = (iso) => new Date(iso).toLocaleString('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const formatSeats = (activity) => {
  const available = activity.capacity - activity.registeredCount;
  return available > 0
    ? `Còn ${available}/${activity.capacity} suất`
    : 'Đã đủ người tham gia';
};

const createEventCard = (activity, index) => {
  const article = document.createElement('article');
  article.className = 'card';

  const art = document.createElement('div');
  art.className = 'card-art';
  const label = document.createElement('span');
  label.className = 'art-label';
  label.textContent = `CAMPUS ACTIVITY 0${(index % 6) + 1}`;
  const symbol = document.createElement('span');
  symbol.className = 'art-symbol';
  symbol.setAttribute('aria-hidden', 'true');
  symbol.textContent = ['✦', '◈', '⌁', '♫', '✧', '♡'][index % 6];
  art.append(label, symbol);

  const body = document.createElement('div');
  body.className = 'card-body';

  const heading = document.createElement('h3');
  const link = document.createElement('a');
  link.setAttribute('href', `activity-detail.html?id=${encodeURIComponent(activity.id)}`);
  link.textContent = activity.name;
  heading.append(link);

  const date = document.createElement('p');
  date.className = 'meta';
  date.textContent = `◷ ${formatDateTime(activity.startTime)}`;

  const place = document.createElement('p');
  place.className = 'meta';
  place.textContent = `⌖ ${activity.location}`;

  const seat = document.createElement('span');
  seat.className = 'seat-status';
  seat.textContent = formatSeats(activity);
  if (seat.textContent === 'Đã đủ người tham gia') seat.classList.add('badge-full');

  body.append(heading, date, place, seat);
  article.append(art, body);
  return article;
};

const renderEvents = (activities) => {
  const list = document.querySelector('#event-list');
  const cards = activities.map((activity, index) => createEventCard(activity, index));
  list.replaceChildren(...cards);
};

const statusEl = document.querySelector('#status');

const loadEvents = async (keyword = '') => {
  const params = new URLSearchParams({ pageSize: '50' });
  if (keyword.trim() !== '') params.set('q', keyword.trim());

  statusEl.textContent = 'Đang tải hoạt động…';
  try {
    const response = await fetch(`${API_URL}/api/events?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    renderEvents(result.items);
    statusEl.textContent = result.items.length === 0
      ? 'Không tìm thấy hoạt động phù hợp.'
      : `Có ${result.totalCount} hoạt động được tìm thấy.`;
  } catch (error) {
    console.error(error);
    statusEl.textContent = 'Không thể tải hoạt động. Vui lòng thử lại sau.';
  }
};

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const keyword = document.querySelector('#keyword').value.trim();
  loadEvents(keyword);
});

loadEvents();
