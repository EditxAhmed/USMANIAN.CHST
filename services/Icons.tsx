import React from 'react';

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
  </svg>
);

export const SchoolLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 500 550" 
    className={className}
    fill="none"
  >
    <defs>
      {/* Path for upper text arch */}
      <path id="topArch" d="M 105,280 A 145,145 0 1 0 395,280" />
    </defs>

    {/* Stars */}
    <g fill="#026ab5">
      {/* Center Star */}
      <polygon points="250,20 262,55 300,55 270,78 280,115 250,95 220,115 230,78 200,55 238,55" />
      {/* Left Star */}
      <polygon transform="translate(-110, 50) scale(0.7)" points="250,20 262,55 300,55 270,78 280,115 250,95 220,115 230,78 200,55 238,55" />
      {/* Right Star */}
      <polygon transform="translate(110, 50) scale(0.7)" points="250,20 262,55 300,55 270,78 280,115 250,95 220,115 230,78 200,55 238,55" />
    </g>

    {/* Blue Ring */}
    <circle cx="250" cy="280" r="140" stroke="#026ab5" strokeWidth="50" fill="white" />
    
    {/* Inner White Circle (Background) */}
    <circle cx="250" cy="280" r="115" fill="white" />

    {/* Text on Ring */}
    <text fill="white" fontSize="22" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">
      <textPath href="#topArch" startOffset="50%" textAnchor="middle" alignmentBaseline="middle">
        USMAN PUBLIC SCHOOL SYSTEM
      </textPath>
    </text>

    {/* Center Element: Torch/Pen/Book */}
    <g transform="translate(250, 280)">
       {/* Book */}
       <path d="M-60 20 Q-30 40 0 20 Q30 40 60 20 V60 Q30 80 0 60 Q-30 80 -60 60 Z" fill="#9ca3af" stroke="#4b5563" strokeWidth="2" />
       
       {/* Pen Nib Base */}
       <path d="M-20 -20 L20 -20 L15 25 L0 40 L-15 25 Z" fill="#6b7280" />
       <path d="M0 40 L0 0" stroke="white" strokeWidth="2" />
       
       {/* Flame */}
       <path d="M0 -25 Q15 -50 0 -85 Q-15 -50 0 -25" fill="#eab308" />
       <circle cx="0" cy="-35" r="6" fill="#fde047" />
    </g>
    
    {/* Red Ribbon/Banner at bottom */}
    <path d="M 50 350 Q 150 420 250 380 Q 350 420 450 350 L 420 330 Q 350 380 250 350 Q 150 380 80 330 Z" fill="#dc2626" />
    
    {/* UPSS Text */}
    <text x="250" y="450" textAnchor="middle" fill="#026ab5" fontSize="48" fontWeight="900" fontFamily="Arial, sans-serif">UPSS</text>
    
    {/* Tagline */}
    <text x="250" y="490" textAnchor="middle" fill="#026ab5" fontSize="20" fontStyle="italic" fontFamily="serif">Shaping the leaders of Ummah</text>
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export const BotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 8V4H8"></path>
    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
    <path d="M2 14h2"></path>
    <path d="M20 14h2"></path>
    <path d="M15 13v2"></path>
    <path d="M9 13v2"></path>
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
  </svg>
);

export const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

export const StopIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

export const NewsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
    <path d="M18 14h-8"></path>
    <path d="M15 18h-5"></path>
    <path d="M10 6h8v4h-8V6Z"></path>
  </svg>
);

export const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);