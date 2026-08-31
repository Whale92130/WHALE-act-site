import { useEffect, useRef, useState } from 'react'

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
      src={`${import.meta.env.BASE_URL}whale-mark.png`}
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
    <svg
      width="390"
      height="250"
      viewBox="100 195 550 360"
      transform={transform}
      className={`mascot-whale ${className}`}
      preserveAspectRatio="xMidYMid meet"
      overflow="visible"
    >
      <image
        href={`${import.meta.env.BASE_URL}whale-mascot.png`}
        width="750"
        height="810"
      />
    </svg>
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
        <MascotWhale transform="translate(70 170) scale(1.5)" className="whale-shade-surface" />
      </g>
      <g fill="none" stroke="#b8f2e6" strokeWidth="5">
        <circle cx="576" cy="452" r="12" /><circle cx="608" cy="413" r="7" /><circle cx="58" cy="411" r="8" />
      </g>
    </svg>
  )
}

function ZonesArt() {
  return (
    <svg viewBox="-28 -24 616 486" role="img" aria-label="A cartoon cargo ship travels at ten knots above a whale inside a protected-zone bubble">
      <g className="speedometer" transform="translate(-2 -160)">
        <circle cx="88" cy="270" r="55" fill="#fff5d9" className="ink" />
        <circle cx="88" cy="270" r="43" fill="#9ee7e6" stroke="#073b4c" strokeWidth="4" />
        <path d="M51 265a38 38 0 0 1 74 0" fill="none" stroke="#ff8e78" strokeWidth="8" strokeLinecap="round" />
        <path d="M59.4 253.5 50.8 248.5M71.5 241.4 66.5 232.8M88 237 88 227M104.5 241.4 109.5 232.8M116.6 253.5 125.2 248.5" className="ink-line speed-ticks" />
        <path d="M88 270 105.2 245.4" className="ink-line speed-needle" />
        <circle cx="88" cy="270" r="8" fill="#073b4c" />
        <rect x="52" y="284" width="72" height="25" rx="12.5" fill="#fff7e4" stroke="#073b4c" strokeWidth="3" />
        <text x="88" y="301" textAnchor="middle" className="svg-label speed-label">10 KNOTS</text>
      </g>

      <g transform="translate(12 -8)">
        <g className="cargo-ship boat-bob">
          <path d="M211 126h317l-37 58H253Z" fill="#fff5d9" className="ink" />
          <path d="M243 160h266l-18 24H253Z" fill="#ff8e78" className="ink thin" />
          <rect x="244" y="78" width="66" height="48" rx="4" fill="#ff8e78" className="ink thin" />
          <rect x="310" y="78" width="66" height="48" rx="4" fill="#ffcf67" className="ink thin" />
          <rect x="376" y="78" width="66" height="48" rx="4" fill="#7bdde0" className="ink thin" />
          <rect x="278" y="35" width="66" height="43" rx="4" fill="#7bdde0" className="ink thin" />
          <rect x="344" y="35" width="66" height="43" rx="4" fill="#ff8e78" className="ink thin" />
          <path d="M445 62h57v64h-57Z" fill="#fff5d9" className="ink" />
          <path d="M457 77h32v19h-32Z" fill="#9ee7e6" className="ink thin" />
          <path d="M473 61V36h22" className="ink-line thin-line" />
          <path d="M497 36c13 0 20 6 27 13" fill="none" stroke="#b8f2e6" strokeWidth="7" strokeLinecap="round" opacity=".65" />
        </g>
      </g>

      <path d="M22 187c43-22 86 22 129 0s86 22 129 0 86 22 129 0 86 22 129 0" className="water-line" />

      <g className="zone-bubble" transform="translate(8 30)">
        <ellipse cx="330" cy="309" rx="191" ry="106" fill="#7bdde0" fillOpacity=".13" stroke="#b8f2e6" strokeWidth="6" />
        <path d="M167 278c18-37 45-59 82-70M435 376c29-18 48-42 58-72" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity=".5" />
        <circle cx="177" cy="330" r="9" fill="#ffffff" opacity=".55" />
        <circle cx="474" cy="272" r="6" fill="#ffffff" opacity=".55" />
        <rect x="233" y="187" width="194" height="43" rx="21.5" fill="#fff7e4" className="ink thin" />
        <text x="330" y="214" textAnchor="middle" className="svg-label zone-label">PROTECTED ZONE</text>
      </g>

      <g className="mini-whale swim">
        <MascotWhale transform="translate(200 260) scale(.72)" className="whale-shade-zones" />
      </g>
    </svg>
  )
}

function GearArt() {
  return (
    <svg viewBox="0 0 560 430" role="img" aria-label="Large cartoon scissors cut a fishing net away from a whale">
      <path d="M0 342c76-44 146 25 220-9 79-37 154 28 230-7 46-21 81-20 110-3v107H0Z" fill="#07546e" />
      <g className="gear-whale">
        <MascotWhale transform="translate(300 72) scale(-.72 .72)" className="whale-shade-gear" />
      </g>

      <g className="rope-top">
        <path d="M322 24c-11 64 5 137-2 206" fill="none" stroke="#ffcf67" strokeWidth="11" strokeLinecap="round" />
      </g>
      <g className="rope-bottom">
        <path d="M320 230c-7 68 13 117 5 177" fill="none" stroke="#ffcf67" strokeWidth="11" strokeLinecap="round" />
      </g>

      <g className="scissors">
        <g className="scissor-half scissor-top">
          <path d="M410 230 313 189 394 241Z" fill="#e8f6f2" className="ink thin" />
          <path d="M410 230 461 286" fill="none" stroke="#073b4c" strokeWidth="16" strokeLinecap="round" />
          <circle cx="478" cy="304" r="29" fill="#ff8e78" className="ink" />
          <circle cx="478" cy="304" r="12" fill="#063b58" />
        </g>
        <g className="scissor-half scissor-bottom">
          <path d="M410 230 313 271 394 219Z" fill="#e8f6f2" className="ink thin" />
          <path d="M410 230 461 174" fill="none" stroke="#073b4c" strokeWidth="16" strokeLinecap="round" />
          <circle cx="478" cy="156" r="29" fill="#7bdde0" className="ink" />
          <circle cx="478" cy="156" r="12" fill="#063b58" />
        </g>
        <circle cx="410" cy="230" r="13" fill="#ffcf67" className="ink thin" />
      </g>

      <g className="cut-spark" fill="none" stroke="#fff7e4" strokeWidth="6" strokeLinecap="round">
        <path d="M302 209 291 196M295 230h-19M302 251l-12 13" />
      </g>

      <rect x="38" y="346" width="189" height="50" rx="25" fill="#fff7e4" className="ink" />
      <g className="kelp" fill="#45bb84" stroke="#073b4c" strokeWidth="5">
        <path d="M31 393c20-29-5-47 14-69 21 29 1 45 18 69"/><path d="M495 392c18-27-3-45 15-67 19 25 3 43 20 67"/>
      </g>
    </svg>
  )
}

function NoiseArt() {
  return (
    <svg viewBox="0 0 560 430" role="img" aria-label="A muted underwater drill works in the seabed while a whale swims nearby">
      <path d="M0 344c61-36 119 18 181-4 67-24 130 20 195-4 70-27 127-20 184 2v92H0Z" fill="#d8b879" stroke="#073b4c" strokeWidth="7" strokeLinejoin="round" />
      <path d="M3 347c58-31 116 19 178-3 67-24 130 20 195-4 69-26 126-20 181 1" fill="none" stroke="#f5d99d" strokeWidth="7" strokeLinecap="round" opacity=".8" />
      <g className="seabed-rocks" stroke="#073b4c" strokeWidth="5" strokeLinejoin="round">
        <polygon points="25,409 34,385 55,368 82,375 101,409" fill="#8f9a8a" />
        <polygon points="215,408 224,387 246,374 268,384 283,408" fill="#ae8f70" />
        <polygon points="421,410 432,382 459,366 486,378 508,410" fill="#83998f" />
      </g>
      <g className="sand-speckles" fill="#9f7f55" opacity=".65">
        <circle cx="126" cy="389" r="5" /><circle cx="173" cy="412" r="4" /><circle cx="315" cy="380" r="5" /><circle cx="358" cy="408" r="4" /><circle cx="527" cy="386" r="5" />
      </g>
      <g className="drill-hole" fill="none" stroke="#073b4c" strokeWidth="7" strokeLinecap="round">
        <path d="M105 352q13-12 27-13M147 339q15 2 28 13" />
      </g>

      <g transform="translate(16 18) scale(.9)">
        <g className="underwater-drill">
          <path d="M90 89V65c0-22 17-39 39-39h28c22 0 39 17 39 39v24" fill="none" stroke="#073b4c" strokeWidth="15" strokeLinecap="round" />
          <rect x="49" y="82" width="181" height="111" rx="27" fill="#ffcf67" className="ink" />
          <rect x="71" y="104" width="74" height="43" rx="12" fill="#9ee7e6" className="ink thin" />
          <circle cx="186" cy="136" r="22" fill="#ff8e78" className="ink thin" />
          <path d="M82 174h114" className="ink-line thin-line" opacity=".35" />
          <rect x="112" y="193" width="55" height="35" rx="8" fill="#fff5d9" className="ink" />

          <g className="drill-bit">
            <path d="M139 227v145" fill="none" stroke="#e8f6f2" strokeWidth="18" strokeLinecap="round" />
            <path d="m112 248 54 22-54 23 54 23-54 23 54 23" fill="none" stroke="#ff8e78" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m119 371 20 34 20-34Z" fill="#e8f6f2" className="ink thin" />
          </g>
        </g>
      </g>

      <g className="mute-badge">
        <circle cx="253" cy="112" r="52" fill="#fff7e4" />
        <path d="M221 105h16l22-19v52l-22-19h-16Z" fill="#073b4c" stroke="#073b4c" strokeWidth="5" strokeLinejoin="round" />
        <path d="m218 77 70 70" fill="none" stroke="#ff8e78" strokeWidth="11" strokeLinecap="round" />
        <circle cx="253" cy="112" r="52" fill="none" className="ink" />
      </g>

      <g className="noise-whale swim">
        <MascotWhale transform="translate(261 126) scale(.75)" className="whale-shade-noise" />
      </g>

      <g className="drill-debris" fill="#ffcf67">
        <circle className="debris-one" cx="104" cy="361" r="8" />
        <circle className="debris-two" cx="173" cy="370" r="6" />
        <circle className="debris-three" cx="193" cy="349" r="5" />
      </g>
    </svg>
  )
}

function RadarWhales() {
  const whaleRefs = useRef<(SVGGElement | null)[]>([])
  const sweepRef = useRef<SVGPathElement | null>(null)

  useEffect(() => {
    const center = { x: 280, y: 215 }
    const speed = 24
    const whales = [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6].map((angle, index) => {
      const x = center.x + Math.cos(angle) * 112
      const y = center.y + Math.sin(angle) * 112
      const heading = angle + Math.PI / 2
      return {
        x,
        y,
        heading,
        displayedX: x,
        displayedY: y,
        displayedHeading: heading,
        lastSeen: 0,
        orbitDirection: 1,
        targetRadius: 100 + index * 7,
        turnRemaining: 0,
        nextTurn: 10 + index * 3.3,
      }
    })
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scanDuration = 4.5
    const fullTurn = Math.PI * 2
    const beamWidth = 72 * Math.PI / 180

    const draw = (elapsed = 0) => {
      const scanAngle = (elapsed / scanDuration * fullTurn) % fullTurn
      const beamEndAngle = scanAngle + beamWidth
      const beamStartX = center.x + Math.sin(scanAngle) * 204
      const beamStartY = center.y - Math.cos(scanAngle) * 204
      const beamEndX = center.x + Math.sin(beamEndAngle) * 204
      const beamEndY = center.y - Math.cos(beamEndAngle) * 204
      sweepRef.current?.setAttribute(
        'd',
        `M${center.x} ${center.y}L${beamStartX.toFixed(2)} ${beamStartY.toFixed(2)}A204 204 0 0 1 ${beamEndX.toFixed(2)} ${beamEndY.toFixed(2)}Z`,
      )

      whales.forEach((whale, index) => {
        const bearing = (Math.atan2(whale.x - center.x, center.y - whale.y) + fullTurn) % fullTurn
        const angleFromBeamStart = (bearing - scanAngle + fullTurn) % fullTurn
        const isLive = angleFromBeamStart <= beamWidth

        if (isLive) {
          whale.displayedX = whale.x
          whale.displayedY = whale.y
          whale.displayedHeading = whale.heading
          whale.lastSeen = elapsed
        }

        const element = whaleRefs.current[index]
        if (!element) return
        const secondsSinceSeen = Math.max(0, elapsed - whale.lastSeen)
        const opacity = isLive ? 1 : Math.max(.2, 1 - secondsSinceSeen / 5.2 * .8)
        element.setAttribute('transform', `translate(${whale.displayedX.toFixed(2)} ${whale.displayedY.toFixed(2)}) rotate(${(whale.displayedHeading * 180 / Math.PI).toFixed(2)})`)
        element.style.opacity = opacity.toFixed(3)
      })
    }

    draw()
    if (reduceMotion) return

    const normalizeAngle = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle))
    let startedAt = performance.now()
    let previousTime = startedAt
    let frame = 0

    const animate = (time: number) => {
      const elapsed = (time - startedAt) / 1000
      const dt = Math.min((time - previousTime) / 1000, .04)
      previousTime = time

      whales.forEach((whale) => {
        if (elapsed >= whale.nextTurn) {
          whale.turnRemaining = (Math.random() < .5 ? -1 : 1) * Math.PI
          whale.targetRadius = 95 + Math.random() * 25
          whale.nextTurn += 10
        }

        if (Math.abs(whale.turnRemaining) > .001) {
          const turnStep = Math.sign(whale.turnRemaining) * Math.min(Math.abs(whale.turnRemaining), 1.15 * dt)
          whale.heading += turnStep
          whale.turnRemaining -= turnStep
          if (Math.abs(whale.turnRemaining) <= .001) whale.orbitDirection *= -1
        } else {
          const dx = whale.x - center.x
          const dy = whale.y - center.y
          const radius = Math.max(Math.hypot(dx, dy), 1)
          const radialX = dx / radius
          const radialY = dy / radius
          let steerX = whale.orbitDirection * -radialY
          let steerY = whale.orbitDirection * radialX
          const radiusCorrection = Math.max(-.8, Math.min(.8, (radius - whale.targetRadius) / 38))
          steerX -= radialX * radiusCorrection
          steerY -= radialY * radiusCorrection

          whales.forEach((neighbor) => {
            if (neighbor === whale) return
            const awayX = whale.x - neighbor.x
            const awayY = whale.y - neighbor.y
            const distance = Math.max(Math.hypot(awayX, awayY), 1)
            if (distance < 115) {
              const avoidance = (115 - distance) / 28
              steerX += (awayX / distance) * avoidance
              steerY += (awayY / distance) * avoidance
            }
          })

          if (radius > 148) {
            const wallAvoidance = (radius - 148) / 8
            steerX -= radialX * wallAvoidance
            steerY -= radialY * wallAvoidance
          }

          const desiredHeading = Math.atan2(steerY, steerX)
          const headingChange = Math.max(-.58 * dt, Math.min(.58 * dt, normalizeAngle(desiredHeading - whale.heading)))
          whale.heading += headingChange
        }

        const currentWallX = whale.x - center.x
        const currentWallY = whale.y - center.y
        const currentWallDistance = Math.max(Math.hypot(currentWallX, currentWallY), 1)
        if (currentWallDistance > 142) {
          const inwardHeading = Math.atan2(-currentWallY, -currentWallX)
          whale.heading += Math.max(-1.1 * dt, Math.min(1.1 * dt, normalizeAngle(inwardHeading - whale.heading)))
        }

        let closestNeighborIndex = -1
        let closestDistance = Infinity
        whales.forEach((neighbor, neighborIndex) => {
          if (neighbor === whale) return
          const distance = Math.hypot(whale.x - neighbor.x, whale.y - neighbor.y)
          if (distance < closestDistance) {
            closestDistance = distance
            closestNeighborIndex = neighborIndex
          }
        })
        if (closestNeighborIndex >= 0 && closestDistance < 105) {
          const closestNeighbor = whales[closestNeighborIndex]
          const awayHeading = Math.atan2(whale.y - closestNeighbor.y, whale.x - closestNeighbor.x)
          whale.heading += Math.max(-1.25 * dt, Math.min(1.25 * dt, normalizeAngle(awayHeading - whale.heading)))
        }

        whale.x += Math.cos(whale.heading) * speed * dt
        whale.y += Math.sin(whale.heading) * speed * dt

        const wallX = whale.x - center.x
        const wallY = whale.y - center.y
        const wallDistance = Math.hypot(wallX, wallY)
        if (wallDistance > 162) {
          whale.x = center.x + (wallX / wallDistance) * 162
          whale.y = center.y + (wallY / wallDistance) * 162
          whale.heading = Math.atan2(center.y - whale.y, center.x - whale.x) + (Math.random() - .5) * .35
          whale.turnRemaining = 0
        }
      })

      draw(elapsed)
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const whaleSizes = [70, 80, 64]
  return (
    <>
      <path ref={sweepRef} d="M280 215 280 11A204 204 0 0 1 473 145Z" fill="#b8f2e6" opacity=".15" className="radar-sweep" />
      {whaleSizes.map((size, index) => (
        <g className="radar-moving-whale" key={size} ref={(element) => { whaleRefs.current[index] = element }}>
          <image href={`${import.meta.env.BASE_URL}radar-whale.png`} x={-size / 2} y={-size / 2} width={size} height={size} transform="rotate(90)" />
        </g>
      ))}
    </>
  )
}

function RescueArt() {
  return (
    <svg viewBox="0 0 560 430" role="img" aria-label="A marine radar map locates three whales for monitoring and rescue teams">
      <defs>
        <clipPath id="whale-radar-screen">
          <circle cx="280" cy="215" r="204" />
        </clipPath>
      </defs>

      <g clipPath="url(#whale-radar-screen)">
        <circle cx="280" cy="215" r="204" fill="#27aeba" opacity=".26" />
        <g className="radar-map-grid" fill="none" stroke="#b8f2e6" strokeWidth="2" opacity=".25">
          <circle cx="280" cy="215" r="68" />
          <circle cx="280" cy="215" r="136" />
          <circle cx="280" cy="215" r="202" />
          <path d="M76 215h408M280 11v408M96 123c117 42 251 42 368 0M96 307c117-42 251-42 368 0" />
        </g>

        <RadarWhales />

        <circle cx="280" cy="215" r="8" fill="#ff8e78" stroke="#fff5d9" strokeWidth="4" />
      </g>

      <circle cx="280" cy="215" r="204" fill="none" stroke="#b8f2e6" strokeWidth="5" opacity=".34" />
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
        <MascotWhale transform="translate(38 55) scale(1)" className="whale-shade-pod-one" />
      </g>
      <g className="pod pod-two">
        <MascotWhale transform="translate(490 20) scale(.66)" className="whale-shade-pod-two" />
      </g>
      <g className="pod pod-three">
        <MascotWhale transform="translate(400 172) scale(.45)" className="whale-shade-pod-three" />
      </g>
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
    const chapters = Array.from(document.querySelectorAll<HTMLElement>('.story-chapter'))
    let frame = 0

    const updateActiveChapter = () => {
      frame = 0
      const marker = window.innerHeight * 0.38
      let activeChapter = chapters[0]

      for (const chapter of chapters) {
        const bounds = chapter.getBoundingClientRect()
        if (bounds.top <= marker) activeChapter = chapter
        if (bounds.top <= marker && bounds.bottom > marker) {
          activeChapter = chapter
          break
        }
      }

      const nextId = activeChapter?.dataset.chapter ?? 'top'
      setActiveId((currentId) => currentId === nextId ? currentId : nextId)
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveChapter)
    }

    updateActiveChapter()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
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
      { threshold: 0.01 },
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
              <h1>WHALE<br /><em aria-label="ACT"><span className="act-a" aria-hidden="true">A</span><span aria-hidden="true">C</span><span aria-hidden="true">T</span></em></h1>
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
