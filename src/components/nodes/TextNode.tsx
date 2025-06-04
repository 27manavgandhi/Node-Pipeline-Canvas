
import React, { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

interface TextNodeProps {
  id: string;
  data: {
    text?: string;
  };
  selected?: boolean;
}

export const TextNode: React.FC<TextNodeProps> = ({ id, data, selected }) => {
  const [text, setText] = useState(data.text || '{{input}}');
  const [variables, setVariables] = useState<string[]>([]);

  // Extract variables from text in format {{variableName}}
  const extractVariables = useCallback((inputText: string) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(inputText)) !== null) {
      const variableName = match[1].trim();
      if (variableName && !matches.includes(variableName)) {
        matches.push(variableName);
      }
    }
    
    return matches;
  }, []);

  // Update variables when text changes
  useEffect(() => {
    const detectedVariables = extractVariables(text);
    setVariables(detectedVariables);
  }, [text, extractVariables]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Auto-resize textarea
  const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-600"
      color="purple"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Text Content
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              handleTextChange(e);
              handleTextareaResize(e);
            }}
            className="w-full px-2 py-1 text-xs bg-slate-800 border border-slate-600 rounded resize-none focus:outline-none focus:ring-1 focus:ring-purple-500 text-white min-h-[60px]"
            placeholder="Enter text with {{variables}}"
            rows={3}
          />
        </div>
        
        {variables.length > 0 && (
          <div className="text-xs text-slate-400">
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>

      {/* Dynamic input handles for each variable */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className="w-3 h-3 bg-purple-500 border-2 border-purple-300"
          style={{
            top: `${20 + (index * 25)}px`,
          }}
        />
      ))}
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-3 h-3 bg-purple-500 border-2 border-purple-300"
      />
    </BaseNode>
  );
};
