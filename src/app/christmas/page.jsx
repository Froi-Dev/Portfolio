import HolidayExperience from '../../components/HolidayExperience.jsx';
import '../../seasonal.css';

export const metadata = { title: 'Christmas edition' };

export default function ChristmasPage() {
  return (
    <section className="wrap content-section seasonal" aria-labelledby="seasonal-title">
      <div className="section-heading">
        <h1 id="seasonal-title">Christmas edition</h1>
        <p>A winter village from a previous edition of the portfolio.</p>
      </div>
      <HolidayExperience />
    </section>
  );
}
