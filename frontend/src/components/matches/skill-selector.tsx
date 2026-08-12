'use client';

import React, { useState, useMemo } from 'react';
import { SKILLS_DATA } from '@/services/dataset';

interface SkillSelectorProps {
  /** Display names of selected skills, e.g. ["Python", "SQL"] */
  selectedSkillNames: string[];
  onChange: (skillNames: string[]) => void;
  onAnalyze: () => void;
  isAnalyzing?: boolean;
}

/**
 * Popular skills by display name — used for quick-add buttons.
 * These match the actual names in the CognoDB database.
 */
const POPULAR_SKILL_NAMES = ['Python', 'SQL', 'Machine Learning', 'Docker', 'PyTorch', 'React', 'FastAPI'];

export function SkillSelector({
  selectedSkillNames,
  onChange,
  onAnalyze,
  isAnalyzing = false
}: SkillSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedNamesSet = useMemo(
    () => new Set(selectedSkillNames.map(n => n.toLowerCase())),
    [selectedSkillNames]
  );

  const suggestions = useMemo(() => {
    const q = inputValue.toLowerCase().trim();
    return SKILLS_DATA.filter(s => {
      if (selectedNamesSet.has(s.name.toLowerCase())) return false;
      if (!q) return true;
      return s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
    }).slice(0, 8);
  }, [inputValue, selectedNamesSet]);

  const addSkill = (name: string) => {
    if (!selectedNamesSet.has(name.toLowerCase())) {
      onChange([...selectedSkillNames, name]);
    }
    setInputValue('');
    setIsDropdownOpen(false);
  };

  const removeSkill = (name: string) => {
    onChange(selectedSkillNames.filter(s => s.toLowerCase() !== name.toLowerCase()));
  };

  const popularSkillsToShow = POPULAR_SKILL_NAMES.filter(
    name => !selectedNamesSet.has(name.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        padding: '28px',
        maxWidth: '720px',
      }}
    >
      {/* Section Label */}
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 500 }}>
        Your skills
      </p>

      {/* Selected Skill Chips */}
      {selectedSkillNames.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {selectedSkillNames.map((name) => (
            <span
              key={name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '38px',
                padding: '0 12px',
                borderRadius: '6px',
                border: '1px solid var(--accent-border)',
                backgroundColor: 'var(--accent-bg)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--accent-primary)',
              }}
            >
              <span>{name}</span>
              <button
                onClick={() => removeSkill(name)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px',
                  cursor: 'pointer',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  lineHeight: 1,
                  opacity: 0.8,
                }}
                aria-label={`Remove ${name}`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Add Skill Input */}
      <div style={{ position: 'relative', marginBottom: popularSkillsToShow.length > 0 ? '20px' : '0' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            height: '48px',
            borderRadius: '7px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-color)',
            padding: '0 14px',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
            <path d="M7.5 2v11M2 7.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Add a skill..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Autocomplete */}
        {isDropdownOpen && suggestions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              maxHeight: '220px',
              overflowY: 'auto',
              backgroundColor: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              zIndex: 40,
              boxShadow: '0 8px 24px var(--shadow-color)',
            }}
          >
            {suggestions.map((skill) => (
              <button
                key={skill.id}
                onMouseDown={() => addSkill(skill.name)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  borderBottom: '1px solid var(--border-color)',
                  transition: 'background-color 0.1s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-hover)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span>{skill.name}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{skill.category}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Popular Skills */}
      {popularSkillsToShow.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>Popular:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {popularSkillsToShow.map((name) => (
              <button
                key={name}
                onClick={() => addSkill(name)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  height: '36px',
                  padding: '0 12px',
                  borderRadius: '5px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'transparent',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.12s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--accent-primary)';
                  e.currentTarget.style.borderColor = 'var(--accent-border)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Analyze Button */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
        <button
          onClick={onAnalyze}
          disabled={selectedSkillNames.length === 0 || isAnalyzing}
          style={{
            height: '48px',
            padding: '0 24px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '15px',
            fontWeight: 500,
            cursor: selectedSkillNames.length === 0 || isAnalyzing ? 'not-allowed' : 'pointer',
            backgroundColor: selectedSkillNames.length === 0 ? 'var(--surface-hover)' : 'var(--accent-primary)',
            color: selectedSkillNames.length === 0 ? 'var(--text-muted)' : '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.15s',
          }}
          onMouseEnter={e => {
            if (selectedSkillNames.length > 0 && !isAnalyzing) {
              e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
            }
          }}
          onMouseLeave={e => {
            if (selectedSkillNames.length > 0 && !isAnalyzing) {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
            }
          }}
        >
          {isAnalyzing ? (
            'Analyzing...'
          ) : (
            <>
              Analyze career paths
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
