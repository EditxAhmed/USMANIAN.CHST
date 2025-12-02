import React, { useId } from 'react';

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
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"></path>
  </svg>
);

export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export const SchoolLogo: React.FC<{ className?: string }> = ({ className }) => {
  const uniqueId = useId();
  const pathId = `textArc-${uniqueId.replace(/:/g, '')}`;

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 580" 
      className={className}
      fill="none"
    >
      <defs>
        {/* Arc path for text - curved over the top */}
        <path id={pathId} d="M 75,300 A 175,175 0 0 1 425,300" />
      </defs>

      {/* --- RING ARC --- */}
      <path d="M 75,300 A 175,175 0 1 1 425,300" stroke="#0072CE" strokeWidth="55" fill="none" strokeLinecap="round" />

      {/* Text on Arc */}
      <text fill="white" fontSize="26" fontWeight="bold" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="0.5">
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">
          USMAN PUBLIC SCHOOL SYSTEM
        </textPath>
      </text>

      {/* --- CENTER ELEMENT --- */}
      <g transform="translate(250, 250)">
        
        {/* Torch/Pen Nib */}
        <g transform="translate(0, -60)">
           <path d="M -18,0 L 18,0 L 12,45 L 0,60 L -12,45 Z" fill="#9CA3AF" />
           <path d="M 0,60 L 0,0" stroke="white" strokeWidth="1.5" />
           {/* Flame */}
           <path d="M 0,-5 Q 15,-30 0,-65 Q -15,-30 0,-5" fill="#F59E0B" />
           <path d="M 0,-15 Q 6,-30 0,-45 Q -6,-30 0,-15" fill="#FDE047" />
        </g>

        {/* Book */}
        <g transform="translate(0, 20)">
           <path d="M 0,0 Q 40,-15 80,10 V 60 Q 40,35 0,50 Q -40,35 -80,60 V 10 Q -40,-15 0,0" fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" />
           <path d="M 0,0 V 50" stroke="#6B7280" strokeWidth="2" />
           {/* Script Lines */}
           <path d="M 10,15 Q 40,5 70,20 M 15,25 Q 40,15 65,30 M 10,35 Q 40,25 70,40" stroke="#9CA3AF" strokeWidth="2" fill="none" opacity="0.7"/>
           <path d="M -10,15 Q -40,5 -70,20 M -15,25 Q -40,15 -65,30 M -10,35 Q -40,25 -70,40" stroke="#9CA3AF" strokeWidth="2" fill="none" opacity="0.7"/>
           {/* Arabic char simulation */}
           <path d="M 20,20 L 22,18 M 50,30 L 52,28" stroke="#6B7280" strokeWidth="2" />
        </g>
      </g>

      {/* --- RIBBON WINGS --- */}
      <path d="M 30,320 Q 100,280 250,340 Q 400,280 470,320 Q 450,400 250,370 Q 50,400 30,320 Z" fill="#DC2626" />

      {/* --- BOTTOM TYPOGRAPHY --- */}
      <text x="250" y="460" textAnchor="middle" fill="#0072CE" fontSize="75" fontWeight="900" fontFamily="Arial Black, sans-serif">UPSS</text>
      
      {/* Red Underline */}
      <path d="M 120,480 Q 250,485 380,480" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" fill="none"/>

      {/* Tagline */}
      <text x="250" y="525" textAnchor="middle" fill="#0072CE" fontSize="30" fontFamily="'Brush Script MT', cursive" fontStyle="italic">
        Shaping the leaders of Ummah
      </text>

    </svg>
  );
};

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