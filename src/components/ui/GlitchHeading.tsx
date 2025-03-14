
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlitchHeadingProps {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  glitchChar?: string | null;
}

export default function GlitchHeading({ 
  children, 
  className, 
  level = 1,
  glitchChar = null 
}: GlitchHeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  const textContent = typeof children === 'string' ? children : '';
  const randomIndex = glitchChar === null && textContent 
    ? Math.floor(Math.random() * textContent.length) 
    : -1;
  
  let content;
  
  if (glitchChar !== null) {
    content = children;
  } else if (randomIndex >= 0 && textContent) {
    const charToGlitch = textContent[randomIndex];
    content = (
      <>
        {textContent.substring(0, randomIndex)}
        <span className="glitch-text" data-text={charToGlitch}>{charToGlitch}</span>
        {textContent.substring(randomIndex + 1)}
      </>
    );
  } else {
    content = children;
  }
  
  return (
    <Component className={cn("font-cyber tracking-wide neon-glow", className)}>
      {content}
    </Component>
  );
}
