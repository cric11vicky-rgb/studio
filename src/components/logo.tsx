
import * as React from 'react';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <title>Smart Vidya Logo</title>
      <rect width="32" height="32" rx="8" fill="hsl(var(--primary))" />
      <path
        d="M9 23V10.7C9 10.0373 9.53726 9.5 10.2 9.5H16.5C18.433 9.5 20 11.067 20 13C20 14.933 18.433 16.5 16.5 16.5H12.6M9 23H12.6M9 23L12.6 16.5M12.6 16.5H17.4C19.9299 16.5 22 18.5701 22 21.1C22 23.6299 19.9299 25.7 17.4 25.7H15.6"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
