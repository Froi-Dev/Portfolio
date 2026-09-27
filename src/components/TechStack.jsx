import { STACK } from '../data/portfolio.js';

export default function TechStack() {
  return <section className="content-section stack" id="stack" aria-labelledby="stack-title">
    <div className="section-heading"><div><span className="eyebrow">03 / The toolkit</span><h1 id="stack-title">Good tools. Better possibilities<span>.</span></h1></div><p>The technologies behind the work,<br />and a few that keep me curious.</p></div>
    <div className="stack-grid">{STACK.map((group, index) => <div className="stack-category glass-panel" key={group.category}><h3><span>0{index + 1}</span>{group.category}</h3><ul>{group.items.map(item => <li key={item.name}><i className={item.devicon ? item.icon : `bi ${item.icon}`} style={item.color ? { color: item.color } : undefined} aria-hidden="true" />{item.name}</li>)}</ul></div>)}</div>
  </section>;
}

