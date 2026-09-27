import DecryptedText from './reactbits/DecryptedText.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';

export default function AnimatedText({ text, wrap = false }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  if (reducedMotion) return text;
  if (wrap) return <span className="animated-words">{text.split(' ').map((word, index) => <span key={`${index}-${word}`}><AnimatedText text={word} />{' '}</span>)}</span>;
  // Keep a stable accessible label and reserve the final text's dimensions.
  return <span className="animated-text"><span className="sr-only">{text}</span><span className="animated-text-measure" aria-hidden="true">{text}</span><span className="animated-text-effect" aria-hidden="true"><DecryptedText text={text} animateOn="view" speed={45} maxIterations={12} useOriginalCharsOnly encryptedClassName="decrypting-character" style={{ whiteSpace: 'nowrap' }} /></span></span>;
}
