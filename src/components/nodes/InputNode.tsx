
import React, { useState, useCallback } from 'react';
import { Position } from '@xyflow/react';
import { Download } from 'lucide-react';
import { BaseNode } from './BaseNode';

interface InputNodeData {
  inputName?: string;
  inputType?: string;
}

interface InputNodeProps {
  id: string;
  data: InputNodeData;
}

export const InputNode: React.FC<InputNodeProps> = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('input-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value);
  }, []);

  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(e.target.value);
  }, []);

  const handles = [
    {
      id: `${id}-value`,
      type: 'source' as const,
      position: Position.Right,
      label: 'Output',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Input"
      handles={handles}
      icon={<Download size={16} />}
      color="green"
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
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            placeholder="Enter input name"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Type
          </label>
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
            <option value="Number">Number</option>
            <option value="Boolean">Boolean</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
