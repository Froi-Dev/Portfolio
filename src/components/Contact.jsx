import { useState } from 'react';
import Icon from './Icon.jsx';

export default function Contact() {
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);
  const email = 'froilandevera.dev@gmail.com';
  const sendMessage = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const subject = encodeURIComponent(`Portfolio message from ${values.get('name')}`);
    const body = encodeURIComponent(`From: ${values.get('name')} (${values.get('email')})\n\n${values.get('message')}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setNote('Your email draft is ready. Send it from your email app to get in touch.');
  };
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); }
    catch { setNote('You can copy the email address shown on the left.'); }
  };
  return <section className="content-section contact" id="contact" aria-labelledby="contact-title">
    <div className="contact-grid"><div className="contact-copy"><div className="section-heading"><div><span className="eyebrow">05 / Say hello</span><h1 id="contact-title">Let's make something{' '}<br />worth putting out there<span>.</span></h1></div></div>
    <p>Have an idea, a project, or an opportunity?<br />I'd love to hear about it.</p><div className="contact-email"><a href={`mailto:${email}`}>{email}</a><button className="icon-button" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'}><Icon name={copied ? 'check2' : 'copy'} /></button></div><div className="contact-socials"><a href="https://github.com/Froi-Dev" target="_blank" rel="noreferrer"><Icon name="github" /> GitHub <Icon name="arrow-up-right" /></a><a href={`mailto:${email}?subject=Resume%20request`}>Request résumé <Icon name="arrow-up-right" /></a></div></div>
    <form className="contact-form" onSubmit={sendMessage}><div className="form-row"><div className="form-field"><label htmlFor="cf-name">Your name</label><input type="text" id="cf-name" name="name" placeholder="Alex Smith" required autoComplete="name" /></div><div className="form-field"><label htmlFor="cf-email">Email address</label><input type="email" id="cf-email" name="email" placeholder="alex@example.com" required autoComplete="email" /></div></div><div className="form-field"><label htmlFor="cf-message">What's on your mind?</label><textarea id="cf-message" name="message" rows={4} placeholder="A little about your idea…" required /></div><div className="form-bottom"><span>Opens in your email app</span><button type="submit" className="button button-primary">Let's connect <Icon name="arrow-up-right" /></button></div><p className="form-note" role="status">{note}{copied && !note ? 'Email address copied.' : ''}</p></form></div>
  </section>;
}


