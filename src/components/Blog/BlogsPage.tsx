import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost';

const BlogsPage: React.FC = () => {
  const [blogContent, setBlogContent] = useState<string>('');

  useEffect(() => {
    // Load the blog content
    fetch('/blogs/some-principles-I-keep-going-back-to.md')
      .then(response => response.text())
      .then(text => setBlogContent(text))
      .catch(error => console.error('Error loading blog:', error));
  }, []);

  return (
    <div className="blogs-page">
      <section className="blog-section">
        {blogContent && <BlogPost content={blogContent} />}
      </section>
    </div>
  );
};

export default BlogsPage; 