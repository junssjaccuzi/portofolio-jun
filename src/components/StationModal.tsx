import React, { useState } from 'react';
import { portfolioData, stations } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface StationModalProps {
  stationId: string;
  onClose: () => void;
  onNavigateStation: (id: string) => void;
}

export const StationModal: React.FC<StationModalProps> = ({ stationId, onClose, onNavigateStation }) => {
  const [copied, setCopied] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMsg, setSenderMsg] = useState('');

  const currentStation = stations.find(s => s.id === stationId) || stations[0];

  const handleCopyEmail = () => {
    sound.playInteract();
    navigator.clipboard.writeText(portfolioData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playInteract();
    // Open default mail client with prefilled details
    const subject = encodeURIComponent(`Halo Jun dari ${senderName || 'Pengunjung Portofolio'}`);
    const body = encodeURIComponent(`${senderMsg}\n\nDari: ${senderName} (${senderEmail})`);
    window.open(`mailto:${portfolioData.contact.email}?subject=${subject}&body=${body}`, '_blank');
    setMessageSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border-2 border-amber-900/60 bg-gradient-to-b from-[#13101c] via-[#0d0c15] to-[#07070b] shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-amber-900/30 bg-amber-950/20">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
            >
              <span>{currentStation.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400">
                  POS {currentStation.index}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                  {currentStation.subtitle}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-100 font-cinzel">
                {currentStation.title}
              </h2>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => {
              sound.playInteract();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-amber-600 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="Tutup (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Station Navigation Quick Bar */}
        <div className="flex items-center gap-1.5 px-5 sm:px-8 py-2.5 bg-slate-950/60 border-b border-slate-800/60 overflow-x-auto scrollbar-none">
          {stations.map(st => (
            <button
              key={st.id}
              onClick={() => {
                sound.playTeleport();
                onNavigateStation(st.id);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                st.id === stationId 
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.6)] font-mono' 
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-amber-200 border border-slate-800'
              }`}
            >
              <span>{st.icon}</span>
              <span>{st.title}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">

          {/* ================= POS 01: TENTANG ================= */}
          {stationId === 'about' && (
            <div className="space-y-6">
              {/* Profile Card Banner */}
              <div className="p-6 rounded-2xl border border-amber-800/40 bg-gradient-to-br from-amber-950/30 via-slate-900/60 to-purple-950/20 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{portfolioData.primaryRole}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-cinzel">
                      {portfolioData.name} <span className="text-amber-400 font-normal">({portfolioData.nickname})</span>
                    </h3>
                    <p className="text-sm text-slate-300 font-mono mt-1 flex items-center gap-1.5">
                      <span>📍</span> {portfolioData.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-handwriting text-2xl text-amber-200 italic">
                      "{portfolioData.tagline}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-3 text-slate-200 leading-relaxed text-sm sm:text-base">
                {portfolioData.bio.map((p, idx) => (
                  <p key={idx} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
                    {p}
                  </p>
                ))}
              </div>

              {/* Philosophy Quote */}
              <div className="p-4 rounded-xl border-l-4 border-amber-500 bg-amber-950/20 text-amber-200/90 text-sm italic font-serif">
                {portfolioData.philosophy}
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {portfolioData.stats.map((stat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-center">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      {stat.label}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-amber-300 mt-1 block">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Skill Categories & Tech Stack */}
              <div>
                <h4 className="text-lg font-bold text-amber-100 mb-4 font-cinzel flex items-center gap-2">
                  <span>⚡</span> Keahlian & Tech Stack Unggulan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolioData.skillCategories.map((cat, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
                      <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
                        {cat.title}
                      </h5>
                      <div className="space-y-2.5">
                        {cat.skills.map((skill, sIdx) => (
                          <div key={sIdx}>
                            <div className="flex justify-between text-xs font-medium mb-1">
                              <span className="text-slate-200">{skill.name}</span>
                              <span className="text-amber-400 font-mono">{skill.level}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div 
                                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= POS 02: PROYEK ================= */}
          {stationId === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-cinzel">
                    Karya, Riset AI & Solusi Digital
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Portofolio proyek nyata yang menggabungkan Machine Learning, arsitektur web modern, dan sistem scalable.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {portfolioData.projects.map((proj) => (
                  <div 
                    key={proj.id}
                    className="p-5 rounded-2xl border border-slate-800 hover:border-amber-500/60 bg-slate-900/60 transition-all hover:-translate-y-1 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                          {proj.category}
                        </span>
                        {proj.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-orange-600/20 text-orange-400 border border-orange-500/30">
                            ★ {proj.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                        {proj.title}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed mt-2">
                        {proj.description}
                      </p>

                      <div className="mt-3 space-y-1.5 border-t border-slate-800/80 pt-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                          Sorotan Fitur:
                        </span>
                        {proj.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                            <span className="text-amber-400 text-xs">✔</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {proj.techStack.map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>

                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                        >
                          <span>Kode GitHub</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= POS 03: PENDIDIKAN ================= */}
          {stationId === 'education' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white font-cinzel">
                  Riwayat & Jejak Pendidikan Formal
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Perjalanan dedikasi belajar dari bangku sekolah dasar di Tasikmalaya hingga jenjang pendidikan tinggi di Universitas Perjuangan.
                </p>
              </div>

              {/* Timeline Container */}
              <div className="relative border-l-2 border-amber-600/40 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6">
                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="relative group">
                    {/* Glowing Timeline Marker */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full border-2 border-amber-400 bg-slate-950 flex items-center justify-center text-[10px] text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                      {idx + 1}
                    </div>

                    <div className="p-5 rounded-2xl border border-slate-800 group-hover:border-amber-500/50 bg-slate-900/50 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {edu.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {edu.period}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-200 transition-colors">
                        {edu.institution}
                      </h4>
                      <p className="text-xs font-semibold text-amber-400/90 font-mono mt-0.5">
                        {edu.level} • {edu.location}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= POS 04: PENGALAMAN ================= */}
          {stationId === 'experience' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white font-cinzel">
                  Pengalaman & Kompetensi Rekayasa Perangkat Lunak
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Praktik rekayasa perangkat lunak, pengembangan model AI, dan optimasi arsitektur full-stack.
                </p>
              </div>

              <div className="space-y-4">
                {portfolioData.experiences.map((exp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-bold text-amber-100 font-cinzel">
                          {exp.role}
                        </h4>
                        <p className="text-xs text-amber-400 font-mono">
                          {exp.company} • <span className="text-slate-400">{exp.type}</span>
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                        {exp.period}
                      </span>
                    </div>

                    <div className="space-y-1.5 border-t border-slate-800/80 pt-3">
                      {exp.description.map((desc, dIdx) => (
                        <div key={dIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-amber-400 text-sm leading-none mt-1">▸</span>
                          <span>{desc}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {exp.skills.map((sk, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= POS 05: KONTAK ================= */}
          {stationId === 'contact' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-amber-800/40 bg-gradient-to-br from-amber-950/30 via-slate-900/60 to-orange-950/20 text-center">
                <span className="text-3xl mb-2 inline-block">✉️</span>
                <h3 className="text-2xl font-bold text-white font-cinzel">
                  Mari Terhubung & Berkolaborasi
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-1">
                  Pintu selalu terbuka untuk diskusi proyek, freelance, riset AI, maupun peluang kerja profesional.
                </p>

                {/* Email Display & Quick Copy */}
                <div className="mt-4 inline-flex items-center gap-2 p-2 rounded-full border border-amber-500/40 bg-slate-950/80 max-w-full">
                  <span className="font-mono text-xs sm:text-sm text-amber-300 font-bold px-3 truncate">
                    {portfolioData.contact.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    {copied ? '✔ Tersalin!' : 'Salin Email'}
                  </button>
                </div>
              </div>

              {/* Direct Send Message Form */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono mb-4 flex items-center gap-1.5">
                  <span>💬</span> Kirim Pesan Langsung ke Surel Jun
                </h4>

                {messageSent ? (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-center text-sm font-medium">
                    Aplikasi email Anda telah terbuka! Terima kasih telah menyapa Jun.
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Nama Anda:</label>
                        <input
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="Masukkan nama Anda..."
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Email Anda:</label>
                        <input
                          type="email"
                          required
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="nama@domain.com"
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Pesan / Ide Kolaborasi:</label>
                      <textarea
                        required
                        rows={3}
                        value={senderMsg}
                        onChange={(e) => setSenderMsg(e.target.value)}
                        placeholder="Tuliskan pesan Anda untuk Rendra Adie Permana (Jun)..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-white text-xs outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Kirim Pesan ke Jun</span>
                      <span>🚀</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 sm:px-8 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">
            Rendra Adie Permana (Jun) • {portfolioData.location}
          </span>
          <button
            type="button"
            onClick={() => {
              sound.playInteract();
              onClose();
            }}
            className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
          >
            Tutup Jendela ✕
          </button>
        </div>
      </div>
    </div>
  );
};
