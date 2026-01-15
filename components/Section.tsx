
import React from 'react';

// Props definition for the reusable Section component
interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  light?: boolean;
}

/**
 * Reusable layout component that provides consistent padding and styling for page sections.
 */
const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, light }) => {
  return (
    <section id={id} className={`py-24 px-6 ${light ? 'bg-white' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-slate-600 max-w-2xl">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
