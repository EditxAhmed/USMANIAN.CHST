import React from 'react';
import { NewsIcon, MapPinIcon } from './Icons';

const NEWS_ITEMS = [
  {
    id: 1,
    title: "AI Curriculum Launch",
    date: "12h ago",
    summary: "Usman Public School System integrates Generative AI tools into the Computer Science syllabus for grades 9-12.",
    tag: "Academic",
    color: "text-red-500",
    bg: "bg-red-50"
  },
  {
    id: 2,
    title: "Gemini 2.5 Flash Live",
    date: "1d ago",
    summary: "Experience the speed of the new Gemini 2.5 Flash model powering your student assistant.",
    tag: "System",
    color: "text-slate-600",
    bg: "bg-slate-100"
  },
  {
    id: 3,
    title: "Inter-Campus Debate",
    date: "2d ago",
    summary: "Registration opens for the annual All-Karachi Inter-School Debate Championship.",
    tag: "Event",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
];

const LOCATIONS = [
    { name: "Campus 1 (Boys)", area: "North Nazimabad, Block A" },
    { name: "Campus 2 (Girls)", area: "North Nazimabad, Block A" },
    { name: "Campus 6 (Boys)", area: "F.B. Area, Block 14" },
    { name: "Campus 7 (Girls)", area: "F.B. Area, Block 10" },
    { name: "Campus 8 (Boys)", area: "Gulshan-e-Iqbal, Block 13-D" },
    { name: "Campus 14 (Boys)", area: "North Nazimabad, Block W" },
];

export const NewsSidebar: React.FC = () => {
  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex-col hidden xl:flex h-full shadow-sm z-20">
      
      {/* News Header */}
      <div className="p-5 border-b border-slate-100 flex items-center gap-3 flex-none bg-slate-50/50">
        <div className="p-2 bg-red-50 rounded-lg">
            <NewsIcon className="w-5 h-5 text-red-600" />
        </div>
        <h2 className="font-semibold text-slate-800">Campus Updates</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        {NEWS_ITEMS.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${item.color} ${item.bg} px-2 py-0.5 rounded-full`}>
                    {item.tag}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors mb-1.5 leading-snug">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
              {item.summary}
            </p>
            <div className="h-px bg-slate-100 mt-4 group-last:hidden"></div>
          </div>
        ))}

        {/* Locations Section */}
        <div className="mt-8 pt-6 border-t border-slate-100">
             <div className="flex items-center gap-2 mb-4">
                <MapPinIcon className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Major Campuses</h3>
             </div>
             
             <div className="space-y-3">
                {LOCATIONS.map((loc, idx) => (
                    <div key={idx} className="flex flex-col group">
                        <span className="text-sm text-slate-800 font-medium group-hover:text-red-600 transition-colors">{loc.name}</span>
                        <span className="text-xs text-slate-500">{loc.area}</span>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </aside>
  );
};