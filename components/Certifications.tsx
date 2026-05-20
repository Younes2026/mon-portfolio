'use client'

const CERTS = [
  {
    title: 'Machine Learning with Python',
    href: 'https://coursera.org/share/12ed8307d0d87f200323c34581c24683',
  },
  {
    title: 'Advanced Spring Cloud Microservices & Docker',
    href: 'https://coursera.org/share/630aead373bee03b6401bf24f039de8f',
  },
  {
    title: 'Introduction to Java and OOP',
    href: 'https://coursera.org/share/f99d952c9de504ade29aeca9a5c4bb30',
  },
  {
    title: 'React Basics',
    href: 'https://coursera.org/share/b75eb883431c9e23dfef507f64b23dfa',
  },
  {
    title: 'Introduction to Containers w/ Docker, Kubernetes & OpenShift',
    href: 'https://coursera.org/share/94fe170ed9a53a13ede6ae041393aaa5',
  },
  {
    title: 'The Structured Query Language (SQL)',
    href: 'https://coursera.org/share/451ce2f85c066648e651830aba84973d',
  },
  {
    title: 'Interactivity with JavaScript',
    href: 'https://coursera.org/share/7de318d5d7eb7aabb7f05d30070a1ed5',
  },
  {
    title: 'The Unix Workbench',
    href: 'https://coursera.org/share/e680f7af73c4b02d9e18097cc5d16235',
  },
  {
    title: 'Software Engineering: Software Design and Project Management',
    href: 'https://coursera.org/share/fab6fcdc377562c061427823e7162a64',
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 80% 40%, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-indigo-400 font-medium mb-4">Formations</p>
          <h2 className="text-[clamp(2.4rem,5vw,3.8rem)] font-bold tracking-tight">Certifications</h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Certifications obtenues via Coursera pour approfondir mes compétences techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map(({ title, href }) => (
            <div key={title}
              className="group flex flex-col gap-4 p-5 rounded-sm
                         border border-[#1f1f1f] bg-[#111]
                         hover:border-indigo-500/60 hover:shadow-[0_0_20px_rgba(99,102,241,0.12)]
                         transition-all duration-300">

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
                  style={{ background: '#0056D215', color: '#0056D2', border: '1px solid #0056D230' }}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.998 0C5.366 0 0 5.366 0 11.998 0 18.632 5.366 24 11.998 24 18.632 24 24 18.632 24 11.998 24 5.366 18.632 0 11.998 0zm0 4.562a7.44 7.44 0 110 14.88 7.44 7.44 0 010-14.88z"/>
                  </svg>
                  Coursera
                </span>
              </div>

              <p className="text-white font-bold text-sm leading-snug flex-1">{title}</p>

              <a href={href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400
                           hover:text-indigo-300 transition-colors duration-200 self-start">
                Voir le certificat
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <p className="animate-pulse"
          style={{ color: '#6366f1', fontStyle: 'italic', textAlign: 'center', marginTop: '28px', fontSize: '14px', opacity: 0.7 }}>
          &amp; more...
        </p>
      </div>
    </section>
  )
}
