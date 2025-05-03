import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    className: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, className }) => {
    return (
        <div className={`markdown-editor grid grid-cols-1 gap-6 md:grid-cols-2 ${className}`}>
            {/* Editor */}
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={20}
                className="w-full rounded-md border border-gray-300 p-3 font-mono shadow-sm"
                placeholder="Write description here..."
            />

            {/* Render Markdown */}
            <div className="preview prose prose-slate max-w-none rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownEditor;
