
import React from 'react';
import { Download, Upload, Type, FileText, Calculator, Calendar, Globe, Filter, Merge } from 'lucide-react';

const nodeTypes = [
  { type: 'input', label: 'Input', icon: Download, color: 'green' },
  { type: 'output', label: 'Output', icon: Upload, color: 'red' },
  { type: 'text', label: 'Text', icon: Type, color: 'purple' },
  { type: 'llm', label: 'LLM', icon: FileText, color: 'blue' },
  { type: 'math', label: 'Math', icon: Calculator, color: 'orange' },
  { type: 'date', label: 'Date', icon: Calendar, color: 'yellow' },
  { type: 'apiCall', label: 'API Call', icon: Globe, color: 'indigo' },
  { type: 'filter', label: 'Filter', icon: Filter, color: 'pink' },
  { type: 'merge', label: 'Merge', icon: Merge, color: 'cyan' },
];

const colorMap = {
  green: 'hover:bg-green-600 bg-green-500',
  red: 'hover:bg-red-600 bg-red-500',
  purple: 'hover:bg-purple-600 bg-purple-500',
  blue: 'hover:bg-blue-600 bg-blue-500',
  orange: 'hover:bg-orange-600 bg-orange-500',
  yellow: 'hover:bg-yellow-600 bg-yellow-500',
  indigo: 'hover:bg-indigo-600 bg-indigo-500',
  pink: 'hover:bg-pink-600 bg-pink-500',
  cyan: 'hover:bg-cyan-600 bg-cyan-500',
};

export const Toolbar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 p-4">
      <h2 className="text-lg font-bold text-white mb-4">Node Library</h2>
      <div className="space-y-2">
        {nodeTypes.map((nodeType) => {
          const Icon = nodeType.icon;
          return (
            <div
              key={nodeType.type}
              draggable
              onDragStart={(event) => onDragStart(event, nodeType.type)}
              className={`
                flex items-center gap-3 p-3 rounded-lg cursor-grab active:cursor-grabbing
                ${colorMap[nodeType.color as keyof typeof colorMap]}
                text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105
              `}
            >
              <Icon size={18} />
              <span className="font-medium">{nodeType.label}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-3 bg-slate-800 rounded-lg">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Instructions</h3>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>• Drag nodes to canvas</li>
          <li>• Connect handles to create flow</li>
          <li>• Use variables in text nodes</li>
          <li>• Submit to analyze pipeline</li>
        </ul>
      </div>
    </div>
  );
};
