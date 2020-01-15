import React from 'react';
import LazyLoad from 'react-lazyload';

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  onError?: (e: any) => void;
  noLazy?: boolean;
}

const Image = ({
  src,
  alt,
  className,
  onError,
  noLazy,
}: ImageProps) => (
  <LazyLoad>
    <img {...{ src, className, onError, nolazy: noLazy }} alt={alt || ''} />
  </LazyLoad>
);

export default Image;
