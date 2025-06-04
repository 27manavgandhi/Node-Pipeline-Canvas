
import React, { useState, useCallback } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

interface MathNodeData {
  operation?: string;
}

interface MathNodeProps {
  id: string;
  data: MathNodeData;
}

export const MathNode: React.FC<MathNodeProps> = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handleOperationChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
  }, []);

  const handles = [
    {
      id: `${id}-a`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '33%' },
      label: 'A',
    },
    {
      id: `${id}-b`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '66%' },
      label: 'B',
    },
    {
      id: `${id}-result`,
      type: 'source' as const,
      position: Position.Right,
      label: 'Result',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Math"
      handles={handles}
      icon={<span className="text-xs">➕</span>}
      color="orange"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Operation
          </label>
          <select
            value={operation}
            onChange={handleOperationChange}
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
            <option value="power">Power (^)</option>
            <option value="modulo">Modulo (%)</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
