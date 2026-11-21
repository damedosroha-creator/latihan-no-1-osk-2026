import { useEffect, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { MenuTab, ProgressState } from './types/physics';
import { computeMasterySummary } from './utils/kinematicsEngine';
import { BerandaView } from './components/views/BerandaView';
import { PetaKonsepView } from './components/views/PetaKonsepView';
import { TeoriDasarView } from './components/views/TeoriDasarView';
import { LabVisualView } from './components/views/LabVisualView';
import { LatihanSoalView } from './components/views/LatihanSoalView';
import { ProgresBelajarView } from './components/views/ProgresBelajarView';
import { RangkumanRumusView } from './components/views/RangkumanRumusView';

const STORAGE_KEY = 'olympiad_physics_lab_v1_progress';

const DEFAULT_PROGRESS: ProgressState = {
  completedTheoryIds: [],
  questionAttempts: {},
};

const NAV_ITEMS: Array<{ id: MenuTab; label: string }> = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'peta-konsep', label: 'Peta Konsep' },
  { id: 'teori-dasar', label: 'Teori Dasar' },
  { id: 'lab-visual', label: 'Lab Visual' },
  { id: 'latihan-soal', label: '15 Soal' },
  { id: 'progres', label: 'Progres' },
  { id: 'rumus', label: 'Rumus' },
];

function loadInitialTab(): MenuTab {
  if (typeof window === 'undefined') return 'beranda';
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab') as MenuTab | null;
  if (tabParam && NAV_ITEMS.some((i) => i.id === tabParam)) {
    return tabParam;
  }
  if (params.get('autostart') === '1') {
    return 'latihan-soal';
  }
  return 'beranda';
}

function loadProgress(): ProgressState {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      completedTheoryIds: Array.isArray(parsed.completedTheoryIds)
        ? parsed.completedTheoryIds
        : [],
      questionAttempts:
        parsed.questionAttempts && typeof parsed.questionAttempts === 'object'
          ? parsed.questionAttempts
          : {},
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<MenuTab>(loadInitialTab);
  const [activeTheoryId, setActiveTheoryId] = useState<string>('mod-1');
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [progress, setProgress] = useState<ProgressState>(loadProgress);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota issues gracefully
    }
  }, [progress]);

  const mastery = useMemo(() => computeMasterySummary(progress), [progress]);

  const handleNavigate = (tab: MenuTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTheoryModule = (moduleId: string) => {
    setActiveTheoryId(moduleId);
    handleNavigate('teori-dasar');
  };

  const handleOpenQuestion = (questionId: number) => {
    setActiveQuestionId(questionId);
    handleNavigate('latihan-soal');
  };

  const handleToggleTheoryComplete = (moduleId: string) => {
    setProgress((prev) => {
      const exists = prev.completedTheoryIds.includes(moduleId);
      const nextIds = exists
        ? prev.completedTheoryIds.filter((id) => id !== moduleId)
        : [...prev.completedTheoryIds, moduleId];
      return { ...prev, completedTheoryIds: nextIds };
    });
  };

  const handleRecordAttempt = (
    questionId: number,
    input: string,
    isCorrect: boolean
  ) => {
    setProgress((prev) => {
      const existing = prev.questionAttempts[questionId];
      return {
        ...prev,
        questionAttempts: {
          ...prev.questionAttempts,
          [questionId]: {
            lastInput: input,
            isCorrect: existing?.isCorrect ? true : isCorrect,
            attempts: (existing?.attempts ?? 0) + 1,
            explanationOpened: existing?.explanationOpened ?? false,
          },
        },
      };
    });
  };

  const handleMarkExplanationOpened = (questionId: number) => {
    setProgress((prev) => {
      const existing = prev.questionAttempts[questionId];
      if (!existing) {
        return {
          ...prev,
          questionAttempts: {
            ...prev.questionAttempts,
            [questionId]: {
              lastInput: '',
              isCorrect: false,
              attempts: 0,
              explanationOpened: true,
            },
          },
        };
      }
      if (existing.explanationOpened) return prev;
      return {
        ...prev,
        questionAttempts: {
          ...prev.questionAttempts,
          [questionId]: { ...existing, explanationOpened: true },
        },
      };
    });
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F8] text-[#1C1917]">
      {/* Top Navigation Bar (Single Row, 3 Zones) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavigate('beranda')}
            className="text-base sm:text-lg font-display font-bold tracking-tight text-[#7A1228] whitespace-nowrap shrink-0 cursor-pointer"
          >
            OLYMPIAD PHYSICS LAB
          </button>

          {/* Zone 2: Single-line navigation links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center gap-6 text-sm font-medium"
          >
            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'border-[#7A1228] text-[#7A1228] font-semibold'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNavigate('latihan-soal')}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-[#7A1228] text-white text-xs font-semibold hover:bg-[#580B1C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Mulai Latihan
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Menu seluler"
            className="lg:hidden border-t border-stone-200 bg-white px-4 py-3 grid grid-cols-2 gap-2"
          >
            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#FDF2F4] text-[#7A1228] font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'beranda' && (
          <BerandaView mastery={mastery} onNavigate={handleNavigate} />
        )}
        {activeTab === 'peta-konsep' && (
          <PetaKonsepView
            onOpenTheory={handleOpenTheoryModule}
            onOpenQuestion={handleOpenQuestion}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'teori-dasar' && (
          <TeoriDasarView
            activeModuleId={activeTheoryId}
            onSelectModule={setActiveTheoryId}
            completedTheoryIds={progress.completedTheoryIds}
            onToggleTheoryComplete={handleToggleTheoryComplete}
            onGoToPractice={() => handleNavigate('latihan-soal')}
          />
        )}
        {activeTab === 'lab-visual' && <LabVisualView />}
        {activeTab === 'latihan-soal' && (
          <LatihanSoalView
            activeQuestionId={activeQuestionId}
            onSelectQuestion={setActiveQuestionId}
            questionAttempts={progress.questionAttempts}
            onRecordAttempt={handleRecordAttempt}
            onMarkExplanationOpened={handleMarkExplanationOpened}
            onOpenTheoryModule={handleOpenTheoryModule}
          />
        )}
        {activeTab === 'progres' && (
          <ProgresBelajarView
            progress={progress}
            mastery={mastery}
            onOpenTheoryModule={handleOpenTheoryModule}
            onOpenQuestion={handleOpenQuestion}
            onResetProgress={handleResetProgress}
          />
        )}
        {activeTab === 'rumus' && <RangkumanRumusView />}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-stone-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <span className="font-semibold text-[#7A1228]">OLYMPIAD PHYSICS LAB</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>City Level Training · Pengajar: Mister Jo</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('teori-dasar')}
              className="hover:text-[#7A1228] cursor-pointer"
            >
              Teori Dasar
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('latihan-soal')}
              className="hover:text-[#7A1228] cursor-pointer"
            >
              15 Soal Latihan
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('rumus')}
              className="hover:text-[#7A1228] cursor-pointer"
            >
              Rangkuman Rumus
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
