import { useEffect, useRef, useState } from 'react';
import activity from '../data/github-contributions.json';
import Icon from './Icon.jsx';
import './GitHubContributions.css';

const dateOf = value => new Date(`${value}T00:00:00Z`);
const dateLabel = value => dateOf(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const firstWeekday = dateOf(activity.days[0].date).getUTCDay();
const weekCount = Math.ceil((firstWeekday + activity.days.length) / 7);
const monthLabels = activity.days.flatMap((day, index) => dateOf(day.date).getUTCDate() === 1 ? [{
  label: dateOf(day.date).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }),
  column: Math.floor((index + firstWeekday) / 7) + 1,
}] : []);

export default function GitHubContributions() {
  const [selectedIndex, setSelectedIndex] = useState(activity.days.length - 1);
  const viewport = useRef(null);
  const buttons = useRef([]);
  const selected = activity.days[selectedIndex];

  useEffect(() => {
    // Start narrow screens at the latest activity; the whole year stays scrollable.
    viewport.current.scrollLeft = viewport.current.scrollWidth;
  }, []);

  function navigate(event, index) {
    const offsets = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
    let next = index + (offsets[event.key] ?? 0);
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = activity.days.length - 1;
    else if (!(event.key in offsets)) return;
    event.preventDefault();
    next = Math.max(0, Math.min(activity.days.length - 1, next));
    setSelectedIndex(next);
    buttons.current[next]?.focus({ preventScroll: true });
    const cell = buttons.current[next];
    if (cell) {
      const bounds = cell.getBoundingClientRect();
      const frame = viewport.current.getBoundingClientRect();
      if (bounds.left < frame.left) viewport.current.scrollLeft -= frame.left - bounds.left + 12;
      if (bounds.right > frame.right) viewport.current.scrollLeft += bounds.right - frame.right + 12;
    }
  }

  return <section className="github-activity" aria-labelledby="github-activity-title">
    <header className="github-activity-heading">
      <div><span className="mini-label">Behind the commits</span><h2 id="github-activity-title"><Icon name="github" /> GitHub activity</h2></div>
      <a className="github-profile-link" href={`https://github.com/${activity.username}`} target="_blank" rel="noreferrer">@{activity.username} <Icon name="arrow-up-right" /></a>
    </header>
    <p className="github-activity-total"><strong>{activity.total}</strong> contributions in the last year</p>
    <p id="github-calendar-help" className="github-sr-only">Select a day to see its contribution count. Use arrow keys to explore the calendar, or Home and End to jump to the first and last day.</p>
    <div className="github-calendar-scroll" ref={viewport}>
      <div className="github-calendar" style={{ '--weeks': weekCount }}>
        <div className="github-months" aria-hidden="true">{monthLabels.map(({ label, column }) => <span key={`${label}-${column}`} style={{ gridColumn: column }}>{label}</span>)}</div>
        <div className="github-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
        <div className="github-days" role="group" aria-label="Daily GitHub contributions" aria-describedby="github-calendar-help">
          {activity.days.map((day, index) => <button
            key={day.date}
            ref={element => { buttons.current[index] = element; }}
            className="github-day"
            data-level={day.level}
            style={{ gridColumn: Math.floor((index + firstWeekday) / 7) + 1, gridRow: (index + firstWeekday) % 7 + 1 }}
            tabIndex={index === selectedIndex ? 0 : -1}
            aria-label={`${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${dateLabel(day.date)}`}
            title={`${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${dateLabel(day.date)}`}
            onFocus={() => setSelectedIndex(index)}
            onClick={() => setSelectedIndex(index)}
            onKeyDown={event => navigate(event, index)}
          />)}
        </div>
      </div>
    </div>
    <div className="github-calendar-footer">
      <p aria-live="polite" aria-atomic="true"><strong>{selected.count} {selected.count === 1 ? 'contribution' : 'contributions'}</strong> on {dateLabel(selected.date)}</p>
      <div className="github-legend" aria-label="Color intensity indicates fewer to more contributions"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <i key={level} data-level={level} aria-hidden="true" />)}<span>More</span></div>
    </div>
    <p className="github-sync-note">Synced from GitHub · {dateLabel(activity.fetchedAt.slice(0, 10))}</p>
  </section>;
}
