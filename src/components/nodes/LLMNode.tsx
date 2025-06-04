
import React from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

interface LLMNodeData {}

interface LLMNodeProps {
  id: string;
  data: LLMNodeData;
}

export const LLMNode: React.FC<LLMNodeProps> = ({ id, data }) => {
  const handles = [
    {
      id: `${id}-system`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '33%' },
      label: 'System',
    },
    {
      id: `${id}-prompt`,
      type: 'target' as const,
      position: Position.Left,
      style: { top: '66%' },
      label: 'Prompt',
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
      title="LLM"
      handles={handles}
      icon={<span className="text-xs">🤖</span>}
      color="blue"
    >
      <div className="text-center py-2">
        <div className="text-sm text-slate-300 mb-2">
          Large Language Model
        </div>
        <div className="text-xs text-slate-400">
          Connect system prompt and user prompt to generate AI responses
        </div>
      </div>
    </BaseNode>
  );
};
