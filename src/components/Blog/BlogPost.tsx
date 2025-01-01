import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostProps {
  content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ content }) => {
  return (
    <div className="blog-post">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost; 