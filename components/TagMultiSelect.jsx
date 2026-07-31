'use client';

import { useState, useRef, useEffect } from 'react';

export default function TagMultiSelect({ selected, onChange, availableTags }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const listId = 'tag-listbox';

  const normalize = (s) => s.trim().toLowerCase();
  const selectedSet = new Set(selected);

  const filtered = availableTags.filter(
    (tag) => !selectedSet.has(tag) && normalize(tag).includes(normalize(query))
  );

  const canCreate = query.trim() && !availableTags.some((tag) => normalize(tag) === normalize(query));

  const addTag = (rawTag) => {
    const clean = rawTag.trim();
    if (!clean) return;
    // Reuse the canonical (existing) spelling to avoid duplicate tags
    const canonical = availableTags.find((tag) => normalize(tag) === normalize(clean)) || clean;
    if (!selected.includes(canonical)) {
      onChange([...selected, canonical]);
    }
    setQuery('');
    setOpen(false);
  };

  const removeTag = (tag) => {
    onChange(selected.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered.length > 0) {
        addTag(filtered[0]);
      } else if (canCreate) {
        addTag(query);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const boxStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    minHeight: '44px',
    marginBottom: '12px',
    cursor: 'text',
  };

  const pillStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '999px',
    background: 'var(--accent-light)',
    color: 'var(--accent)',
    fontSize: '13px',
    fontWeight: '500',
  };

  return (
    <div style={{ position: 'relative' }} ref={rootRef}>
      <div style={boxStyle} onClick={() => inputRef.current?.focus()}>
        {selected.map((tag) => (
          <span key={tag} style={pillStyle}>
            {tag}
            <button
              type="button"
              aria-label={`Remove tag ${tag}`}
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                fontSize: '14px',
                lineHeight: 1,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={handleKeyDown}
          placeholder={selected.length === 0 ? 'Select or type tags…' : ''}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label="Tags"
          style={{
            flex: 1,
            minWidth: '120px',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            fontSize: '15px',
            padding: '2px 0',
          }}
        />
      </div>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label="Available tags"
          style={{
            position: 'absolute',
            top: 'calc(100% - 8px)',
            left: 0,
            right: 0,
            zIndex: 30,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            maxHeight: '200px',
            overflowY: 'auto',
            padding: '4px',
          }}
        >
          {canCreate && (
            <button
              type="button"
              role="option"
              aria-selected="false"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => addTag(query)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 10px',
                borderRadius: '6px',
                border: 'none',
                background: 'none',
                color: 'var(--accent)',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              + Create &quot;{query.trim()}&quot;
            </button>
          )}
          {filtered.map((tag) => (
            <button
              key={tag}
              type="button"
              role="option"
              aria-selected="false"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => addTag(tag)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 10px',
                borderRadius: '6px',
                border: 'none',
                background: 'none',
                color: 'var(--text-primary)',
                fontSize: '14px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
            >
              {tag}
            </button>
          ))}
          {filtered.length === 0 && !canCreate && (
            <div style={{ padding: '8px 10px', fontSize: '13px', color: 'var(--text-muted)' }}>
              {availableTags.length === 0 ? 'No tags yet. Type one and press Enter.' : 'No matching tags.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
