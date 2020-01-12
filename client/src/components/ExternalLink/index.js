import React from 'react';

const ExternalLink = ({ href, className, children }) => (
  <a
    {...{
      className,
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    }}
  >
    {children}
  </a>
);

export default ExternalLink;
