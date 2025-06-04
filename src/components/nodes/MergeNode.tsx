
import React, { useState, useCallback } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

interface MergeNodeData {
  strategy?: string;
}

interface MergeNodeProps {
  id: string;
  data: MergeNodeData;
}

export const MergeNode: React.FC<MergeNodeProps> = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  const handleStrategyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStrategy(e.target.value);
  }, []);

  const handles = [
    {
      id: `${id}-input1`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '25%' },
      label: 'Input 1',
    },
    {
      id: `${id}-input2`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '50%' },
      label: 'Input 2',
    },
    {
      id: `${id}-input3`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '75%' },
      label: 'Input 3',
    },
    {
      id: `${id}-merged`,
      type: 'source' as const,
      position: Position.Right,
      label: 'Merged',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Merge"
      handles={handles}
      icon={<span className="text-xs">🔗</span>}
      color="cyan"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Strategy
          </label>
          <select
            value={strategy}
            onChange={handleStrategyChange}
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
          >
            <option value="concat">Concatenate</option>
            <option value="join">Join with Separator</option>
            <option value="array">Create Array</option>
            <option value="object">Merge Objects</option>
            <option value="union">Union (Unique)</option>
          </select>
        </div>
        <div className="text-xs text-slate-400">
          Combines multiple inputs
        </div>
      </div>
    </BaseNode>
  );
};
