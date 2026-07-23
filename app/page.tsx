"use client";

import { FormEvent, useState } from "react";

const nav = [["Projekt", "#projekt"], ["Komárom", "#komarom"], ["Előnyök", "#elonyok"], ["Galéria", "#galeria"], ["Lakások", "#lakasok"]];
const apartments = [
  ["1 + fél szoba", "38–44 m²", "I–II. emelet", "Első otthonnak"],
  ["2 szoba", "52–61 m²", "I–III. emelet", "Pároknak tervezve"],
  ["3 szoba", "68–82 m²", "I–III. emelet", "Tágas családi tér"],
  ["Penthouse", "96–118 m²", "IV. emelet", "Panorámás terasszal"],
];

function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? "light" : ""}`} href="#top" aria-label="Marek 5 kezdőlap">
    <span className="brand-mark"><b>M</b><b>5</b></span>
    <span><strong>MAREK 5</strong><small>KOMÁROM · PRÉMIUM OTTHONOK</small></span>
  </a>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSent(true); e.currentTarget.reset(); }

  return <main className="site" id="top">
    <header className="header">
      <Brand light />
      <nav className="desktop-nav" aria-label="Fő navigáció">{nav.map(([t,h]) => <a key={h} href={h}>{t}</a>)}</nav>
      <a className="button gold header-cta" href="#erdeklodes">Érdekel a projekt</a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Menü">{menu ? "×" : "☰"}</button>
      {menu && <nav className="mobile-nav">{nav.map(([t,h]) => <a key={h} href={h} onClick={() => setMenu(false)}>{t}<span>→</span></a>)}<a href="#erdeklodes" onClick={() => setMenu(false)}>Érdekel a projekt<span>→</span></a></nav>}
    </header>

    <section className="hero">
      <img src="/komarom/hero-night.png" alt="A Marek József utcai prémium lakópark esti látványterve" className="cover" />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="kicker light-text">Komárom · Marek József utca 5.</p>
        <h1>Új otthon.<br/><em>Új minőség.</em></h1>
        <p>Prémium, energiahatékony lakások Komárom szívében — időtálló építészet, átgondolt terek, magasabb életminőség.</p>
        <div className="hero-actions"><a className="button gold" href="#lakasok">Lakások felfedezése <span>→</span></a><a className="text-link light-link" href="#projekt">Ismerje meg a projektet <span>↓</span></a></div>
      </div>
      <div className="hero-meta"><span>Értékálló építészet</span><span>Okos otthonok</span><span>Zöld környezet</span></div>
    </section>

    <section className="intro" id="projekt">
      <div><p className="kicker">A projektről</p><h2>Több mint lakóhely.<br/><em>Egy jól megtervezett élet.</em></h2></div>
      <div className="intro-copy">
        <p>A Marek 5 egy kis léptékű, prémium szemléletű lakófejlesztés, ahol minden részlet a nyugodt hétköznapokat szolgálja. Világos otthonok, természetes anyagok és jövőálló műszaki megoldások.</p>
        <ul><li>✓ Kortárs, időtálló építészeti karakter</li><li>✓ Energiahatékony gépészet és hőszigetelés</li><li>✓ Saját erkély vagy terasz minden lakáshoz</li></ul>
        <a className="text-link" href="#elonyok">A részletek <span>→</span></a>
      </div>
      <div className="intro-image"><img src="/komarom/residence-sunset.png" alt="Modern lakóépületek parkosított környezetben naplementekor" className="cover" /></div>
    </section>

    <section className="location" id="komarom">
      <div className="location-copy"><p className="kicker light-text">Miért Komárom?</p><h2>Közel mindenhez.<br/><em>Mégis otthon.</em></h2><p>Komárom egyszerre kínál kisvárosi nyugalmat és kiváló regionális kapcsolatokat. A Duna-part, a belváros és a mindennapi szolgáltatások percek alatt elérhetők.</p></div>
      <div className="location-grid">
        {[["≈","Duna-part","3 perc"],["▥","Belváros","5 perc"],["↝","Vasútállomás","7 perc"],["⌖","Budapest","45 perc"]].map(([i,t,s]) => <article key={t}><b>{i}</b><div><strong>{t}</strong><span>{s}</span></div></article>)}
      </div>
      <div className="map"><div className="map-grid"/><div className="river"/><span className="map-pin"><b>⌖</b>Marek József utca 5.<small>Komárom</small></span></div>
    </section>

    <section className="benefits" id="elonyok">
      <div className="section-heading"><p className="kicker">A Marek 5 előnyei</p><h2>Minőség, amit<br/><em>minden nap érez.</em></h2></div>
      <div className="benefit-grid">
        {[["⌂","Átgondolt alaprajzok","Élhető terek, jó benapozás és kényelmes tárolás."],["⌁","Okosotthon-előkészítés","A világítás, árnyékolás és hőmérséklet jövőálló vezérlése."],["◇","Biztonságos környezet","Beléptetőrendszer, videókapu és zárt közösségi terek."],["✦","Prémium anyaghasználat","Időtálló burkolatok és gondosan összeválogatott részletek."]].map(([i,t,c],n) => <article key={t}><span className="number">0{n+1}</span><b className="benefit-icon">{i}</b><h3>{t}</h3><p>{c}</p></article>)}
      </div>
    </section>

    <section className="gallery" id="galeria">
      <div className="gallery-heading"><div><p className="kicker light-text">Látványtervek</p><h2>Az otthon érzése,<br/><em>már az első pillanatban.</em></h2></div><p>A képek a projekt tervezett hangulatát és anyaghasználatát szemléltetik.</p></div>
      <div className="gallery-grid">
        <figure className="wide"><img src="/komarom/interiors.png" alt="Prémium lakás enteriőrjei" className="cover"/><figcaption>Világos, természetes enteriőrök</figcaption></figure>
        <figure><img src="/komarom/smart-home.png" alt="Okosotthon-megoldásokkal felszerelt modern nappali" className="cover"/><figcaption>Jövőálló kényelem</figcaption></figure>
        <figure className="full"><img src="/komarom/residence-sunset.png" alt="A lakópark átfogó külső látványterve" className="cover"/><figcaption>Parkosított, privát lakókörnyezet</figcaption></figure>
      </div>
    </section>

    <section className="apartments" id="lakasok">
      <div className="apartments-top"><div><p className="kicker">Lakástípusok</p><h2>Találja meg az<br/><em>Ön ritmusához illőt.</em></h2></div><p>A kínálat jelenleg tájékoztató jellegű. A részletes alaprajzok és az aktuális elérhetőség hamarosan érkeznek.</p></div>
      <div className="apartment-list">{apartments.map(([r,a,l,n],i) => <article key={r}><span className="ap-index">0{i+1}</span><div><h3>{r}</h3><p>{n}</p></div><strong>{a}</strong><span>{l}</span><a href="#erdeklodes" aria-label={`Érdeklődés: ${r}`}>›</a></article>)}</div>
    </section>

    <section className="interest" id="erdeklodes">
      <div className="interest-copy"><p className="kicker light-text">Elsőként értesülni</p><h2>Legyen az elsők között,<br/><em>akik hazatalálnak.</em></h2><p>Kérjen személyre szabott tájékoztatást a lakásokról, az induló árakról és az értékesítés kezdetéről.</p><div className="privacy"><b>◇</b><span>Adatait kizárólag a projekttel kapcsolatos tájékoztatásra használjuk.</span></div></div>
      {sent ? <div className="success" role="status"><b>✓</b><h3>Köszönjük az érdeklődést!</h3><p>Hamarosan felvesszük Önnel a kapcsolatot.</p><button onClick={() => setSent(false)}>Új érdeklődés küldése</button></div> :
      <form className="form" onSubmit={submit}>
        <label><span>Név</span><input name="name" autoComplete="name" required placeholder="Az Ön neve"/></label>
        <label><span>E-mail-cím</span><input name="email" type="email" autoComplete="email" required placeholder="nev@pelda.hu"/></label>
        <label><span>Telefonszám</span><input name="phone" type="tel" autoComplete="tel" placeholder="+36 30 123 4567"/></label>
        <label><span>Érdeklődés tárgya</span><select name="interest" defaultValue=""><option value="" disabled>Válasszon</option><option>Saját otthon</option><option>Befektetési lehetőség</option><option>Általános tájékoztatás</option></select></label>
        <label className="consent"><input type="checkbox" required/><span>Elfogadom az adatkezelési tájékoztatót.</span></label>
        <button className="button gold" type="submit">Tájékoztatást kérek <span>→</span></button>
        <small>Az űrlap elkülönített, Supabase-kompatibilis adatmodellt használhat a következő integrációs fázisban.</small>
      </form>}
    </section>

    <section className="contact" id="kapcsolat">
      <Brand/><div><p className="kicker">Kapcsolat</p><a href="mailto:hello@marek5.hu">hello@marek5.hu</a><a href="tel:+36301234567">+36 30 123 4567</a></div><div><p className="kicker">Értékesítési pont</p><address>2900 Komárom<br/>Marek József utca 5.</address></div><a className="button dark" href="#erdeklodes">Időpontot kérek <span>→</span></a>
    </section>
    <footer><span>© 2026 Marek 5 Komárom</span><div><a href="#">Adatkezelés</a><a href="#">Impresszum</a></div><a href="#top">Vissza az elejére ↑</a></footer>
  </main>;
}
