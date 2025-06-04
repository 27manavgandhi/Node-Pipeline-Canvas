
import React, { useState, useCallback } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

interface FilterNodeData {
  condition?: string;
}

interface FilterNodeProps {
  id: string;
  data: FilterNodeData;
}

export const FilterNode: React.FC<FilterNodeProps> = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');

  const handleConditionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition(e.target.value);
  }, []);

  const handles = [
    {
      id: `${id}-input`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '33%' },
      label: 'Input',
    },
    {
      id: `${id}-criteria`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '66%' },
      label: 'Criteria',
    },
    {
      id: `${id}-passed`,
      type: 'source' as const,
      position: Position.Right,
      style: { top: '33%' },
      label: 'Passed',
    },
    {
      id: `${id}-failed`,
      type: 'source' as const,
      position: Position.Right,
      style: { top: '66%' },
      label: 'Failed',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Filter"
      handles={handles}
      icon={<span className="text-xs">🔍</span>}
      color="pink"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Condition
          </label>
          <select
            value={condition}
            onChange={handleConditionChange}
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
          >
            <option value="contains">Contains</option>
            <option value="equals">Equals</option>
            <option value="greater_than">Greater Than</option>
            <option value="less_than">Less Than</option>
            <option value="starts_with">Starts With</option>
            <option value="ends_with">Ends With</option>
          </select>
        </div>
        <div className="text-xs text-slate-400">
          Filters data based on criteria
        </div>
      </div>
    </BaseNode>
  );
};
