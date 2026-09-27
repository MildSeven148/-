import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MODULES, getLesson, getLang, getLevel, getModule, BADGES } from '../mock/data';
import VocabularyPlayer from '../modules/VocabularyPlayer';
import GrammarPlayer from '../modules/GrammarPlayer';
import ListeningPlayer from '../modules/ListeningPlayer';
import SpeakingPlayer from '../modules/SpeakingPlayer';
import { Confetti, ProgressBar } from '../components/common';
import { stopSpeak } from '../utils/tts';

const PLAYERS = { vocab: VocabularyPlayer, grammar: GrammarPlayer, listening: ListeningPlayer, speaking: SpeakingPlayer };

export default function LessonPage() {
  const { lessonId } = useParams();
  const { currentUser, recordActivity, showToast } = useApp();
  const lesson = getLesson(lessonId);

  const [activeTab, setActiveTab] = useState(lesson ? lesson.type : 'vocab');
  const [moduleDone, setModuleDone] = useState({ vocab: false, grammar: false, listening: false, speaking: false });
  const [confetti, setConfetti] = useState(false);

  const alreadyCompleted = useMemo(
    () => currentUser?.progress.completed.includes(lessonId) || false,
    [currentUser, lessonId]
  );
  const [completed, setCompleted] = useState(alreadyCompleted);

  if (!lesson || !getLang(lesson.languageId)) return <div className="container page" style={{ paddingTop: 80 }}>课时不存在</div>;
  const lang = getLang(lesson.languageId);
  const level = getLevel(lesson.levelId);

  const handleFinish = (type) => {
    if (moduleDone[type]) return;
    setModuleDone((prev) => ({ ...prev, [type]: true }));
    const isFeatured = type === lesson.type;
    const deltas = { vocab: { words: 6, xp: 6 }, grammar: { grammar: 1, xp: 6 }, listening: { listening: 1, xp: 6 }, speaking: { speaking: 1, xp: 6 } }[type];

    const newBadges = recordActivity({
      ...deltas,
      minutes: 1,
      ...(isFeatured && !completed ? { lessonId, completeLesson: true, xp: deltas.xp + 20 } : {}),
    });

    if (isFeatured && !completed) {
      setCompleted(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3200);
      showToast(`🎓 课时完成！获得 ${deltas.xp + 20} XP`, 'success');
    } else {
      showToast(`完成「${getModule(type).name}」+${deltas.xp} XP`, 'info');
    }

    newBadges.forEach((b) => {
      const badge = BADGES.find((x) => x.id === b);
      if (badge) showToast(`🏅 解锁成就「${badge.name}」`, 'success');
    });
  };

  const courseLink = `/courses/${lesson.courseId}`;
  const Player = PLAYERS[activeTab];
  const mod = getModule(activeTab);
  const tabContent = {
    vocab: { words: lesson.content.words },
    grammar: lesson.content.grammar,
    listening: lesson.content.listening,
    speaking: lesson.content.speaking,
  }[activeTab];

  return (
    <div className="container page" style={{ padding: '28px 24px 60px' }}>
      {confetti && <Confetti />}

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
        <Link to={courseLink} className="btn btn-ghost btn-sm">← 返回课程</Link>
        <span className="pill" style={{ background: `${lang.color}1a`, color: lang.color, borderColor: 'transparent' }}>
          {lang.flag} {lang.name}
        </span>
        <span className="pill pill-brand">{level.icon} {level.name}</span>
        {completed && <span className="pill pill-ok">✅ 本课已完成</span>}
      </div>

      <div className="card" style={{ padding: '24px 28px', marginBottom: 22 }}>
        <h1 style={{ fontSize: 24 }}>{lesson.title}</h1>
        <p className="muted" style={{ marginTop: 6 }}>{lesson.subtitle}</p>
        {completed && (
          <div style={{ marginTop: 12, maxWidth: 320 }}>
            <ProgressBar pct={100} />
            <span className="muted" style={{ fontSize: 12 }}>本课已通关，可反复练习巩固</span>
          </div>
        )}
      </div>

      <div className="learn-shell">
        <nav className="learn-nav">
          {MODULES.map((m) => {
            const isActive = m.id === activeTab;
            const isFeatured = m.id === lesson.type;
            const done = moduleDone[m.id];
            return (
              <button
                key={m.id}
                className={`ln-item${isActive ? ' active' : ''}${done ? ' done' : ''}`}
                onClick={() => {
                  stopSpeak();
                  setActiveTab(m.id);
                }}
              >
                <span>{m.icon}</span>
                <span>
                  {m.name}
                  {isFeatured && <span className="muted" style={{ fontSize: 11 }}> · 本节重点</span>}
                </span>
                <span className="ln-check">{done ? '✓' : isActive ? '●' : ''}</span>
              </button>
            );
          })}
          <div className="ln-item" style={{ pointerEvents: 'none', cursor: 'default', color: 'var(--muted)', fontSize: 12.5, lineHeight: 1.6 }}>
            💡 完成任意模块得 XP，完成「本节重点」即通关本课
          </div>
        </nav>

        <div className="learn-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontSize: 19 }}>{mod.icon} {mod.name} <span className="muted" style={{ fontSize: 13, fontWeight: 400 }}>· {mod.desc}</span></h3>
            {moduleDone[activeTab] && <span className="pill pill-ok">已完成</span>}
          </div>
          <Player
            key={activeTab}
            lang={lang.tts}
            content={tabContent}
            words={lesson.content.words}
            onFinish={() => handleFinish(activeTab)}
          />
        </div>
      </div>
    </div>
  );
}
