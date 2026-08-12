'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { SkillMatchResult } from '@/lib/types';
import { SkillSelector } from '@/components/matches/skill-selector';
import { MatchCard } from '@/components/matches/match-card';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';

export default function MatchesPage() {
  // We track skill *names* (e.g. "Python", "SQL") because that's what the
  // backend expects in POST /api/matches { skills: string[] }
  const [selectedSkillNames, setSelectedSkillNames] = useState<string[]>([]);
  const [results, setResults] = useState<SkillMatchResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (selectedSkillNames.length === 0) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      // POST /api/matches with real skill names → FastAPI → CognoDB
      const matches = await api.getCareerMatches(selectedSkillNames);
      setResults(matches);
      setHasAnalyzed(true);
    } catch {
      setError('Unable to find career matches. Please check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const showResults = hasAnalyzed || isAnalyzing;

  return (
    <div className="page-container">

      {/* ── Page Header ─────────────────────────────────────── */}
      <div style={{ paddingTop: '48px', marginBottom: '40px' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
          Skill Matching
        </p>
        <h1 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>
          Find your career match
        </h1>
        <p style={{ margin: 0, maxWidth: '460px' }}>
          Select the skills you already have to discover roles and career paths connected to your profile.
        </p>
      </div>

      {/* ── 2-column layout on desktop ───────────────────────── */}
      <div className="matches-layout" style={{ marginBottom: '64px' }}>

        {/* LEFT: Skill Selector — sticky on desktop */}
        <div className="matches-selector-sticky">
          <SkillSelector
            selectedSkillNames={selectedSkillNames}
            onChange={setSelectedSkillNames}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* RIGHT: Results */}
        <div>
          {/* No skills selected and hasn't analyzed yet */}
          {!showResults && selectedSkillNames.length === 0 && (
            <div style={{
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              backgroundColor: 'var(--surface-color)',
            }}>
              <EmptyState
                title="Choose your skills"
                description="Select at least one skill on the left to find relevant career roles that match your profile."
                icon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zM10 6v4m0 4h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
            </div>
          )}

          {/* Results area */}
          {showResults && (
            <div>
              {/* Results header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-color)',
              }}>
                <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '20px' }}>
                  Recommended roles
                </h2>
                {!isAnalyzing && results.length > 0 && (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    {results.length} {results.length === 1 ? 'match' : 'matches'}
                  </p>
                )}
              </div>

              {error ? (
                <ErrorState
                  title="Unable to find career matches"
                  description={error}
                  onRetry={handleAnalyze}
                />
              ) : isAnalyzing ? (
                <LoadingState
                  variant="skeleton-cards"
                  message="Finding your career matches..."
                />
              ) : results.length === 0 ? (
                <div style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  backgroundColor: 'var(--surface-color)',
                }}>
                  <EmptyState
                    title="No matches found"
                    description="The selected skills didn't match any roles in the graph. Try adding more skills or different ones."
                    action={{
                      label: 'Clear all skills',
                      onClick: () => { setSelectedSkillNames([]); setHasAnalyzed(false); },
                    }}
                  />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {results.map(res => (
                    <MatchCard key={res.roleId} result={res} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
