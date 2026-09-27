import Icon from './Icon.jsx';
import { cvPath } from '../data/credentials.js';

export default function DownloadCV() {
  return <div className="cv-download">
    {cvPath ? <a className="button button-secondary" href={`${import.meta.env.BASE_URL}${cvPath}`} download="Froilan-De-Vera-CV.pdf">Download CV <Icon name="download" /></a>
      : <><button className="button button-secondary" disabled aria-describedby="cv-status">Download CV <Icon name="download" /></button><span id="cv-status">CV coming soon</span></>}
  </div>;
}
