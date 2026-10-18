import { useMemo, useState } from 'react';
import { IonApp, IonIcon } from '@ionic/react';
import { searchOutline, arrowUpRight, closeOutline } from 'ionicons/icons';

const donations = [
  { id: 1, category: 'textos', name: 'pixzeiro_01', amount: 'R$ 2,00', message: 'Sua gameplay é igual boleto: ninguém gosta, mas todo mundo acompanha.', tag: 'PIADA' },
  { id: 2, category: 'textos', name: 'mãe_do_chat', amount: 'R$ 5,00', message: 'Minha vó perguntou se você trabalha. Eu disse que está tentando.', tag: 'PIADA' },
  { id: 3, category: 'textos', name: 'sem_contexto', amount: 'R$ 1,50', message: 'O único drop que você dá é o FPS.', tag: 'PIADA' },
  { id: 4, category: 'textos', name: 'cafe_frio', amount: 'R$ 3,33', message: 'Jogue como se alguém estivesse assistindo. Porque eu estou, infelizmente.', tag: 'PIADA' },
  { id: 5, category: 'spans', name: 'zZz_do_pix', amount: 'R$ 1,00', message: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', tag: 'ZZZZZ' },
  { id: 6, category: 'spans', name: 'sono_online', amount: 'R$ 2,22', message: 'zzZ ZZZ zzzzzzzzzzzzzzzzzzzzzzzzzzzzz', tag: 'ZZZZZ' },
  { id: 7, category: 'spans', name: 'dormindo_aqui', amount: 'R$ 4,00', message: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', tag: 'ZZZZZ' },
  { id: 8, category: 'spans', name: 'insônia.exe', amount: 'R$ 1,11', message: 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', tag: 'ZZZZZ' },
  { id: 9, category: 'numeros', name: 'teclado_preso', amount: 'R$ 1,11', message: '111111111111111111111111111111111111', tag: 'NÚMEROS' },
  { id: 10, category: 'numeros', name: 'bot_humano', amount: 'R$ 2,00', message: '123456789 123456789 123456789', tag: 'NÚMEROS' },
  { id: 11, category: 'numeros', name: 'conta_ate_10', amount: 'R$ 3,21', message: '7 7 7 7 7 7 7 7 7 7 7 7 7', tag: 'NÚMEROS' },
  { id: 12, category: 'numeros', name: 'numero_misterioso', amount: 'R$ 9,99', message: '404 404 404 404 404 404', tag: 'NÚMEROS' }
];

const categories = [
  { id: 'textos', label: 'Textos', subtitle: 'Piadas e indiretas', symbol: 'Aa', description: 'Mensagens prontas para deixar o streamer sem resposta.' },
  { id: 'spans', label: 'Spans', subtitle: 'O lendário zzzzz', symbol: 'Zz', description: 'Um monte de caracteres repetidos. O chat nunca mais será o mesmo.' },
  { id: 'numeros', label: 'Números', subtitle: '111111 e afins', symbol: '123', description: 'Sequências sem contexto para testar a paciência de qualquer live.' }
];

function DonateCard({ item }) {
  return <article className="donate-card">
    <div className="donate-top">
      <div className="avatar">{item.name.slice(0, 1).toUpperCase()}</div>
      <div className="donor"><strong>{item.name}</strong><span>{item.tag}</span></div>
      <b className="amount">{item.amount}</b>
    </div>
    <p>{item.message}</p>
    <div className="card-bottom"><span className={`category-dot ${item.category}`}></span> Donate de exemplo <span className="card-id">#{String(item.id).padStart(3, '0')}</span></div>
  </article>;
}

function SearchModal({ query, setQuery, category, setCategory, onClose }) {
  const results = useMemo(() => donations.filter(item => {
    const categoryMatch = category === 'todos' || item.category === category;
    const q = query.trim().toLocaleLowerCase('pt-BR');
    return categoryMatch && (!q || `${item.name} ${item.message} ${item.amount} ${item.tag} ${item.id}`.toLocaleLowerCase('pt-BR').includes(q));
  }), [query, category]);

  return <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <section className="search-modal" role="dialog" aria-modal="true" aria-label="Pesquisar donates">
      <div className="modal-heading"><div><span className="eyebrow">CENTRAL DE PESQUISA</span><h2>Encontre o caos.</h2></div><button className="icon-button" onClick={onClose} aria-label="Fechar"><IonIcon icon={closeOutline}/></button></div>
      <label className="modal-search"><IonIcon icon={searchOutline}/><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Busque por nome, texto ou número..." /><kbd>ESC</kbd></label>
      <div className="filter-row">{[['todos', 'Todos'], ['textos', 'Textos'], ['spans', 'Spans'], ['numeros', 'Números']].map(([id, label]) => <button key={id} className={`filter-chip ${category === id ? 'active' : ''}`} onClick={() => setCategory(id)}>{label}</button>)}</div>
      <div className="results-meta"><span>{results.length} resultado{results.length === 1 ? '' : 's'}</span><span>DONATES DA COMUNIDADE</span></div>
      <div className="search-results">{results.map(item => <DonateCard key={item.id} item={item}/>)}{!results.length && <div className="empty-state"><span>¯\\_(ツ)_/¯</span><strong>Nenhum donate encontrado</strong><p>Tente outra palavra ou mude o filtro.</p></div>}</div>
      <div className="modal-foot"><span>Pesquise por nome, mensagem, categoria ou número.</span><button onClick={onClose}>Fechar pesquisa ↵</button></div>
    </section>
  </div>;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('todos');
  const openSearch = () => setSearchOpen(true);

  return <IonApp>
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio"><span className="brand-mark"><i/><i/><i/><i/></span><span>CÂMERA<span className="brand-blue"> DO PIX</span></span></a>
        <nav className="main-nav"><a href="#como-funciona">Como funciona</a><a href="#categorias">Categorias</a><a href="#contribua">Contribua</a></nav>
        <button className="header-search" onClick={openSearch}><IonIcon icon={searchOutline}/><span>Buscar donates...</span><kbd>/</kbd></button>
        <button className="mobile-search" onClick={openSearch} aria-label="Buscar"><IonIcon icon={searchOutline}/></button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-image"></div><div className="hero-grid"></div>
          <div className="hero-content">
            <div className="live-pill"><span/> A CENTRAL DO CAOS AO VIVO</div>
            <h1>CÂMERA<br/>DO <em>PIX.</em></h1>
            <p className="hero-description">Um ladrão com vários inscritos.</p>
            <p className="hero-subcopy">O lugar onde R$ 1,00 compra o direito de atrapalhar a live. Com carinho, claro.</p>
            <div className="hero-actions"><button className="button-primary" onClick={openSearch}>Explorar donates <IonIcon icon={arrowUpRight}/></button><a className="button-quiet" href="#categorias">Conhecer categorias <span>↓</span></a></div>
            <div className="hero-stats"><div><strong>12<span>+</span></strong><small>DONATES DE EXEMPLO</small></div><div><strong>03</strong><small>CATEGORIAS DE CAOS</small></div><div><strong>100<span>%</span></strong><small>SEM CONTEXTO</small></div></div>
          </div>
          <div className="hero-stamp"><span>PIX</span><strong>CAOS<br/>CONTROLADO</strong><span>R$ 1,00 ↗</span></div>
          <div className="hero-bottom"><span>UM PIX. UMA LIVE. VÁRIAS CONSEQUÊNCIAS.</span><span>SCROLL PARA VER ↓</span></div>
        </section>

        <section className="intro section-wrap" id="como-funciona">
          <div className="section-label"><span>01 / MANUAL DO CAOS</span><span>SEM JULGAMENTOS (TALVEZ)</span></div>
          <div className="intro-grid"><div><h2>O que é a<br/><span>Câmera do Pix?</span></h2></div><div className="intro-copy"><p>É um catálogo de donates para aloprar os streamers. Você encontra mensagens, números sem sentido e spans intermináveis para transformar qualquer transmissão em um evento inesquecível.</p><p className="muted">A ideia é simples: criatividade no texto, caos no chat e o streamer tentando entender o que acabou de acontecer.</p><a className="text-link" href="#categorias">Explorar as categorias <span>↗</span></a></div></div>
        </section>

        <section className="categories-section section-wrap" id="categorias">
          <div className="section-label"><span>02 / ESCOLHA SUA ARMA</span><span>TRÊS FORMAS DE CAUSAR</span></div>
          <div className="section-title-row"><h2>Caos em<br/><span>três formatos.</span></h2><p>Escolha a categoria e encontre o donate perfeito para o momento errado.</p></div>
          <div className="category-grid">{categories.map((item, index) => <article className={`category-card ${item.id}`} key={item.id}><div className="category-top"><span>0{index + 1} / CATEGORIA</span><span>↗</span></div><div className="category-symbol">{item.symbol}</div><h3>{item.label}</h3><p className="category-subtitle">{item.subtitle}</p><p className="category-description">{item.description}</p><button onClick={() => { setCategory(item.id); setSearchOpen(true); }}>Ver donates <span>↗</span></button></article>)}</div>
        </section>

        <section className="examples-section section-wrap" id="exemplos">
          <div className="section-label"><span>03 / MATERIAL DE CAMPO</span><span>EXEMPLOS PARA COMEÇAR</span></div>
          <div className="section-title-row"><h2>O caos já vem<br/><span>pré-escrito.</span></h2><button className="outline-button" onClick={openSearch}><IonIcon icon={searchOutline}/> Buscar todos os donates</button></div>
          {categories.map(item => <div className="example-group" key={item.id}><div className="example-heading"><div><span className="mini-index">{item.symbol}</span><h3>{item.label}</h3></div><button onClick={() => { setCategory(item.id); setSearchOpen(true); }}>Ver todos ↗</button></div><div className="donate-grid">{donations.filter(d => d.category === item.id).map(d => <DonateCard key={d.id} item={d}/>)}</div></div>)}
        </section>

        <section className="contribute-section section-wrap" id="contribua">
          <div className="contribute-panel"><div className="section-label"><span>04 / A COMUNIDADE MANDA</span><span>SEU CAOS É BEM-VINDO</span></div><div className="contribute-content"><div><h2>Tem uma ideia<br/>questionável?</h2><p>Contribua com código, sugira novos donates ou ajude a deixar esse catálogo ainda mais caótico. Boas ideias e piadas ruins são igualmente bem-vindas.</p></div><div className="contribute-actions"><a className="button-primary" href="https://github.com/jej3zin/CamaraDoPix" target="_blank" rel="noreferrer">Contribuir com código <IonIcon icon={arrowUpRight}/></a><a className="button-secondary" href="https://github.com/jej3zin/CamaraDoPix/issues/new" target="_blank" rel="noreferrer">Enviar uma sugestão <IonIcon icon={arrowUpRight}/></a><span>Projeto comunitário · sugestões são bem-vindas</span></div></div><div className="contribute-glow"/></div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand" href="#inicio"><span className="brand-mark"><i/><i/><i/><i/></span><span>CÂMERA<span className="brand-blue"> DO PIX</span></span></a><span>Um ladrão com vários inscritos.</span><a href="https://github.com/jej3zin/CamaraDoPix" target="_blank" rel="noreferrer">Feito para a comunidade ↗</a><span className="copyright">© 2026 CÂMERA DO PIX</span></footer>
      {searchOpen && <SearchModal query={query} setQuery={setQuery} category={category} setCategory={setCategory} onClose={() => setSearchOpen(false)}/>}
    </div>
  </IonApp>;
}