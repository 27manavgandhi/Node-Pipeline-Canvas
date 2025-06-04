
import React, { useState, useCallback } from 'react';
import { Position } from '@xyflow/react';
import { Upload } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface OutputNodeData {
  outputName?: string;
  outputType?: string;
}

interface OutputNodeProps {
  id: string;
  data: OutputNodeData;
}

export const OutputNode: React.FC<OutputNodeProps> = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('output-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value);
  }, []);

  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setOutputType(e.target.value);
  }, []);

  const handles = [
    {
      id: `${id}-value`,
      type: 'target' as const,
      position: Position.Left,
      label: 'Input',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={handles}
      icon={<Upload size={16} />}
      color="red"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Name
          </label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
            placeholder="Enter output name"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Type
          </label>
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="File">File</option>
            <option value="JSON">JSON</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
