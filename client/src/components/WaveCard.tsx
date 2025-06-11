import Image from 'next/image';
import type { FC } from 'react';

interface WaveCardProps {
  src: string;
  alt: string;
  /** Tailwind width / height classes, e.g. "w-[280px] h-[330px]" */
  size: string;
}

const WaveCard: FC<WaveCardProps> = ({ src, alt, size }) => (
  <div className={`relative overflow-hidden rounded-[18px] ${size}`}>
    {/* the photo itself */}
    <Image fill src={src} alt={alt} className="object-cover" />

    {/* TOP valley */}
    <span
        className="pointer-events-none absolute -top-[70%] left-1/2 -translate-x-1/2
        w-[130%] h-[80%] bg-white rounded-b-[50%]"
    />

    {/* BOTTOM valley */}
    <span
        className="pointer-events-none absolute -bottom-[70%] left-1/2 -translate-x-1/2
        w-[130%] h-[80%] bg-white rounded-t-[50%]"
    />
  </div>
);

export default WaveCard;