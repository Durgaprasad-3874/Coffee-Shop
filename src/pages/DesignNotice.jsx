import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';

const svgProps = { viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true, className: 'h-3.5 w-3.5 shrink-0' };

const Icons = {
  figma: (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4" stroke="#e6e6e6" strokeWidth="1.1">
      <path d="M5.5 1.5H8v4H5.5a2 2 0 0 1 0-4ZM8 1.5h2.5a2 2 0 0 1 0 4H8v-4ZM5.5 5.5H8v4H5.5a2 2 0 0 1 0-4ZM5.5 9.5H8v2a2 2 0 1 1-2.5-1.94V9.5ZM10 5.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" className="h-2.5 w-2.5">
      <path d="m2 3.5 3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" className="h-2.5 w-2.5">
      <path d="m3.5 2 3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sidebar: (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
      <rect x="1.75" y="2.75" width="12.5" height="10.5" rx="2" stroke="#d6d6d6" strokeWidth="1.2" />
      <path d="M6 3v10" stroke="#d6d6d6" strokeWidth="1.2" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  // Desktop / Mobile are Figma emoji-style device icons
  desktop: (
    <svg {...svgProps}>
      <rect x="4" y="1.5" width="8" height="13" rx="1.4" fill="#8b8b8b" />
      <rect x="5" y="3" width="6" height="8" rx=".6" fill="#d9d9d9" />
      <rect x="5" y="12" width="6" height="1.3" rx=".6" fill="#bdbdbd" />
    </svg>
  ),
  mobile: (
    <svg {...svgProps}>
      <rect x="4.5" y="1.5" width="7" height="13" rx="1.6" fill="#5b4fe0" />
      <rect x="5.5" y="3" width="5" height="8.5" rx=".6" fill="#c9c4ff" />
      <circle cx="8" cy="13" r=".7" fill="#c9c4ff" />
    </svg>
  ),
  assets: (
    <svg {...svgProps}>
      <path
        d="M6 2.5a1.5 1.5 0 0 1 3 0V4h3v3h-1.5a1.5 1.5 0 0 0 0 3H12v3.5H8.8v-1.2a1.5 1.5 0 0 0-3 0v1.2H3V10h1.2a1.5 1.5 0 0 0 0-3H3V4h3V2.5Z"
        fill="#7cc44f"
      />
    </svg>
  ),
  extra: (
    <svg {...svgProps}>
      <path d="m3 13 1-3.5L11.5 2l2.5 2.5L6.5 12 3 13Z" fill="#9a8cff" />
      <path d="m10 3.5 2.5 2.5" stroke="#292929" strokeWidth=".9" />
    </svg>
  ),
  page: (
    <svg {...svgProps}>
      <rect x="3.5" y="1.5" width="9" height="13" rx="1.4" fill="#8b8b8b" />
    </svg>
  ),
};

const initialPages = [
  { icon: Icons.desktop, name: 'Desktop' },
  { icon: Icons.mobile, name: 'Mobile' },
  { icon: Icons.assets, name: 'Assets' },
  { icon: Icons.extra, name: 'Milha extra' },
];

export default function DesignNotice() {
  const navigate = useNavigate();
  const [pages, setPages] = useState(initialPages);
  const [selectedPage, setSelectedPage] = useState('Desktop');
  const [activeTab, setActiveTab] = useState('File');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const visiblePages = useMemo(
    () => pages.filter(({ name }) => name.toLowerCase().includes(query.trim().toLowerCase())),
    [pages, query],
  );

  function addPage() {
    const name = `Page ${pages.length - initialPages.length + 1}`;
    setPages((currentPages) => [...currentPages, { icon: Icons.page, name }]);
    setSelectedPage(name);
    setActiveTab('File');
    setQuery('');
  }

  return (
    <PageTransition bg="bg-[#efefef]">
      <main className="flex h-full items-center justify-center bg-[#efefef] p-3 sm:p-4">
        <section
          aria-label="Design file notice"
          className="flex h-[calc(100dvh-24px)] w-[calc(100vw-24px)] overflow-hidden rounded-[22px] border-[10px] border-[#262626] bg-[#303030] shadow-2xl sm:h-auto sm:max-h-[calc(100dvh-28px)] sm:w-[min(92vw,calc((100dvh-28px)*1.125))] sm:aspect-[1.125] sm:rounded-[22px] sm:border-[14px]"
        >
          <aside className="flex w-[34%] min-w-[130px] flex-col bg-[#292929] text-white sm:w-[31%] sm:min-w-0">
            <header className="border-b border-[#404040] px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
              <div className="flex items-center justify-between text-xs text-[#d0d0d0]">
                <span className="flex items-center gap-1">
                  {Icons.figma}
                  {Icons.chevronDown}
                </span>
                {Icons.sidebar}
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold sm:text-sm">
                Design title
                <span className="text-[#c7c7c7]">{Icons.chevronDown}</span>
              </p>
              <p className="mt-1 text-[10px] text-[#c7c7c7] sm:text-xs">
                Drafts <span className="ml-1 rounded bg-[#477bb8] px-1.5 py-0.5 text-white">Free</span>
              </p>
            </header>

            <div className="flex items-center gap-2 border-b border-[#404040] px-3 py-2 text-[10px] text-[#d0d0d0] sm:gap-3 sm:px-4 sm:text-xs">
              {['File', 'Assets'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded px-2 py-1 ${activeTab === tab ? 'bg-[#414141] text-white' : ''}`}
                >
                  {tab}
                </button>
              ))}
              {activeTab === 'File' && searchOpen && (
                <input
                  autoFocus
                  aria-label="Search pages"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search pages"
                  className="min-w-0 flex-1 rounded bg-[#414141] px-2 py-1 text-white placeholder:text-[#aaa]"
                />
              )}
              {activeTab === 'File' && (
                <button
                  type="button"
                  aria-label={searchOpen ? 'Close page search' : 'Search pages'}
                  aria-pressed={searchOpen}
                  onClick={() => {
                    setSearchOpen((open) => !open);
                    setQuery('');
                  }}
                  className="ml-auto"
                >
                  {Icons.search}
                </button>
              )}
            </div>

            {activeTab === 'File' ? (
              <section className="mx-1.5 mt-2 rounded-md border-2 border-[#e5242b] px-1.5 pb-1.5 pt-2 sm:mx-2">
                <div className="flex items-center justify-between px-1.5 text-[11px] font-semibold sm:text-xs">
                  <h2>Pages</h2>
                  <button
                    type="button"
                    aria-label="Add page"
                    onClick={addPage}
                    className="text-[#d6d6d6]"
                  >
                    {Icons.plus}
                  </button>
                </div>
                <ul className="mt-2 space-y-0.5 text-[10px] sm:text-xs">
                  {visiblePages.map(({ icon, name }) => (
                    <li key={name}>
                      <button
                        type="button"
                        aria-current={selectedPage === name ? 'page' : undefined}
                        onClick={() => {
                          if (name === 'Mobile') {
                            navigate('/');
                            return;
                          }
                          setSelectedPage(name);
                        }}
                        className={`flex w-full items-center gap-1.5 rounded px-1.5 py-1.5 text-left ${
                          selectedPage === name ? 'bg-[#3d3d3d] font-semibold text-white' : 'text-[#d0d0d0]'
                        }`}
                      >
                        {icon}
                        <span>{name}</span>
                      </button>
                    </li>
                  ))}
                  {visiblePages.length === 0 && (
                    <li className="px-1.5 py-2 text-[#aaa]">No matching pages</li>
                  )}
                </ul>
              </section>
            ) : (
              <section className="px-3 py-3 text-[10px] text-[#d0d0d0] sm:px-4 sm:text-xs">
                No assets in this preview.
              </section>
            )}

            <div className="mt-2 flex items-center gap-1.5 border-t border-[#404040] px-3 py-2.5 text-[10px] font-semibold text-[#e6e6e6] sm:px-4 sm:text-xs">
              <span className="text-[#aaa]">{Icons.chevronRight}</span>
              Layers
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 items-center justify-center px-2 text-center text-white sm:px-6">
            <div className="max-w-[540px]">
              {selectedPage === 'Desktop' ? (
                <>
                  <h1 className="text-[clamp(1.1rem,5.8vw,3rem)] font-bold leading-tight">
                    Hi, User! 🤙
                  </h1>
                  <p className="mt-[clamp(1.4rem,7vw,4.1rem)] text-[clamp(0.8rem,3.9vw,2.1rem)] leading-[1.4] text-[#bdbdbd]">
                    Not all screens are here.
                    <br />
                    Check the <strong className="font-bold text-white">Pages</strong> panel for
                    <br />
                    the full design.
                  </p>
                  <p className="mt-[clamp(1.3rem,6vw,3.5rem)] text-[clamp(0.75rem,2.4vw,1.25rem)] font-bold">
                    figmamarket.com
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-[clamp(1.1rem,5.8vw,3rem)] font-bold leading-tight">
                    {selectedPage}
                  </h1>
                  <p className="mt-6 text-[clamp(0.8rem,3.9vw,2.1rem)] leading-[1.4] text-[#bdbdbd]">
                    This page is not included in the preview.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
