'use client';

import { useState } from 'react';
import Icon from './Icon.jsx';
import '../inner-pages.css';

const email = 'froilandevera.dev@gmail.com';

export default function Contact() {
  const [note, setNote] = useState('');
  const [copied, setCopied] = useState(false);

  function openDraft(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const subject = encodeURIComponent(`Portfolio message from ${values.get('name')}`);
    const body = encodeURIComponent(`From: ${values.get('name')} (${values.get('email')})\n\n${values.get('message')}`);

    setNote('Send the draft from your email app. If it didn’t open, you can copy my email address and write to me directly.');
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setNote('Email address copied.');
    } catch {
      setCopied(false);
      setNote('Select and copy the email address shown on this page.');
    }
  }

  return (
    <section className="content-section contact" id="contact" tabIndex={-1} aria-labelledby="contact-title">
      <div className="wrap contact-layout">
        <div className="contact-details">
          <header className="section-heading">
            <h2 id="contact-title">Get in touch</h2>
            <p>Have a project, an idea, or an opportunity? I’d love to hear from you.</p>
          </header>
          <div className="contact-address">
            <a className="text-link" href={`mailto:${email}`}>{email}</a>
            <button className="icon-button" type="button" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'}>
              <Icon name={copied ? 'check2' : 'copy'} />
            </button>
          </div>
        </div>

        <form className="contact-draft" onSubmit={openDraft} aria-labelledby="contact-draft-title">
          <h3 id="contact-draft-title">Write a message</h3>
          <div className="contact-fields">
            <div className="contact-field">
              <label htmlFor="cf-name">Your name</label>
              <input type="text" id="cf-name" name="name" required autoComplete="name" />
            </div>
            <div className="contact-field">
              <label htmlFor="cf-email">Email address</label>
              <input type="email" id="cf-email" name="email" required autoComplete="email" />
            </div>
          </div>
          <div className="contact-field">
            <label htmlFor="cf-message">Your message</label>
            <textarea id="cf-message" name="message" rows={5} required />
          </div>
          <div className="contact-send">
            <p id="contact-draft-help">Opens a draft in your email app.</p>
            <button type="submit" className="button button-primary" aria-describedby="contact-draft-help">Open email draft</button>
          </div>
          <p className="contact-status" role="status">{note}</p>
        </form>
      </div>
    </section>
  );
}
