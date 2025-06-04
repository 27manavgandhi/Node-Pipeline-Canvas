
import React, { useState, useCallback } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

interface DateNodeData {
  format?: string;
}

interface DateNodeProps {
  id: string;
  data: DateNodeData;
}

export const DateNode: React.FC<DateNodeProps> = ({ id, data }) => {
  const [format, setFormat] = useState(data?.format || 'YYYY-MM-DD');

  const handleFormatChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value);
  }, []);

  const handles = [
    {
      id: `${id}-date`,
      type: 'target' as const,
      position: Position.Left,
      label: 'Date Input',
    },
    {
      id: `${id}-formatted`,
      type: 'source' as const,
      position: Position.Right,
      label: 'Formatted',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Date"
      handles={handles}
      icon={<span className="text-xs">📅</span>}
      color="yellow"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Format
          </label>
          <select
            value={format}
            onChange={handleFormatChange}
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
          >
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD HH:mm:ss">YYYY-MM-DD HH:mm:ss</option>
            <option value="ISO">ISO 8601</option>
            <option value="timestamp">Unix Timestamp</option>
          </select>
        </div>
        <div className="text-xs text-slate-400">
          Formats date inputs into specified format
        </div>
      </div>
    </BaseNode>
  );
};
