import { useEffect, useState } from 'react'

type IllustrationKind = 'zones' | 'gear' | 'noise' | 'rescue' | 'funding'

type Policy = {
  id: IllustrationKind
  number: string
  eyebrow: string
  title: string
  lead: string
  facts: { value: string; label: string }[]
  details: string[]
  color: string
}

const policies: Policy[] = [
  {
    id: 'zones',
    number: '01',
    eyebrow: 'Safer routes',
    title: 'Whale protection zones',
    lead: 'Slow ships down where whales feed, breed, and migrate—especially when verified sightings reveal an immediate risk.',
    facts: [
      { value: '10', label: 'knot speed limit' },
      { value: '65+ ft', label: 'vessels covered' },
    ],
    details: [
      'NOAA creates seasonal zones and temporary dynamic zones.',
      'The Coast Guard helps notify vessels and verify compliance.',
      'Urgent rescue, emergency, and national-security missions are exempt when needed.',
    ],
    color: '#ffcf67',
  },
  {
    id: 'gear',
    number: '02',
    eyebrow: 'Rope-free routes',
    title: 'Prevent entanglement',
    lead: 'Replace dangerous vertical lines in high-risk fishing areas while helping small fishing businesses make the transition.',
    facts: [
      { value: '5 yrs', label: 'to transition gear' },
      { value: '80%', label: 'costs grant may cover' },
    ],
    details: [
      'Approved on-demand, ropeless, or reduced-line systems lower risk.',
      'Lost commercial gear must be marked and reported within 48 hours when safe.',
      'NOAA coordinates removal of abandoned gear that threatens whales.',
    ],
    color: '#ff8e78',
  },
  {
    id: 'noise',
    number: '03',
    eyebrow: 'Turn down the volume',
    title: 'Quieter whale habitats',
    lead: 'Set science-based noise limits for seismic surveys, pile driving, construction, and similar work in important habitats.',
    facts: [
      { value: 'Listen', label: 'before and during work' },
      { value: 'Pause', label: 'when whales enter' },
    ],
    details: [
      'Trained observers or approved acoustic monitoring watch for whales.',
      'Activities slow or stop when a whale enters NOAA’s safety area.',
      'Especially loud work may be limited during feeding, breeding, or migration.',
    ],
    color: '#a6e679',
  },
  {
    id: 'rescue',
    number: '04',
    eyebrow: 'Spot. Share. Save.',
    title: 'Detection and rescue',
    lead: 'Connect acoustic buoys, aerial surveys, vessel observations, responders, and reliable technology into one faster warning network.',
    facts: [
      { value: '24 hrs', label: 'collision reporting' },
      { value: '1', label: 'national database' },
    ],
    details: [
      'Verified alerts go promptly to nearby vessels and enforcement agencies.',
      'NOAA funds trained whale-entanglement response teams.',
      'A public report to Congress tracks activity, rescues, spending, and outcomes yearly.',
    ],
    color: '#7bdde0',
  },
  {
    id: 'funding',
    number: '05',
    eyebrow: 'Make it work',
    title: 'Funding and accountability',
    lead: 'Give agencies the resources to enforce clear standards—and give communities a fair path to safer practices.',
    facts: [
      { value: '$100M', label: 'authorized each year' },
      { value: '2027–31', label: 'funding period' },
    ],
    details: [
      'NOAA administers the Act with Coast Guard vessel-safety support.',
      'Civil penalties can reach $50,000 per violation, with a right to contest allegations.',
      'Rules must include consultation with states, Tribes, fishers, scientists, and industry.',
    ],
    color: '#ffd86f',
  },
]

const chapterLinks = [
  { id: 'top', short: 'Start', label: 'Surface' },
  ...policies.map((policy) => ({ id: policy.id, short: policy.number, label: policy.title })),
  { id: 'support', short: '✓', label: 'Support' },
  { id: 'full-bill', short: '§', label: 'Full Bill' },
  { id: 'works-cited', short: 'B', label: 'Works Cited' },
]

function LogoMark() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}whale-mark.svg`}
      alt=""
      aria-hidden="true"
      className="logo-mark"
    />
  )
}

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="WHALE Act home">
        <LogoMark />
        <span>WHALE ACT</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#zones">The protections</a>
        <a href="#full-bill">Full bill</a>
        <a href="#works-cited">Works cited</a>
        <a href="#support" className="nav-cta">Support the act</a>
      </nav>
    </header>
  )
}

function DepthNavigation({ activeId }: { activeId: string }) {
  return (
    <nav className="depth-nav" aria-label="Ocean depth chapters">
      <span className="depth-label">Dive progress</span>
      <div className="depth-line" aria-hidden="true" />
      {chapterLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={activeId === link.id ? 'active' : ''}
          aria-current={activeId === link.id ? 'location' : undefined}
        >
          <span className="depth-dot">{link.short}</span>
          <span className="depth-name">{link.label}</span>
        </a>
      ))}
    </nav>
  )
}

function TinyFish({ x, y, flip = false, color = '#b8f2e6' }: { x: number; y: number; flip?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} fill={color} className="tiny-fish">
      <ellipse cx="0" cy="0" rx="15" ry="8" />
      <path d="M-12 0-26-11v22Z" />
      <circle cx="7" cy="-2" r="1.8" fill="#073b4c" />
    </g>
  )
}

function MascotWhale({ transform, className = '' }: { transform?: string; className?: string }) {
  return (
    <image
      href={`${import.meta.env.BASE_URL}whale-mascot.png`}
      width="390"
      height="250"
      transform={transform}
      className={`mascot-whale ${className}`}
      preserveAspectRatio="xMidYMid meet"
    />
  )
}

function HeroWhale() {
  return (
    <svg className="hero-art" viewBox="0 0 720 550" role="img" aria-label="A smiling whale swims safely under a small boat at the ocean surface">
      <g className="sun-rays" opacity=".4" fill="#fff9c7">
        <path d="M82 0h88L80 430 15 410Z" />
        <path d="M235 0h45l34 355-70 7Z" />
        <path d="M390 0h73l-40 331-62-9Z" />
      </g>
      <g className="hero-boat">
        <path d="M418 103h156l-27 54H445Z" fill="#fff7e4" className="ink" />
        <path d="M465 53h68v50h-68Z" fill="#ff8e78" className="ink" />
        <path d="M479 68h40v21h-40Z" fill="#a8edf0" className="ink thin" />
        <path d="M499 52V27" className="ink-line" />
        <path d="M501 28c31 5 45 21 60 12" className="ink-line wake" />
      </g>
      <path className="surface-line" d="M17 161c59-31 120 31 179 0s120 31 180 0 120 31 180 0 101 23 150 3" />
      <g className="hero-whale">
        <MascotWhale transform="translate(70 170) scale(1.5)" />
        <path d="M292 213c-9-38 4-63 38-77-3 30 10 49 37 58" fill="none" className="ink-line spout" />
        <circle cx="316" cy="118" r="11" fill="#b8f2e6" />
        <circle cx="347" cy="83" r="7" fill="#b8f2e6" />
      </g>
      <TinyFish x={547} y={252} />
      <TinyFish x={590} y={289} flip color="#ffe27a" />
      <g fill="none" stroke="#b8f2e6" strokeWidth="5">
        <circle cx="576" cy="452" r="12" /><circle cx="608" cy="413" r="7" /><circle cx="58" cy="411" r="8" />
      </g>
    </svg>
  )
}

function ZonesArt() {
  return (
    <svg viewBox="0 0 560 430" role="img" aria-label="A ship slows to ten knots near a protected whale route">
      <g className="scene-sun" fill="#ffe37c"><circle cx="72" cy="58" r="33" /><path d="M72 7v18M72 92v18M21 58h18M105 58h18" className="sun-lines" /></g>
      <g className="scene-boat boat-bob">
        <path d="M247 102h194l-30 68H278Z" fill="#fff5d9" className="ink" />
        <path d="M306 54h81v48h-81Z" fill="#ff8e78" className="ink" />
        <path d="M321 68h21v19h-21ZM352 68h21v19h-21Z" fill="#9ee7e6" className="ink thin" />
        <path d="M347 52V30" className="ink-line" />
      </g>
      <path d="M29 174c43-22 86 22 129 0s86 22 129 0 86 22 129 0 86 22 118 4" className="water-line" />
      <g className="buoy bob">
        <path d="M154 193v104" className="ink-line" />
        <path d="M126 224c2-24 13-40 28-40s26 16 28 40Z" fill="#ffcf67" className="ink" />
        <path d="M132 239h44l-7 48h-30Z" fill="#ff8e78" className="ink" />
        <rect x="113" y="295" width="82" height="51" rx="12" fill="#fff7e4" className="ink" />
        <text x="154" y="329" textAnchor="middle" className="svg-label">10 KNOTS</text>
      </g>
      <g className="mini-whale swim">
        <MascotWhale transform="translate(200 232) scale(.9)" />
      </g>
      <path d="M229 245c74-20 149-20 225 0" fill="none" stroke="#a9efe7" strokeWidth="4" strokeDasharray="11 13" />
      <text x="341" y="235" textAnchor="middle" className="route-label">PROTECTED ROUTE</text>
    </svg>
  )
}

function GearArt() {
  return (
    <svg viewBox="0 0 560 430" role="img" aria-label="A whale passes safely over on-demand fishing gear without vertical ropes">
      <path d="M0 342c76-44 146 25 220-9 79-37 154 28 230-7 46-21 81-20 110-3v107H0Z" fill="#07546e" />
      <g className="gear-whale swim-reverse">
        <MascotWhale transform="translate(58 48) scale(1.03)" />
      </g>
      <g className="rope-system">
        <path d="M430 332c-26-40-24-75 5-104 22-21 31-42 28-64" fill="none" stroke="#ff8e78" strokeWidth="11" strokeLinecap="round" strokeDasharray="18 14" className="retract-rope" />
        <path d="M397 331h77l-9 61h-59Z" fill="#ff8e78" className="ink" />
        <path d="M411 345h50M410 364h52" className="ink-line thin-line" />
        <circle cx="463" cy="154" r="20" fill="#ffe27a" className="ink signal-float" />
        <path d="M451 154h24M463 142v24" className="ink-line thin-line" />
      </g>
      <g className="signal-rings" fill="none" stroke="#b8f2e6" strokeWidth="5" strokeLinecap="round">
        <path d="M480 119c17 9 27 22 31 39"/><path d="M490 95c28 14 46 36 53 64"/>
      </g>
      <rect x="37" y="288" width="184" height="61" rx="30" fill="#fff7e4" className="ink" />
      <text x="129" y="326" textAnchor="middle" className="svg-label large">ROPELESS • SAFER</text>
      <g className="kelp" fill="#45bb84" stroke="#073b4c" strokeWidth="5">
        <path d="M31 393c20-29-5-47 14-69 21 29 1 45 18 69"/><path d="M495 392c18-27-3-45 15-67 19 25 3 43 20 67"/>
      </g>
    </svg>
  )
}

function NoiseArt() {
  return (
    <svg viewBox="0 0 560 430" role="img" aria-label="Monitoring quiets construction noise so a whale can communicate">
      <g className="pile-driver">
        <path d="M52 82h95v245H52Z" fill="#ffcf67" className="ink" />
        <path d="M39 80h121v35H39Z" fill="#ff8e78" className="ink" />
        <path d="M79 114h41v225H79Z" fill="#fff5d9" className="ink" />
        <path d="M35 348h138" className="ink-line" />
      </g>
      <g className="sound-waves" fill="none" stroke="#ff8e78" strokeWidth="10" strokeLinecap="round">
        <path d="M182 144c33 20 33 52 0 72"/><path d="M210 118c58 36 58 90 0 126"/><path d="M241 94c80 49 80 125 0 174"/>
      </g>
      <g className="pause-badge">
        <circle cx="222" cy="305" r="48" fill="#a6e679" className="ink" />
        <path d="M207 286v38M237 286v38" className="ink-line" />
      </g>
      <g className="noise-whale swim">
        <MascotWhale transform="translate(278 192) scale(.78)" />
      </g>
      <g className="whale-call" fill="none" stroke="#b8f2e6" strokeWidth="5" strokeLinecap="round">
        <path d="M385 193c18-18 39-18 58 0"/><path d="M369 174c29-31 63-31 91 0"/>
      </g>
      <g className="meter">
        <rect x="326" y="335" width="190" height="54" rx="27" fill="#fff7e4" className="ink" />
        <rect x="342" y="351" width="88" height="22" rx="11" fill="#a6e679" />
        <text x="473" y="370" textAnchor="middle" className="svg-label">QUIETER</text>
      </g>
    </svg>
  )
}

function RescueArt() {
  return (
    <svg viewBox="0 0 560 430" role="img" aria-label="A smart buoy detects a whale and alerts a nearby rescue boat">
      <g className="rescue-boat boat-bob">
        <path d="M325 101h169l-26 60H350Z" fill="#fff5d9" className="ink" />
        <path d="M369 57h74v44h-74Z" fill="#ff8e78" className="ink" />
        <path d="M383 68h46v21h-46Z" fill="#9ee7e6" className="ink thin" />
        <path d="M406 57V34M406 34l25 12" className="ink-line thin-line" />
        <path d="M438 132h28" stroke="#ff8e78" strokeWidth="8" />
      </g>
      <path d="M13 166c52-25 101 25 153 0s101 25 153 0 101 25 153 0 80 17 94 12" className="water-line" />
      <g className="smart-buoy bob">
        <path d="M132 185v111" className="ink-line" />
        <path d="M105 218c3-25 12-39 27-39s24 14 27 39Z" fill="#ffcf67" className="ink" />
        <path d="M111 232h42l-7 54h-28Z" fill="#ff8e78" className="ink" />
        <circle cx="132" cy="197" r="6" fill="#073b4c" />
      </g>
      <g className="radar-rings" fill="none" stroke="#b8f2e6" strokeWidth="5">
        <circle cx="132" cy="198" r="38"/><circle cx="132" cy="198" r="65"/>
      </g>
      <path d="M175 147c60-74 136-74 201-19" fill="none" stroke="#ffe27a" strokeWidth="6" strokeDasharray="10 12" className="alert-line" />
      <g className="rescue-whale swim-reverse">
        <MascotWhale transform="translate(165 267) scale(.65)" />
      </g>
      <g className="location-pin">
        <path d="M300 222c0-25 19-44 44-44s44 19 44 44c0 38-44 75-44 75s-44-37-44-75Z" fill="#ff8e78" className="ink" />
        <circle cx="344" cy="221" r="13" fill="#fff7e4" className="ink thin" />
      </g>
    </svg>
  )
}

function FundingArt() {
  return (
    <svg viewBox="0 0 560 430" role="img" aria-label="Funding flows into monitoring, rescue, and fair enforcement programs">
      <g className="clipboard">
        <rect x="62" y="61" width="244" height="308" rx="24" fill="#fff5d9" className="ink" />
        <path d="M130 55c0-23 18-40 40-40h28c22 0 40 17 40 40v20H130Z" fill="#ffcf67" className="ink" />
        <g className="check check-one"><circle cx="118" cy="139" r="19" fill="#a6e679" className="ink thin" /><path d="m108 139 8 9 14-19" className="ink-line thin-line" /></g>
        <g className="check check-two"><circle cx="118" cy="208" r="19" fill="#a6e679" className="ink thin" /><path d="m108 208 8 9 14-19" className="ink-line thin-line" /></g>
        <g className="check check-three"><circle cx="118" cy="277" r="19" fill="#a6e679" className="ink thin" /><path d="m108 277 8 9 14-19" className="ink-line thin-line" /></g>
        <path d="M154 139h98M154 208h98M154 277h98" className="ink-line thin-line" opacity=".35" />
        <rect x="100" y="317" width="168" height="28" rx="14" fill="#7bdde0" />
        <text x="184" y="338" textAnchor="middle" className="svg-label">PUBLIC REPORT</text>
      </g>
      <g className="fund-bubble">
        <circle cx="411" cy="151" r="89" fill="#ffcf67" className="ink" />
        <text x="411" y="141" textAnchor="middle" className="money-label">$100M</text>
        <text x="411" y="173" textAnchor="middle" className="svg-label">EACH YEAR</text>
      </g>
      <g className="coin coin-one"><circle cx="375" cy="296" r="28" fill="#ffe27a" className="ink thin" /><text x="375" y="305" textAnchor="middle" className="coin-label">$</text></g>
      <g className="coin coin-two"><circle cx="444" cy="331" r="28" fill="#ffe27a" className="ink thin" /><text x="444" y="340" textAnchor="middle" className="coin-label">$</text></g>
      <g className="coin coin-three"><circle cx="505" cy="278" r="28" fill="#ffe27a" className="ink thin" /><text x="505" y="287" textAnchor="middle" className="coin-label">$</text></g>
      <path d="M342 242c37 12 77 16 119 11" fill="none" stroke="#b8f2e6" strokeWidth="5" strokeDasharray="9 12" />
    </svg>
  )
}

function OceanIllustration({ kind }: { kind: IllustrationKind }) {
  const content = {
    zones: <ZonesArt />,
    gear: <GearArt />,
    noise: <NoiseArt />,
    rescue: <RescueArt />,
    funding: <FundingArt />,
  }
  return <div className={`illustration illustration-${kind}`}>{content[kind]}</div>
}

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <svg className={`wave-divider ${flip ? 'flip' : ''}`} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 58c162-62 314 60 486 4s294-56 460-2 320 33 494-22v82H0Z" />
    </svg>
  )
}

function PolicySection({ policy, index }: { policy: Policy; index: number }) {
  return (
    <section
      className={`policy-section story-chapter ${index % 2 ? 'reverse' : ''}`}
      id={policy.id}
      style={{ '--accent': policy.color } as React.CSSProperties}
      data-chapter={policy.id}
    >
      <div className="section-bubbles" aria-hidden="true"><i /><i /><i /></div>
      <div className="section-inner reveal">
        <div className="art-column">
          <span className="section-number" aria-hidden="true">{policy.number}</span>
          <OceanIllustration kind={policy.id} />
        </div>
        <div className="copy-column">
          <span className="eyebrow"><i /> SECTION {policy.number} · {policy.eyebrow}</span>
          <h2>{policy.title}</h2>
          <p className="section-lead">{policy.lead}</p>
          <div className="fact-row">
            {policy.facts.map((fact) => (
              <div className="fact" key={fact.value}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
          <ul className="detail-list">
            {policy.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
          <a className="next-link" href={index < policies.length - 1 ? `#${policies[index + 1].id}` : '#support'}>
            Next: {index < policies.length - 1 ? policies[index + 1].eyebrow : 'Bring it to the surface'} <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function BubbleBurst({ active }: { active: boolean }) {
  return (
    <div className={`bubble-burst ${active ? 'bursting' : ''}`} aria-hidden="true">
      {Array.from({ length: 14 }, (_, index) => (
        <i key={index} style={{ '--i': index } as React.CSSProperties} />
      ))}
    </div>
  )
}

function FinaleWhales() {
  return (
    <svg viewBox="0 0 800 290" aria-hidden="true" className="finale-whales">
      <g className="pod pod-one">
        <MascotWhale transform="translate(38 55) scale(1)" />
      </g>
      <g className="pod pod-two">
        <MascotWhale transform="translate(490 20) scale(.66)" />
      </g>
      <g className="pod pod-three">
        <MascotWhale transform="translate(400 172) scale(.45)" />
      </g>
      <TinyFish x={704} y={214} flip color="#ff8e78" />
      <TinyFish x={66} y={68} color="#ffe27a" />
    </svg>
  )
}

function BillClause({ label, children }: { label: string; children: React.ReactNode }) {
  return <p className="bill-clause"><strong>({label})</strong> {children}</p>
}

function FullBill() {
  return (
    <section className="full-bill-section story-chapter" id="full-bill" data-chapter="full-bill">
      <div className="document-watermark" aria-hidden="true"><LogoMark /></div>
      <div className="full-bill-intro reveal">
        <span className="eyebrow dark"><i /> THE COMPLETE PROPOSAL</span>
        <h2>Read the full bill.</h2>
        <p>Every provision appears below exactly as part of the proposal, with the updated formal title.</p>
      </div>

      <article className="bill-document reveal" aria-labelledby="bill-document-title">
        <header className="bill-document-header">
          <p className="document-type">House of Representatives Bill Document</p>
          <div className="bill-meta">
            <p><span>Representative</span><strong>Alexander Sementchenko</strong></p>
            <p><span>H.R. Number</span><strong>1929</strong></p>
          </div>
          <p className="introduced">Introduced the following bill:</p>
          <h2 id="bill-document-title">Whale Habitat and Life Enforcement (WHALE) Act of 2026</h2>
          <p className="bill-deck">A Bill to establish national standards to reduce preventable whale deaths and injuries caused by vessel strikes, fishing-gear entanglement, and excessive underwater noise in waters under United States jurisdiction.</p>
          <p className="enactment">Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled that,</p>
        </header>

        <div className="bill-body">
          <section>
            <h3>Purpose &amp; Goals</h3>
            <p>The purpose of this Act is to prevent avoidable whale injuries and deaths, protect important feeding and migration areas, improve whale detection and emergency response, and help affected fishing and maritime businesses adopt safer practices.</p>
            <p>The goals are to reduce ship strikes and entanglements, limit disruptive underwater noise, use reliable monitoring to guide enforcement, and measure progress through annual public reporting.</p>
          </section>

          <section>
            <h3>Section 1: Whale Protection Zones and Vessel Speeds</h3>
            <BillClause label="a">The National Oceanic and Atmospheric Administration (NOAA) shall designate seasonal whale protection zones along major feeding, breeding, and migration routes in United States waters. NOAA may also create temporary dynamic zones when verified whale detections show an immediate risk of collision.</BillClause>
            <BillClause label="b">A vessel 65 feet or longer may not exceed 10 knots inside a designated zone. NOAA and the United States Coast Guard shall provide timely notice of zone boundaries and effective dates to vessel operators.</BillClause>
            <BillClause label="c">Emergency, rescue, and national-security vessels are exempt only when compliance would interfere with an urgent mission. Covered commercial vessels shall maintain required tracking equipment in operating condition so compliance can be verified.</BillClause>
          </section>

          <section>
            <h3>Section 2: Fishing-Gear Entanglement Prevention</h3>
            <BillClause label="a">NOAA shall identify federal fishing areas where vertical buoy lines and other fixed gear create a high risk of whale entanglement. Risk determinations shall use the best available information on whale movements, fishing activity, and recorded entanglements.</BillClause>
            <BillClause label="b">Within five years after enactment, commercial fixed-gear fisheries operating in designated high-risk areas shall use approved on-demand, ropeless, or reduced-line systems that substantially reduce the number of vertical lines in the water.</BillClause>
            <BillClause label="c">The Secretary of Commerce shall provide grants covering up to 80 percent of reasonable equipment and training costs for qualifying small fishing businesses. Requirements may be phased in by region to allow safe testing and an orderly transition.</BillClause>
            <BillClause label="d">Commercial gear shall carry an identifying mark, and lost gear shall be reported within 48 hours when safe and practicable. NOAA shall coordinate a program to locate and remove abandoned fishing gear that threatens whales.</BillClause>
          </section>

          <section>
            <h3>Section 3: Reduction of Harmful Underwater Noise</h3>
            <BillClause label="a">NOAA shall establish science-based noise limits and operating standards for federally permitted seismic surveys, offshore construction, pile driving, and similar activities in important whale habitats.</BillClause>
            <BillClause label="b">Covered projects shall use trained observers or approved acoustic monitoring before and during operations. An activity shall slow or temporarily stop when a whale enters the safety area established by NOAA.</BillClause>
            <BillClause label="c">NOAA may restrict especially loud activities during migration, feeding, or breeding seasons and shall encourage quieter available technologies. An urgent public-safety or national-security exemption must be limited to the time and area reasonably necessary.</BillClause>
          </section>

          <section>
            <h3>Section 4: Detection, Reporting, and Rescue</h3>
            <BillClause label="a">NOAA shall expand a whale-detection network using acoustic buoys, aerial surveys, vessel observations, and other reliable technologies. Verified alerts shall be transmitted promptly to nearby vessels and enforcement agencies.</BillClause>
            <BillClause label="b">A vessel operator involved in a known or suspected whale collision shall report the incident to the Coast Guard or NOAA as soon as safely possible and no later than 24 hours after reaching a location with communications access.</BillClause>
            <BillClause label="c">The Secretary of Commerce shall fund trained whale-entanglement response teams and maintain a national database of collisions, entanglements, serious injuries, and whale deaths.</BillClause>
            <BillClause label="d">NOAA shall submit an annual public report to Congress describing violations, enforcement actions, grant spending, detected whale activity, rescue outcomes, and measurable changes in whale injuries and deaths.</BillClause>
          </section>

          <section>
            <h3>Section 5: Administration, Enforcement, and Funding</h3>
            <BillClause label="a">NOAA shall administer this Act, and the Coast Guard shall assist with vessel-safety enforcement. Agencies may use vessel-tracking records, inspection records, and verified observation data as evidence, while providing notice and an opportunity to contest an alleged violation.</BillClause>
            <BillClause label="b">A person who violates this Act may receive a civil penalty of up to $50,000 for each violation. Repeated or intentional violations may result in increased penalties or temporary suspension of an applicable federal permit or license.</BillClause>
            <BillClause label="c">There are authorized to be appropriated $100,000,000 for each of fiscal years 2027 through 2031 for fishing-gear transition grants, whale detection, rescue teams, scientific monitoring, public notices, and enforcement.</BillClause>
            <BillClause label="d">The vessel-speed requirements shall take effect one year after enactment, and the fishing-gear transition shall follow the schedule in Section 2. NOAA shall consult states, Tribal governments, fishing communities, conservation scientists, and maritime industries when issuing rules. Nothing in this Act diminishes treaty or lawful subsistence rights.</BillClause>
          </section>

          <section className="bill-conclusion">
            <h3>Conclusion</h3>
            <p>This Act addresses three preventable human-caused dangers to whales while giving affected industries time, financial assistance, and clear standards for compliance.</p>
            <p>Its monitoring and reporting requirements will allow Congress to judge whether the protections are working and adjust them when necessary.</p>
          </section>
        </div>
      </article>
    </section>
  )
}

function WorksCited() {
  return (
    <section className="works-cited-section story-chapter" id="works-cited" data-chapter="works-cited">
      <div className="works-cited-inner reveal">
        <span className="eyebrow light"><i /> BIBLIOGRAPHY</span>
        <h2>Works Cited</h2>
        <div className="citation-list">
          <p>Laist, David W., et al. “Effectiveness of Mandatory Vessel Speed Limits for Protecting North Atlantic Right Whales.” <cite>Endangered Species Research</cite>, vol. 23, no. 2, 2014, pp. 133–147. Accessed 28 Aug. 2026.</p>
          <p>National Oceanic and Atmospheric Administration. “<a href="https://www.fisheries.noaa.gov/new-england-mid-atlantic/marine-mammal-protection/developing-viable-demand-gear-systems" target="_blank" rel="noreferrer">Developing Viable On-Demand Gear Systems</a>.” <cite>NOAA Fisheries</cite>, 1 Apr. 2026. Accessed 28 Aug. 2026.</p>
          <p>National Oceanic and Atmospheric Administration. “<a href="https://www.fisheries.noaa.gov/national/marine-life-distress/large-whale-entanglement-response" target="_blank" rel="noreferrer">Large Whale Entanglement Response</a>.” <cite>NOAA Fisheries</cite>, 2 Feb. 2026. Accessed 28 Aug. 2026.</p>
          <p>National Oceanic and Atmospheric Administration. “<a href="https://www.fisheries.noaa.gov/national/science-data/ocean-noise" target="_blank" rel="noreferrer">Ocean Noise</a>.” <cite>NOAA Fisheries</cite>, 8 Apr. 2026. Accessed 28 Aug. 2026.</p>
          <p>National Oceanic and Atmospheric Administration. “<a href="https://www.fisheries.noaa.gov/national/endangered-species-conservation/reducing-vessel-strikes-north-atlantic-right-whales" target="_blank" rel="noreferrer">Reducing Vessel Strikes to North Atlantic Right Whales</a>.” <cite>NOAA Fisheries</cite>, 3 Aug. 2026. Accessed 28 Aug. 2026.</p>
          <p>United States, Congress. <cite>Marine Mammal Protection Act of 1972</cite>. <cite>United States Code</cite>, title 16, ch. 31. Legal Information Institute, Cornell Law School, <a href="https://www.law.cornell.edu/uscode/text/16/chapter-31" target="_blank" rel="noreferrer">www.law.cornell.edu/uscode/text/16/chapter-31</a>. Accessed 28 Aug. 2026.</p>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [activeId, setActiveId] = useState('top')
  const [supported, setSupported] = useState(() => {
    try { return localStorage.getItem('whale-act-support') === 'yes' } catch { return false }
  })
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    const chapters = document.querySelectorAll<HTMLElement>('.story-chapter')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId((visible.target as HTMLElement).dataset.chapter ?? 'top')
      },
      { rootMargin: '-25% 0px -55%', threshold: [0, 0.1, 0.35, 0.65] },
    )
    chapters.forEach((chapter) => observer.observe(chapter))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.16 },
    )
    reveals.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const addSupport = () => {
    if (supported) return
    setSupported(true)
    setCelebrate(true)
    try { localStorage.setItem('whale-act-support', 'yes') } catch { /* storage is optional */ }
    window.setTimeout(() => setCelebrate(false), 1500)
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <DepthNavigation activeId={activeId} />

      <main id="main">
        <section className="hero story-chapter" id="top" data-chapter="top">
          <div className="hero-cloud cloud-one" aria-hidden="true" /><div className="hero-cloud cloud-two" aria-hidden="true" />
          <div className="hero-content reveal is-visible">
            <div className="hero-copy">
              <div className="bill-badge"><span>H.R. 1929</span> Fictional classroom proposal</div>
              <p className="hero-kicker">Whale Habitat and Life Enforcement</p>
              <h1>WHALE<br /><em>ACT</em></h1>
              <p className="hero-tagline">Whale Habitat and Life<br />Enforcement Act of 2026</p>
              <p className="formal-title">A visual guide to the <strong>Whale Habitat and Life Enforcement (WHALE) Act of 2026</strong></p>
              <div className="hero-actions">
                <a className="primary-button" href="#zones">Dive into the bill <span>↓</span></a>
                <a className="text-link" href="#why">Why it matters</a>
              </div>
            </div>
            <div className="hero-visual"><HeroWhale /></div>
          </div>
          <div className="scroll-note" aria-hidden="true"><span>SCROLL TO DIVE</span><i /></div>
          <WaveDivider />
        </section>

        <section className="why-section story-chapter" id="why" data-chapter="top">
          <div className="current-lines" aria-hidden="true"><i /><i /><i /></div>
          <div className="why-inner reveal">
            <div className="why-heading">
              <span className="eyebrow light"><i /> THE PURPOSE</span>
              <h2>Whales share<br />a busy ocean.</h2>
            </div>
            <div className="why-copy">
              <p>Vessel strikes, fishing-gear entanglement, and human-made noise are preventable dangers. H.R. 1929 creates national standards that protect whales while helping fishing and maritime businesses adopt safer practices.</p>
              <div className="threat-pills">
                <span><b>01</b> Ship strikes</span><span><b>02</b> Entanglement</span><span><b>03</b> Ocean noise</span>
              </div>
              <p className="source-note">These threats are also documented by <a href="https://www.fisheries.noaa.gov/species/north-atlantic-right-whale" target="_blank" rel="noreferrer">NOAA Fisheries<span className="sr-only"> (opens in a new tab)</span></a>.</p>
            </div>
          </div>
          <WaveDivider flip />
        </section>

        <div className="deep-ocean">
          {policies.map((policy, index) => <PolicySection key={policy.id} policy={policy} index={index} />)}
        </div>

        <section className="support-section story-chapter" id="support" data-chapter="support">
          <div className="surface-glow" aria-hidden="true" />
          <div className="support-inner reveal">
            <span className="eyebrow dark"><i /> BACK TO THE SURFACE</span>
            <h2>Five protections.<br /><em>One healthier ocean.</em></h2>
            <div className="recap" aria-label="The Act's five protections">
              <span>Slow ships</span><span>Safer gear</span><span>Quieter water</span><span>Faster rescue</span><span>Real accountability</span>
            </div>
            <FinaleWhales />
            <div className={`support-card ${supported ? 'supported' : ''}`}>
              <div>
                <span className="card-overline">ADD YOUR VOICE</span>
                <h3>{supported ? 'You’re part of the pod!' : 'Stand up for safer seas.'}</h3>
                <p>{supported ? 'Your classroom support is saved on this device.' : 'This classroom action collects no names or personal information.'}</p>
              </div>
              <div className="button-wrap">
                <button className="support-button" type="button" onClick={addSupport} disabled={supported}>
                  {supported ? <><span aria-hidden="true">✓</span> Support added</> : 'I support the WHALE Act'}
                </button>
                <BubbleBurst active={celebrate} />
              </div>
            </div>
          </div>
        </section>

        <FullBill />
        <WorksCited />
      </main>

      <footer>
        <div className="footer-brand"><LogoMark /><span><strong>WHALE ACT</strong><small>Whale Habitat and Life Enforcement</small></span></div>
        <p>A classroom campaign for H.R. 1929, the fictional Whale Habitat and Life Enforcement (WHALE) Act of 2026.</p>
        <div className="footer-links">
          <a href="https://www.fisheries.noaa.gov/national/endangered-species-conservation/vessel-strikes" target="_blank" rel="noreferrer">NOAA vessel-strike facts</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
