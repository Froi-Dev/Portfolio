import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon.jsx';
import { certifications } from '../data/credentials.js';
import './Certifications.css';

const assetUrl = path => `${import.meta.env.BASE_URL}${path}`;
const issuerLabels = { cisco: 'cisco', dict: 'DICT', kaspersky: 'K', digiforce: 'DF' };
const groups = [...new Set(certifications.map(certificate => certificate.group))];

function CredentialDialog({ certificate, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(<dialog ref={dialogRef} className="credential-dialog" aria-labelledby="credential-dialog-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="credential-dialog-heading"><div><span className="eyebrow">{certificate.issuer}</span><h2 id="credential-dialog-title">{certificate.title}</h2><p>{certificate.kind} · {certificate.date}</p></div><button className="icon-button" type="button" aria-label="Close credential" onClick={onClose} autoFocus><Icon name="x-lg" /></button></div>
    <div className="credential-document"><img src={assetUrl(certificate.image)} alt={`${certificate.title} — ${certificate.issuer}, issued ${certificate.date}`} /></div>
    <div className="credential-dialog-actions"><a className="button button-secondary" href={assetUrl(certificate.file)} target="_blank" rel="noreferrer">Open original <Icon name="arrow-up-right" /></a>{certificate.url && <a className="button button-primary" href={certificate.url} target="_blank" rel="noreferrer">Verify credential <Icon name="arrow-up-right" /></a>}</div>
  </dialog>, document.body);
}

export default function Certifications() {
  const [selected, setSelected] = useState(null);

  return <section className="content-section certifications" id="certifications" aria-labelledby="certifications-title">
    <div className="section-heading"><div><span className="eyebrow">04 / Learning & growth</span><h1 id="certifications-title">Learning, put into practice<span>.</span></h1></div><span className="credential-total">{String(certifications.length).padStart(2, '0')} credentials <span>/ 2026</span></span></div>
    <p className="credentials-intro">A collection of courses, hands-on training, and cybersecurity milestones.{' '}<br />Explore the certificates and their available verification records.</p>
    {groups.map(group => <section className="credential-group" key={group} aria-label={group}>
      <div className="credential-group-heading"><h2>{group}</h2><span>{String(certifications.filter(certificate => certificate.group === group).length).padStart(2, '0')}</span></div>
      <div className="credential-card-grid">{certifications.filter(certificate => certificate.group === group).map(certificate => <article className="credential-tile" key={certificate.id}>
        <button type="button" className="credential-preview-button" onClick={() => setSelected(certificate)} aria-haspopup="dialog" aria-label={`View ${certificate.title} — ${certificate.issuer}`}>
          <span className={`credential-issuer-mark issuer-${certificate.issuerKey}`} aria-hidden="true">{issuerLabels[certificate.issuerKey]}</span>
          <h3>{certificate.title}</h3><span className="credential-issuer-name">{certificate.issuer}</span><span className="credential-kind">{certificate.kind}</span>
        </button>
        <div className="credential-tile-footer">{certificate.url ? <a href={certificate.url} target="_blank" rel="noreferrer" aria-label={`Verify ${certificate.title} — ${certificate.issuer}`}><span aria-hidden="true">❮</span> Verify <span aria-hidden="true">❯</span></a> : <button type="button" onClick={() => setSelected(certificate)} aria-haspopup="dialog" aria-label={`View certificate for ${certificate.title}`}><span aria-hidden="true">❮</span> View certificate <span aria-hidden="true">❯</span></button>}</div>
      </article>)}</div>
    </section>)}
    {selected && <CredentialDialog certificate={selected} onClose={() => setSelected(null)} />}
  </section>;
}
