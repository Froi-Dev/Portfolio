'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon.jsx';
import { credentials } from '../data/credentials.js';
import './Certifications.css';

const assetUrl = path => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/${path}`;
const isPdf = path => /\.pdf$/i.test(path || '');
const papersPerPage = 3;
const folders = [
  { title: 'CyberSecurity', description: 'Security courses and training' },
  { title: 'Cloud & Development', description: 'Cloud and systems training' },
  { title: 'Competition', description: 'Hackathon and CTF events' },
  { title: 'Badge', description: 'Digital badges' },
].map(folder => ({ ...folder, credentials: credentials.filter(credential => credential.category === folder.title) }));

function thumbnail(credential) {
  return credential.image || (!isPdf(credential.file) && credential.file);
}

function credentialDate(credential) {
  return credential.date && credential.date !== '—' ? credential.date : 'Date not listed';
}

function useHorizontalSwipe(enabled, onSwipe) {
  const start = useRef(null);
  const swiped = useRef(false);

  return {
    onPointerDown(event) {
      swiped.current = false;
      if (!enabled || event.pointerType === 'mouse' || !event.isPrimary) return;
      start.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    },
    onPointerUp(event) {
      const pointer = start.current;
      if (pointer?.id !== event.pointerId) return;
      start.current = null;
      const x = event.clientX - pointer.x;
      const y = event.clientY - pointer.y;
      if (Math.abs(x) < 45 || Math.abs(x) <= Math.abs(y) * 1.4) return;
      swiped.current = true;
      onSwipe(x < 0 ? 1 : -1);
    },
    onPointerCancel() { start.current = null; },
    onClickCapture(event) {
      if (!swiped.current || event.detail === 0) return;
      event.preventDefault();
      event.stopPropagation();
      swiped.current = false;
    },
  };
}

function CarouselControls({ index, total, itemLabel, onSelect, className = '' }) {
  return (
    <div
      className={`credential-carousel-controls ${className}`}
      role="group"
      aria-label={`Browse ${itemLabel}s`}
      onKeyDown={event => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        event.stopPropagation();
        onSelect(index + (event.key === 'ArrowLeft' ? -1 : 1));
      }}
    >
      <button className="icon-button" type="button" aria-label={`Previous ${itemLabel}`} onClick={() => onSelect(index - 1)}>
        <Icon name="arrow-left" />
      </button>
      <div className="credential-carousel-dots">
        {Array.from({ length: total }, (_, position) => (
          <button
            key={position}
            className="credential-page-dot"
            type="button"
            aria-label={`${itemLabel} ${position + 1} of ${total}`}
            aria-current={position === index ? 'true' : undefined}
            onClick={() => onSelect(position)}
          />
        ))}
      </div>
      <button className="icon-button" type="button" aria-label={`Next ${itemLabel}`} onClick={() => onSelect(index + 1)}>
        <Icon name="arrow-right" />
      </button>
    </div>
  );
}

function CredentialDialog({ items, initialIndex, onClose, opener }) {
  const [slide, setSlide] = useState({ index: initialIndex, direction: 0 });
  const dialogRef = useRef(null);
  const closeButton = useRef(null);
  const closeTimer = useRef(0);
  const backdropPressed = useRef(false);
  const credential = items[slide.index];
  const hasCarousel = items.length >= 3;
  const swipe = useHorizontalSwipe(hasCarousel, direction => select(slide.index + direction));
  const original = assetUrl(credential.file || credential.image);
  const imagePath = credential.preview || thumbnail(credential);
  const documentLabel = `${credential.title} from ${credential.issuer}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflowY = document.body.style.overflowY;
    dialog.showModal();
    closeButton.current?.focus();
    document.body.style.overflowY = 'hidden';
    return () => {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = 0;
      dialog.close();
      document.body.style.overflowY = previousOverflowY;
      opener?.focus({ preventScroll: true });
    };
  }, [opener]);

  function select(position) {
    if (closeTimer.current) return;
    setSlide(current => {
      const index = (position + items.length) % items.length;
      if (current.index === index) return current;
      return { index, direction: position > current.index ? 1 : -1 };
    });
  }

  function closeDialog() {
    if (closeTimer.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose();
      return;
    }
    dialogRef.current.dataset.closing = '';
    closeTimer.current = window.setTimeout(onClose, 180);
  }

  function handleKeys(event) {
    if (!hasCarousel || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    select(slide.index + (event.key === 'ArrowLeft' ? -1 : 1));
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="credential-dialog"
      aria-labelledby="credential-dialog-title"
      onCancel={event => { event.preventDefault(); closeDialog(); }}
      onKeyDown={handleKeys}
      onPointerDown={event => { backdropPressed.current = event.target === event.currentTarget; }}
      onClick={event => {
        if (backdropPressed.current && event.target === event.currentTarget) closeDialog();
        backdropPressed.current = false;
      }}
    >
      <div className="credential-dialog-heading">
        <div>
          <h2 id="credential-dialog-title">{credential.title}</h2>
          <p>{credential.issuer}</p>
          <p>{credential.kind}, {credentialDate(credential)}</p>
        </div>
        <button ref={closeButton} className="icon-button" type="button" aria-label="Close certificate" onClick={closeDialog}>
          <Icon name="x-lg" />
        </button>
      </div>
      <div className="credential-document" {...swipe}>
        <figure key={credential.id} className="credential-image" data-direction={slide.direction || undefined}>
          {imagePath
            ? <img src={assetUrl(imagePath)} alt={documentLabel} draggable={false} />
            : <a className="text-link" href={original} target="_blank" rel="noreferrer">Open original to view this certificate <Icon name="arrow-up-right" /></a>}
        </figure>
      </div>
      {hasCarousel && (
        <>
          <CarouselControls index={slide.index} total={items.length} itemLabel="certificate" onSelect={select} className="credential-dialog-controls" />
          <p className="sr-only" role="status">{slide.index + 1} of {items.length}. {documentLabel}</p>
        </>
      )}
      <div className="credential-dialog-actions">
        <a className="button button-secondary" href={original} target="_blank" rel="noreferrer">Open original</a>
        <a className="button button-secondary" href={original} download>Download <Icon name="download" /></a>
        {credential.url && <a className="button button-primary" href={credential.url} target="_blank" rel="noreferrer">Verify certificate</a>}
      </div>
    </dialog>,
    document.body,
  );
}

function CredentialPaper({ credential, onPreview }) {
  const image = thumbnail(credential);

  return (
    <li>
      <button
        type="button"
        className="evidence-open-paper"
        aria-haspopup="dialog"
        aria-label={`View ${credential.title} from ${credential.issuer}`}
        onClick={event => onPreview(credential, event.currentTarget)}
      >
        <span className="evidence-media">
          {image ? <img src={assetUrl(image)} alt="" decoding="async" /> : <span className="evidence-file-type">PDF</span>}
        </span>
        <span className="evidence-details">
          <strong>{credential.title}</strong>
          <span>{credential.issuer}</span>
          <span>{credentialDate(credential)}</span>
        </span>
      </button>
    </li>
  );
}

function FolderCard({ folder, buttonRef, onOpen }) {
  const count = folder.credentials.length;

  return (
    <li>
      <button className="evidence-folder" type="button" ref={buttonRef} onClick={onOpen}>
        <span className="evidence-folder-back" aria-hidden="true" />
        <span className="evidence-folder-sheets" aria-hidden="true"><span /><span /></span>
        <span className="evidence-folder-front" aria-hidden="true" />
        <span className="evidence-folder-label">
          <strong>{folder.title}</strong>
          <span>{folder.description}</span>
        </span>
        <span className="evidence-folder-footer">
          <span><strong>{count}</strong> {count === 1 ? 'certificate' : 'certificates'}</span>
          <Icon name="arrow-right" />
        </span>
      </button>
    </li>
  );
}

function OpenFolder({ folder, closing, headingRef, onBack, onPreview }) {
  const [page, setPage] = useState({ index: 0, direction: 0 });
  const pageCount = Math.ceil(folder.credentials.length / papersPerPage);
  const start = page.index * papersPerPage;
  const papers = folder.credentials.slice(start, start + papersPerPage);
  const swipe = useHorizontalSwipe(pageCount > 1, direction => select(page.index + direction));

  function select(position) {
    if (closing) return;
    const next = (position + pageCount) % pageCount;
    if (next !== page.index) setPage({ index: next, direction: position > page.index ? 1 : -1 });
  }

  return (
    <div className="evidence-open" data-closing={closing || undefined}>
      <div className="evidence-open-heading">
        <header>
          <button className="button button-secondary evidence-back" type="button" onClick={onBack}><Icon name="arrow-left" /> Back to folders</button>
          <h2 id="certifications-title" tabIndex={-1} ref={headingRef}>My Certificates</h2>
          <p>{folder.title} <span>({folder.credentials.length})</span></p>
        </header>
      </div>
      <div className="evidence-open-stage" {...swipe}>
        <span className="evidence-open-back" aria-hidden="true" />
        <ul key={page.index} className="evidence-open-papers" data-direction={page.direction || undefined}>
          {papers.map(credential => <CredentialPaper key={credential.id} credential={credential} onPreview={onPreview} />)}
        </ul>
        <span className="evidence-open-front" aria-hidden="true" />
      </div>
      {pageCount > 1 && (
        <>
          <CarouselControls index={page.index} total={pageCount} itemLabel="page" onSelect={select} className="evidence-stage-controls" />
          <p className="sr-only" role="status">Showing certificates {start + 1}–{start + papers.length} of {folder.credentials.length}</p>
        </>
      )}
    </div>
  );
}

export default function Certifications() {
  const [folder, setFolder] = useState(null);
  const [closingFolder, setClosingFolder] = useState(false);
  const [selection, setSelection] = useState(null);
  const headingRef = useRef(null);
  const folderButtons = useRef({});
  const previousFolder = useRef(null);
  const folderCloseTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(folderCloseTimer.current), []);

  useEffect(() => {
    if (folder) {
      headingRef.current?.focus();
    } else if (previousFolder.current) {
      folderButtons.current[previousFolder.current]?.focus();
      previousFolder.current = null;
    }
  }, [folder]);

  function preview(credential, opener) {
    if (closingFolder) return;
    setSelection({ items: folder.credentials, initialIndex: folder.credentials.indexOf(credential), opener });
  }

  function closeFolder() {
    if (folderCloseTimer.current) return;
    previousFolder.current = folder.title;

    function finish() {
      folderCloseTimer.current = 0;
      setClosingFolder(false);
      setFolder(null);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }
    setClosingFolder(true);
    folderCloseTimer.current = window.setTimeout(finish, 250);
  }

  return (
    <section className="content-section certifications" id="certifications" tabIndex={-1} aria-labelledby="certifications-title">
      <div className="wrap">
        {folder ? (
          <OpenFolder folder={folder} closing={closingFolder} headingRef={headingRef} onBack={closeFolder} onPreview={preview} />
        ) : (
          <>
            <header className="section-heading">
              <h2 id="certifications-title">Certificates</h2>
            </header>
            <ul className="evidence-folders">
              {folders.map(item => (
                <FolderCard
                  key={item.title}
                  folder={item}
                  buttonRef={button => { folderButtons.current[item.title] = button; }}
                  onOpen={() => setFolder(item)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
      {selection && <CredentialDialog {...selection} onClose={() => setSelection(null)} />}
    </section>
  );
}
