<template>
  <!-- Original illustration: a cloud hub connecting documents, assets, knowledge and facilities -->
  <svg viewBox="0 0 480 400" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="hg-card" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff" />
        <stop offset="1" stop-color="#eefbf8" />
      </linearGradient>
      <linearGradient id="hg-core" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#23a08b" />
        <stop offset="1" stop-color="#14534a" />
      </linearGradient>
    </defs>

    <g stroke="#aee8da" stroke-width="2" stroke-dasharray="6 6" fill="none">
      <path d="M240 200 L110 90" /><path d="M240 200 L370 90" />
      <path d="M240 200 L110 310" /><path d="M240 200 L370 310" />
    </g>

    <circle cx="240" cy="200" r="78" fill="url(#hg-core)" />
    <path d="M205 214a24 24 0 0 1 4-47 32 32 0 0 1 61 6 20 20 0 0 1 3 40z" fill="#ffffff" />
    <circle cx="282" cy="160" r="9" fill="#f5a524" />

    <g>
      <rect x="40" y="40" width="140" height="96" rx="18" fill="url(#hg-card)" stroke="#d5f4ec" />
      <rect x="62" y="62" width="34" height="42" rx="5" fill="#45bba5" />
      <rect x="106" y="66" width="56" height="7" rx="3.5" fill="#14675b" />
      <rect x="106" y="80" width="40" height="7" rx="3.5" fill="#aee8da" />
      <rect x="106" y="94" width="48" height="7" rx="3.5" fill="#aee8da" />
    </g>
    <g>
      <rect x="300" y="40" width="140" height="96" rx="18" fill="url(#hg-card)" stroke="#d5f4ec" />
      <g fill="#14675b">
        <rect x="324" y="64" width="4" height="44" /><rect x="332" y="64" width="2" height="44" />
        <rect x="338" y="64" width="6" height="44" /><rect x="348" y="64" width="2" height="44" />
        <rect x="354" y="64" width="4" height="44" /><rect x="362" y="64" width="2" height="44" />
        <rect x="368" y="64" width="6" height="44" /><rect x="378" y="64" width="3" height="44" />
      </g>
      <circle cx="408" cy="86" r="14" fill="#f5a524" opacity=".85" />
    </g>
    <g>
      <rect x="40" y="264" width="140" height="96" rx="18" fill="url(#hg-card)" stroke="#d5f4ec" />
      <circle cx="80" cy="312" r="18" fill="none" stroke="#23a08b" stroke-width="5" />
      <circle cx="80" cy="312" r="6" fill="#23a08b" />
      <rect x="110" y="298" width="50" height="7" rx="3.5" fill="#14675b" />
      <rect x="110" y="312" width="38" height="7" rx="3.5" fill="#aee8da" />
    </g>
    <g>
      <rect x="300" y="264" width="140" height="96" rx="18" fill="url(#hg-card)" stroke="#d5f4ec" />
      <rect x="324" y="288" width="40" height="52" rx="4" fill="#45bba5" />
      <g fill="#ffffff">
        <rect x="332" y="296" width="8" height="8" /><rect x="348" y="296" width="8" height="8" />
        <rect x="332" y="312" width="8" height="8" /><rect x="348" y="312" width="8" height="8" />
      </g>
      <rect x="376" y="300" width="44" height="7" rx="3.5" fill="#14675b" />
      <rect x="376" y="314" width="30" height="7" rx="3.5" fill="#aee8da" />
    </g>
  </svg>
</template>
