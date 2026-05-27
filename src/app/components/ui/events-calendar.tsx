import * as React from 'react';
import { motion } from 'motion/react';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import { ChevronLeft, ChevronRight, MapPin, CalendarDays, X } from 'lucide-react';
import { cn } from './utils';

const ACCENT = '#FF4500';

export interface MythosEvent {
  id: number;
  /** Locked date. Omit when the date is still to be announced. */
  date?: Date;
  name: string;
  city: string;
  /** Short kind label, e.g. "Fight night + hackathon", "Launch", "Community". */
  tag: string;
  featured?: boolean;
}

/** Sort by date ascending; undated events sink to the end. */
const byDate = (a: MythosEvent, b: MythosEvent) =>
  (a.date ? a.date.getTime() : Infinity) - (b.date ? b.date.getTime() : Infinity);

/* ============================================================= *
 * Horizontal, date-ordered strip of glass event cards
 * ============================================================= */

interface EventStripProps {
  events: MythosEvent[];
  onSeeAll: () => void;
  className?: string;
}

export function EventStrip({ events, onSeeAll, className }: EventStripProps) {
  const sorted = React.useMemo(() => [...events].sort(byDate), [events]);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);

  const update = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update, sorted.length]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: (dir === 'left' ? -1 : 1) * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const NavBtn = ({ dir, show }: { dir: 'left' | 'right'; show: boolean }) => (
    <button
      onClick={() => scroll(dir)}
      aria-label={dir === 'left' ? 'Scroll left' : 'Scroll right'}
      disabled={!show}
      className={cn(
        'rounded-full border border-white/15 bg-white/5 p-2 text-white backdrop-blur-md transition-all',
        show ? 'opacity-100 hover:bg-white/10' : 'cursor-default opacity-30',
      )}
    >
      {dir === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#909090]">
            Upcoming events
          </span>
        </div>
        <div className="flex items-center gap-2">
          <NavBtn dir="left" show={canLeft} />
          <NavBtn dir="right" show={canRight} />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        <motion.div
          className="flex flex-nowrap gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {sorted.map((e) => (
            <motion.article
              key={e.id}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 110, damping: 16 } },
              }}
              className={cn(
                'group relative w-72 flex-shrink-0 overflow-hidden rounded-2xl border p-5 backdrop-blur-md transition-colors',
                e.featured
                  ? 'border-[#FF4500]/40 bg-[#FF4500]/[0.06]'
                  : 'border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]',
              )}
            >
              {e.featured && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl"
                  style={{ background: 'rgba(255,69,0,0.25)' }}
                />
              )}
              <div className="relative flex items-start justify-between">
                {/* Date block (or "to be announced") */}
                {e.date ? (
                  <div className="leading-none">
                    <div
                      className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: ACCENT }}
                    >
                      {format(e.date, 'MMM')}
                    </div>
                    <div className="mt-1 text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                      {format(e.date, 'd')}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#707070]">
                      {format(e.date, 'EEE')} · {format(e.date, 'yyyy')}
                    </div>
                  </div>
                ) : (
                  <div className="leading-none">
                    <div
                      className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: ACCENT }}
                    >
                      Date
                    </div>
                    <div className="mt-1 text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                      TBA
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#707070]">
                      Coming soon
                    </div>
                  </div>
                )}
                {e.featured && (
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em]"
                    style={{ backgroundColor: 'rgba(255,69,0,0.14)', color: ACCENT }}
                  >
                    Flagship
                  </span>
                )}
              </div>

              <div className="relative mt-5">
                <span
                  className="inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{ backgroundColor: 'rgba(255,69,0,0.12)', color: ACCENT }}
                >
                  {e.tag}
                </span>
                <h3
                  className="mt-3 text-lg font-bold leading-tight text-white"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  {e.name}
                </h3>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-[#B0B0B0]">
                  <MapPin size={14} style={{ color: ACCENT }} />
                  {e.city}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <button
        onClick={onSeeAll}
        className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors"
        style={{ color: ACCENT }}
      >
        <CalendarDays size={14} />
        See all events ›
      </button>
    </div>
  );
}

/* ============================================================= *
 * Full-screen glass calendar modal
 * ============================================================= */

interface EventsCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: MythosEvent[];
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function EventsCalendarModal({ isOpen, onClose, events }: EventsCalendarModalProps) {
  const today = startOfToday();
  const dated = React.useMemo(() => events.filter((e) => e.date).sort(byDate), [events]);
  const undated = React.useMemo(() => events.filter((e) => !e.date), [events]);

  // Anchor on the earliest upcoming dated event so the calendar is never empty.
  const anchorDate = React.useMemo(() => {
    const future = dated.filter((e) => e.date! >= today);
    return (future[0] ?? dated[0])?.date ?? today;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dated]);

  const [currentMonth, setCurrentMonth] = React.useState(() => format(anchorDate, 'MMM-yyyy'));
  const [selectedDay, setSelectedDay] = React.useState<Date>(anchorDate);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentMonth(format(anchorDate, 'MMM-yyyy'));
      setSelectedDay(anchorDate);
    }
  }, [isOpen, anchorDate]);

  // Lock body scroll + Esc to close.
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (ev: KeyboardEvent) => ev.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const firstDay = parse(currentMonth, 'MMM-yyyy', new Date());
  const days = eachDayOfInterval({ start: startOfWeek(firstDay), end: endOfWeek(endOfMonth(firstDay)) });
  const eventsOn = (day: Date) => dated.filter((e) => isSameDay(e.date!, day));
  const selectedEvents = eventsOn(selectedDay);

  const goMonth = (delta: number) => setCurrentMonth(format(add(firstDay, { months: delta }), 'MMM-yyyy'));
  const goToday = () => {
    setCurrentMonth(format(today, 'MMM-yyyy'));
    setSelectedDay(today);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Glass panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Events calendar"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-2xl backdrop-blur-2xl"
      >
        {/* Liquid-glass sheen + colored glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 70% at 100% 0%, rgba(255,69,0,0.18) 0%, rgba(157,78,221,0.10) 35%, rgba(0,0,0,0) 70%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.10] to-transparent"
        />

        {/* Header */}
        <div className="relative flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex w-16 flex-col items-center rounded-xl border border-white/15 bg-white/5 p-1 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#909090]">
                {format(today, 'MMM')}
              </span>
              <span className="text-xl font-bold text-white">{format(today, 'd')}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                {format(firstDay, 'MMMM yyyy')}
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#909090]">
                {format(firstDay, 'MMM d')} to {format(endOfMonth(firstDay), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex overflow-hidden rounded-lg border border-white/15 backdrop-blur-md">
              <button
                onClick={() => goMonth(-1)}
                aria-label="Previous month"
                className="px-2.5 py-2 text-white transition-colors hover:bg-white/10"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={goToday}
                className="border-x border-white/15 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
              >
                Today
              </button>
              <button
                onClick={() => goMonth(1)}
                aria-label="Next month"
                className="px-2.5 py-2 text-white transition-colors hover:bg-white/10"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <button
              onClick={onClose}
              aria-label="Close calendar"
              className="rounded-lg border border-white/15 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Grid + detail (scrolls if tall) */}
        <div className="relative flex-1 overflow-y-auto">
          {/* Weekday header */}
          <div className="grid grid-cols-7 border-b border-white/10 text-center">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#707070]">
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const dayEvents = eventsOn(day);
              const inMonth = isSameMonth(day, firstDay);
              const selected = isSameDay(day, selectedDay);
              const td = isToday(day);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    'relative flex min-h-[4.75rem] flex-col gap-1 border-b border-r border-white/[0.07] p-1.5 text-left transition-colors sm:min-h-[6.5rem] sm:p-2',
                    'hover:bg-white/[0.04]',
                    !inMonth && 'bg-black/20 text-[#5a5a5a]',
                    selected && 'bg-white/[0.06]',
                  )}
                >
                  <time
                    dateTime={format(day, 'yyyy-MM-dd')}
                    className={cn(
                      'ml-auto flex h-6 w-6 items-center justify-center rounded-full text-xs',
                      inMonth ? 'text-white' : 'text-[#5a5a5a]',
                      td && 'font-bold text-white',
                      selected && !td && 'bg-white/15',
                    )}
                    style={td ? { backgroundColor: ACCENT, color: '#fff' } : undefined}
                  >
                    {format(day, 'd')}
                  </time>

                  {/* event chips (sm+) */}
                  <div className="hidden flex-col gap-1 sm:flex">
                    {dayEvents.slice(0, 2).map((e) => (
                      <span
                        key={e.id}
                        className="truncate rounded-md border px-1.5 py-0.5 text-[10px] font-medium leading-tight text-white"
                        style={{ borderColor: 'rgba(255,69,0,0.35)', backgroundColor: 'rgba(255,69,0,0.12)' }}
                        title={`${e.name} · ${e.city}`}
                      >
                        {e.name}
                      </span>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] text-[#909090]">+ {dayEvents.length - 2} more</span>
                    )}
                  </div>

                  {/* dots (mobile) */}
                  {dayEvents.length > 0 && (
                    <div className="mt-auto flex gap-1 sm:hidden">
                      {dayEvents.slice(0, 3).map((e) => (
                        <span key={e.id} className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected-day detail */}
          <div className="border-t border-white/10 p-5 sm:p-6">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#909090]">
              {format(selectedDay, 'EEEE, MMMM d, yyyy')}
            </div>
            {selectedEvents.length === 0 ? (
              <p className="text-sm text-[#707070]">No events this day. Pick a highlighted date.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {selectedEvents.map((e) => (
                  <EventRow key={e.id} event={e} />
                ))}
              </div>
            )}
          </div>

          {/* Dates to be announced */}
          {undated.length > 0 && (
            <div className="border-t border-white/10 p-5 sm:p-6">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                Dates to be announced
              </div>
              <div className="flex flex-col gap-2">
                {undated.map((e) => (
                  <EventRow key={e.id} event={e} tba />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function EventRow({ event: e, tba }: { event: MythosEvent; tba?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md">
      <span
        className="rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{ backgroundColor: 'rgba(255,69,0,0.14)', color: ACCENT }}
      >
        {e.tag}
      </span>
      <div className="min-w-0">
        <div className="truncate font-semibold text-white">{e.name}</div>
        <div className="flex items-center gap-1.5 text-xs text-[#B0B0B0]">
          <MapPin size={12} style={{ color: ACCENT }} />
          {e.city}
          {tba && <span className="text-[#707070]">· Date coming soon</span>}
        </div>
      </div>
    </div>
  );
}
