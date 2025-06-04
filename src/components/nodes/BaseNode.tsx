
import React, { ReactNode } from 'react';
import { Handle, Position } from '@xyflow/react';

interface HandleConfig {
  id: string;
  type: 'source' | 'target';
  position: Position;
  style?: React.CSSProperties;
  label?: string;
}

interface BaseNodeProps {
  id: string;
  title: string;
  children: ReactNode;
  handles?: HandleConfig[];
  className?: string;
  icon?: ReactNode;
  color?: string;
}

export const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  title,
  children,
  handles = [],
  className = '',
  icon,
  color = 'blue',
}) => {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600 border-blue-400',
    green: 'from-green-500 to-green-600 border-green-400',
    purple: 'from-purple-500 to-purple-600 border-purple-400',
    orange: 'from-orange-500 to-orange-600 border-orange-400',
    red: 'from-red-500 to-red-600 border-red-400',
    yellow: 'from-yellow-500 to-yellow-600 border-yellow-400',
    indigo: 'from-indigo-500 to-indigo-600 border-indigo-400',
    pink: 'from-pink-500 to-pink-600 border-pink-400',
    cyan: 'from-cyan-500 to-cyan-600 border-cyan-400',
  };

  return (
    <div
      className={`
        relative min-w-[220px] min-h-[120px] 
        bg-slate-800/95 backdrop-blur-sm border-2 ${colorMap[color as keyof typeof colorMap]} 
        rounded-lg shadow-2xl
        transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]
        ${className}
      `}
      style={{ background: 'rgba(30, 41, 59, 0.95)' }}
    >
      {/* Header */}
      <div className={`
        flex items-center gap-2 px-3 py-2 
        bg-gradient-to-r ${colorMap[color as keyof typeof colorMap]}
        rounded-t-md border-b border-slate-600
      `}>
        {icon && <div className="text-white">{icon}</div>}
        <h3 className="text-white font-semibold text-sm">{title}</h3>
      </div>

      {/* Content */}
      <div className="p-3 text-slate-200">
        {children}
      </div>

      {/* Handles */}
      {handles.map((handle) => (
        <React.Fragment key={handle.id}>
          <Handle
            id={handle.id}
            type={handle.type}
            position={handle.position}
            style={{
              background: '#3b82f6',
              border: '2px solid #1e40af',
              width: '12px',
              height: '12px',
              ...handle.style,
            }}
            className="transition-colors hover:bg-blue-400"
          />
          {handle.label && (
            <div
              className={`
                absolute text-xs text-slate-400 pointer-events-none
                ${handle.position === Position.Left ? '-left-16' : ''}
                ${handle.position === Position.Right ? '-right-16' : ''}
                ${handle.position === Position.Top ? 'top-0 -translate-y-6' : ''}
                ${handle.position === Position.Bottom ? 'bottom-0 translate-y-6' : ''}
              `}
              style={handle.style}
            >
              {handle.label}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
