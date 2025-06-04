
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit, isSubmitting }) => {
  return (
    <Button
      onClick={onSubmit}
      disabled={isSubmitting}
      size="lg"
      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-2xl transition-all duration-200 hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-0"
      style={{ 
        background: isSubmitting 
          ? 'linear-gradient(to right, #3b82f6, #7c3aed)' 
          : 'linear-gradient(to right, #3b82f6, #8b5cf6)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)'
      }}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Play className="mr-2 h-4 w-4" />
          Submit Pipeline
        </>
      )}
    </Button>
  );
};
