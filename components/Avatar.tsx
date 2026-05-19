'use client'
import { useState } from 'react'

const MESSAGES = ['Bonjour! 👋', 'Hello! 😄', 'Salut! 🚀', 'Hi there! 💻']

export default function Avatar() {
  const [hovered, setHovered] = useState(false)
  const [msgIdx,  setMsgIdx]  = useState(0)

  const onEnter = () => { setMsgIdx(i => (i + 1) % MESSAGES.length); setHovered(true) }
  const onLeave = () => setHovered(false)

  return (
    <>
      {/* Global keyframes for HTML elements (outside SVG) */}
      <style>{`
        @keyframes bubble-pop {
          from { transform: translateX(-50%) scale(0.3); opacity: 0; }
          to   { transform: translateX(-50%) scale(1);   opacity: 1; }
        }
        @keyframes wave-hand {
          0%   { transform: translateY(-50%) rotate(0deg); }
          25%  { transform: translateY(-50%) rotate(-20deg); }
          75%  { transform: translateY(-50%) rotate(20deg); }
          100% { transform: translateY(-50%) rotate(0deg); }
        }
      `}</style>

      <div
        className="av-wrapper"
        style={{ position: 'relative', cursor: 'pointer', display: 'inline-block' }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* ── Speech bubble ─────────────────────────────────────── */}
        {hovered && (
          <div style={{
            position:     'absolute',
            bottom:       'calc(100% + 14px)',
            left:         '50%',
            transform:    'translateX(-50%)',
            background:   '#6366f1',
            color:        'white',
            padding:      '7px 16px',
            borderRadius: '12px',
            whiteSpace:   'nowrap',
            fontSize:     '13px',
            fontWeight:   600,
            lineHeight:   1.4,
            animation:    'bubble-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
            zIndex:       20,
            pointerEvents:'none',
            userSelect:   'none',
          }}>
            {MESSAGES[msgIdx]}
            {/* Triangle pointer */}
            <div style={{
              position:    'absolute',
              bottom:      '-8px',
              left:        '50%',
              transform:   'translateX(-50%)',
              width: 0, height: 0,
              borderLeft:  '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop:   '8px solid #6366f1',
            }} />
          </div>
        )}

        {/* ── Wave hand ─────────────────────────────────────────── */}
        {hovered && (
          <span
            key={msgIdx}   /* remount on each hover to restart animation */
            style={{
              position:      'absolute',
              left:          '-30px',
              top:           '45%',
              transform:     'translateY(-50%)',
              fontSize:      '20px',
              display:       'inline-block',
              animation:     'wave-hand 0.5s ease-in-out 2',
              transformOrigin:'bottom right',
              pointerEvents: 'none',
              userSelect:    'none',
            }}
          >
            👋
          </span>
        )}

        {/* ── Avatar jump wrapper — CSS transition on HTML div ───── */}
        {/* Composes with the SVG float animation cleanly */}
        <div style={{
          transform:  hovered ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'transform 0.3s ease-out',
        }}>
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}
          >
            <defs>
              <clipPath id="av-cl"><rect x="60"  y="89" width="34" height="21" rx="5"/></clipPath>
              <clipPath id="av-cr"><rect x="106" y="89" width="34" height="21" rx="5"/></clipPath>
              <clipPath id="av-hair"><rect x="28" y="14" width="144" height="64"/></clipPath>

              <style>{`
                .av-float {
                  animation: av-float 3s ease-in-out infinite;
                  transform-box: fill-box;
                  transform-origin: center center;
                }
                /* Wave swing — triggered by CSS hover on the wrapper */
                .av-swing {
                  transform-box: fill-box;
                  transform-origin: center 82%;
                }
                .av-wrapper:hover .av-swing {
                  animation: av-wave 0.75s ease-in-out;
                }
                .av-eye-l, .av-eye-r {
                  transform-box: fill-box;
                  transform-origin: center center;
                  animation: av-blink 4s ease-in-out infinite;
                }
                .av-eye-r { animation-delay: 0.06s; }
                .av-gl { animation: av-glint 3s ease-in-out infinite 1.2s; }
                .av-gr { animation: av-glint 3s ease-in-out infinite 1.35s; }

                @keyframes av-float {
                  0%, 100% { transform: translateY(0); }
                  50%      { transform: translateY(-5px); }
                }
                @keyframes av-wave {
                  0%   { transform: rotate(0deg); }
                  18%  { transform: rotate(-14deg); }
                  45%  { transform: rotate(10deg); }
                  70%  { transform: rotate(-6deg); }
                  88%  { transform: rotate(3deg); }
                  100% { transform: rotate(0deg); }
                }
                @keyframes av-blink {
                  0%, 91%, 100% { transform: scaleY(1); }
                  95%           { transform: scaleY(0.07); }
                }
                @keyframes av-glint {
                  0%, 78%, 100% { opacity: 0; transform: translateX(-30px); }
                  82%           { opacity: 0.5; transform: translateX(6px); }
                  87%           { opacity: 0; transform: translateX(34px); }
                }
              `}</style>
            </defs>

            {/* Wave wrapper → Float wrapper → avatar content */}
            <g className="av-swing">
              <g className="av-float">

                {/* Ears */}
                <ellipse cx="34"  cy="108" rx="11" ry="14" fill="#F5D5B8"/>
                <ellipse cx="34"  cy="108" rx="5.5" ry="8" fill="#E8C4A0"/>
                <ellipse cx="166" cy="108" rx="11" ry="14" fill="#F5D5B8"/>
                <ellipse cx="166" cy="108" rx="5.5" ry="8" fill="#E8C4A0"/>

                {/* Face */}
                <circle cx="100" cy="106" r="66" fill="#F5D5B8"/>

                {/* Hair — clipped black arc covering top ~30% of head */}
                <circle cx="100" cy="106" r="70" fill="#1a1a1a" clipPath="url(#av-hair)"/>

                {/* Eyebrows */}
                <path d="M 62,80 Q 74,75 85,79"  stroke="#5a3a1a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                <path d="M 115,79 Q 126,75 138,80" stroke="#5a3a1a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

                {/* Eyes */}
                <g className="av-eye-l">
                  <circle cx="79" cy="99" r="7.5" fill="#0d0700"/>
                  <circle cx="79" cy="99" r="3.8"  fill="#3d1f00"/>
                  <circle cx="81" cy="97" r="2.2"  fill="white" opacity="0.7"/>
                </g>
                <g className="av-eye-r">
                  <circle cx="121" cy="99" r="7.5" fill="#0d0700"/>
                  <circle cx="121" cy="99" r="3.8"  fill="#3d1f00"/>
                  <circle cx="123" cy="97" r="2.2"  fill="white" opacity="0.7"/>
                </g>

                {/* Nose */}
                <path d="M 96,113 Q 100,120 104,113"
                  stroke="#C4907A" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55"/>
                <ellipse cx="95"  cy="121" rx="3" ry="2" fill="#C4907A" opacity="0.4"/>
                <ellipse cx="105" cy="121" rx="3" ry="2" fill="#C4907A" opacity="0.4"/>

                {/* Glasses — left lens */}
                <rect x="58"  y="88" width="36" height="23" rx="6.5"
                  fill="rgba(26,26,46,0.2)" stroke="#1a1a2e" strokeWidth="2.5"/>
                {/* Glasses — right lens */}
                <rect x="105" y="88" width="36" height="23" rx="6.5"
                  fill="rgba(26,26,46,0.2)" stroke="#1a1a2e" strokeWidth="2.5"/>
                {/* Bridge */}
                <path d="M 94,99 C 96,95 103,95 106,99"
                  stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round"/>
                {/* Temples */}
                <line x1="58"  y1="99" x2="44"  y2="107" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="141" y1="99" x2="155" y2="107" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/>

                {/* Glints */}
                <rect className="av-gl" x="63"  y="92" width="8" height="15" rx="4" fill="white" clipPath="url(#av-cl)"/>
                <rect className="av-gr" x="110" y="92" width="8" height="15" rx="4" fill="white" clipPath="url(#av-cr)"/>

                {/* Smile */}
                <path d="M 83,139 Q 100,153 117,139"
                  stroke="#A07060" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

              </g>
            </g>
          </svg>
        </div>
      </div>
    </>
  )
}
