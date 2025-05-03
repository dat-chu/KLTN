import ReactMarkdown from 'react-markdown';

const MarkdownViewer = ({ content }: { content: string }) => {
    return (
        <div className="markdown-body">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownViewer;
