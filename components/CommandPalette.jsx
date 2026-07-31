'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const TYPE_ICONS = {
  page: '📄',
  project: '🔨',
  post: '✏️',
};

const TYPE_LABELS = {
  page: 'Page',
  project: 'Project',
  post: 'Post',
};

export default function CommandPalette({ items }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const router = useRouter();

  // Filter items based on query
  const filtered = query.trim() === ''
    ? items
    : items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(query.toLowerCase())
      );

  // Open on Cmd+K / Ctrl+K or custom toggle event
  useEffect(() => {
    const handleToggle = () => setOpen((prev) => !prev);
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('toggle-palette', handleToggle);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('toggle-palette', handleToggle);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Reset query/selection whenever the palette opens
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQuery('');
      setActiveIndex(0);
    }
  }

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.children[activeIndex];
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const navigate = useCallback((item) => {
    setOpen(false);
    if (item.external) {
      window.open(item.href, '_blank');
    } else {
      router.push(item.href);
    }
  }, [router]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && filtered[activeIndex]) {
      navigate(filtered[activeIndex]);
    }
  };

  // Reset active index when query changes
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setActiveIndex(0);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 998,
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Palette */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '560px',
        background: 'var(--bg-card)',
        borderRadius: '14px',
        border: '1px solid var(--border)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
        zIndex: 999,
        overflow: 'hidden',
      }}>

        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: '18px', opacity: 0.5 }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, projects, posts..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '16px',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
            }}
          />
          <kbd style={{
            fontSize: '11px',
            padding: '3px 8px',
            borderRadius: '6px',
            background: 'var(--accent-light)',
            color: 'var(--accent)',
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
            onClick={() => setOpen(false)}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          style={{
            maxHeight: '360px',
            overflowY: 'auto',
            padding: '8px',
          }}
        >
          {filtered.length === 0 ? (
            <div style={{
              padding: '32px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '14px',
            }}>
              No results for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, index) => (
              <div
                key={item.id}
                onClick={() => navigate(item)}
                onMouseEnter={() => setActiveIndex(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: activeIndex === index ? 'var(--accent-light)' : 'transparent',
                  transition: 'background 0.1s',
                }}
              >
                <span style={{ fontSize: '16px', flexShrink: 0 }}>
                  {TYPE_ICONS[item.type]}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: activeIndex === index ? 'var(--accent)' : 'var(--text-primary)',
                    marginBottom: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {item.subtitle}
                  </div>
                </div>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: 'var(--border)',
                  color: 'var(--text-muted)',
                  flexShrink: 0,
                }}>
                  {TYPE_LABELS[item.type]}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '16px',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}>
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>ESC close</span>
        </div>
      </div>
    </>
  );
}