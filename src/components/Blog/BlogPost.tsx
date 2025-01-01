import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostProps {
  content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Extract title from the markdown content
  const title = content.split('\n')[0].replace('# ', '');
  
  // Get a preview of the content (first paragraph after the title)
  const preview = content
    .split('\n\n')
    .slice(1, 2)
    .join('\n\n');

  return (
    <div className="blog-post">
      <div 
        className="blog-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2>{title}</h2>
        <button 
          className="expand-toggle"
          aria-label={isExpanded ? "Collapse post" : "Expand post"}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      <div className={`blog-content ${isExpanded ? 'expanded' : ''}`}>
        {isExpanded ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        ) : (
          <div className="blog-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview}</ReactMarkdown>
            <div className="preview-fade" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost; 