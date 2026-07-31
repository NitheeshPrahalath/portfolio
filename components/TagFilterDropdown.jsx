'use client';

import { useState, useRef, useEffect } from 'react';

export default function TagFilterDropdown({ tags, activeTag, onSelect }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const menuId = 'tag-filter-listbox';

  useEffect(() => {
    const handleOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
      >
        <span style={{ color: 'var(--text-muted)' }}>Tags</span>
        <span style={{
          color: activeTag === 'All' ? 'var(--text-muted)' : 'var(--accent)',
          fontWeight: '600',
        }}>
          {activeTag}
        </span>
        <span style={{
          fontSize: '10px',
          color: 'var(--text-muted)',
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s',
        }}>
          ▼
        </span>
      </button>

      {open && (
        <div
          id={menuId}
          role="listbox"
          aria-label="Filter posts by tag"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            minWidth: '220px',
            zIndex: 40,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            maxHeight: '260px',
            overflowY: 'auto',
            padding: '4px',
          }}
        >
          {tags.map((tag) => {
            const isActive = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onSelect(tag);
                  setOpen(false);
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                {isActive && <span style={{ color: 'var(--accent)', marginRight: '6px' }}>✓</span>}
                {tag}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
