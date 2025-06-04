
import React, { useState, useCallback } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

interface APICallNodeData {
  url?: string;
  method?: string;
}

interface APICallNodeProps {
  id: string;
  data: APICallNodeData;
}

export const APICallNode: React.FC<APICallNodeProps> = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);

  const handleMethodChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  }, []);

  const handles = [
    {
      id: `${id}-data`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '33%' },
      label: 'Data',
    },
    {
      id: `${id}-headers`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '66%' },
      label: 'Headers',
    },
    {
      id: `${id}-response`,
      type: 'source' as const,
      position: Position.Right,
      label: 'Response',
    },
  ];

  return (
    <BaseNode
      id={id}
      title="API Call"
      handles={handles}
      icon={<span className="text-xs">🌐</span>}
      color="indigo"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            URL
          </label>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            placeholder="Enter API URL"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Method
          </label>
          <select
            value={method}
            onChange={handleMethodChange}
            className="w-full px-2 py-1 text-sm bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
