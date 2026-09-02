'use client';

import { useEffect, useState, useRef } from 'react';
import {
  LogOut, Plus, Edit2, Trash2, Save, X, Upload, Image as ImageIcon,
  UtensilsCrossed, Grid3x3, Search, Lock, Loader2, RefreshCw, Check, Calendar,
} from 'lucide-react';
import ReservationsPanel, { useReservationsData } from '@/components/admin/ReservationsPanel';
import { Toaster } from '@/components/ui/sonner';

const CATS = [
  { id: 'entradas', label: 'Entradas' },
  { id: 'burratas', label: 'Burratas' },
  { id: 'massas', label: 'Massas Artesanais' },
  { id: 'risotos', label: 'Risotos' },
  { id: 'carnes', label: 'Carnes' },
  { id: 'pizzas', label: 'Pizzas' },
  { id: 'sobremesas', label: 'Sobremesas' },
  { id: 'vinhos', label: 'Vinhos' },
  { id: 'drinks', label: 'Drinks' },
];

const TAGS = ['', 'Popular', 'Chef', 'Novo', 'Casa'];

function useAuth() {
  const [token, setToken] = useState('');
  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('burrata_admin') : '';
    if (t) setToken(t);
  }, []);
  const login = async (password) => {
    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!r.ok) throw new Error('senha incorreta');
    const data = await r.json();
    localStorage.setItem('burrata_admin', data.token);
    setToken(data.token);
  };
  const logout = () => { localStorage.removeItem('burrata_admin'); setToken(''); };
  return { token, login, logout };
}

function apiCall(token) {
  return async (path, opts = {}) => {
    const r = await fetch(`/api/${path}`, {
      ...opts,
      headers: { 'Content-Type': 'application/json', 'x-admin-password': token, ...(opts.headers || {}) },
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  };
}

function Login({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(''); setLoading(true);
    try { await onLogin(pw); }
    catch { setErr('Senha incorreta'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-noir p-6">
      <form onSubmit={submit} className="glass rounded-3xl p-10 w-full max-w-md" style={{ borderColor: 'rgba(200,155,60,0.2)' }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#CDA95C] to-[#7A5E22]">
            <span className="font-display font-bold text-black text-lg">B</span>
          </div>
          <div>
            <div className="font-brand text-2xl text-white">Burrata</div>
            <div className="text-[10px] tracking-[0.3em] text-gold uppercase not-italic">Painel Admin</div>
          </div>
        </div>
        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Senha de administrador</label>
        <div className="relative">
          <Lock className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Digite a senha"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
        </div>
        {err && <div className="mt-3 text-red-400 text-sm">{err}</div>}
        <button disabled={loading} className="mt-6 w-full py-3.5 rounded-full btn-gold text-black font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Entrar
        </button>
        <p className="mt-6 text-center text-xs text-white/40">
          Configure a senha em <code className="text-gold">.env</code> como <code className="text-gold">ADMIN_PASSWORD</code>
        </p>
      </form>
    </div>
  );
}

function ImagePicker({ value, onChange }) {
  const fileRef = useRef(null);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) {
      alert('Imagem muito grande. Máximo 2MB. Tente comprimir em tinypng.com.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(f);
  };

  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-gold mb-2">Imagem</label>
      <div className="flex gap-3 items-start">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
          {value ? (
            <img src={value} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-white/20" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value?.startsWith('data:') ? '' : (value || '')}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Cole a URL de uma imagem (ex: do Instagram)"
            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:border-gold focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex-1 py-2 px-3 rounded-lg glass text-gold text-xs font-semibold inline-flex items-center justify-center gap-2 hover:bg-gold/10"
            >
              <Upload className="w-3.5 h-3.5" /> Enviar arquivo
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="py-2 px-3 rounded-lg glass text-red-400 text-xs inline-flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
        </div>
      </div>
    </div>
  );
}

function MenuEditor({ api }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/menu').then(r => r.json());
      setItems(r.items || []);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const empty = { cat: 'entradas', name: '', desc: '', price: '', img: '', tag: '', pair: '' };

  const save = async () => {
    try {
      if (editing.id) {
        await api(`menu/${editing.id}`, { method: 'PUT', body: JSON.stringify(editing) });
      } else {
        await api('menu', { method: 'POST', body: JSON.stringify(editing) });
      }
      setEditing(null);
      await load();
    } catch (e) { alert('Erro ao salvar: ' + e.message); }
  };

  const del = async (id) => {
    if (!confirm('Excluir este item do cardápio?')) return;
    await api(`menu/${id}`, { method: 'DELETE' });
    await load();
  };

  const filtered = items.filter(it => {
    const mc = filterCat === 'all' || it.cat === filterCat;
    const mq = !q || (it.name + ' ' + it.desc).toLowerCase().includes(q.toLowerCase());
    return mc && mq;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={() => setEditing({ ...empty })}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gold text-black font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Novo item
        </button>
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar item..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full glass text-white text-sm placeholder-white/40 focus:outline-none"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="px-4 py-2.5 rounded-full glass text-white text-sm focus:outline-none [color-scheme:dark]"
        >
          <option value="all">Todas categorias</option>
          {CATS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <span className="text-white/50 text-sm">{filtered.length} itens</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(it => (
            <div key={it.id} className="glass rounded-xl overflow-hidden">
              <div className="aspect-[16/10] bg-black/40 relative">
                {it.img && <img src={it.img} alt={it.name} className="w-full h-full object-cover" />}
                {it.tag && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gold text-black text-[10px] font-bold uppercase">{it.tag}</div>
                )}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 text-gold text-xs font-bold">{it.price}</div>
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-widest text-gold mb-1">{CATS.find(c => c.id === it.cat)?.label || it.cat}</div>
                <div className="text-white font-semibold text-sm mb-1">{it.name}</div>
                <div className="text-white/50 text-xs line-clamp-2 mb-3">{it.desc}</div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing({ ...it })} className="flex-1 py-1.5 rounded-lg glass text-gold text-xs inline-flex items-center justify-center gap-1 hover:bg-gold/10">
                    <Edit2 className="w-3 h-3" /> Editar
                  </button>
                  <button onClick={() => del(it.id)} className="py-1.5 px-3 rounded-lg glass text-red-400 text-xs inline-flex items-center gap-1">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass rounded-2xl w-full max-w-2xl p-6 my-8" style={{ borderColor: 'rgba(200,155,60,0.3)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-white">{editing.id ? 'Editar item' : 'Novo item'}</h3>
              <button onClick={() => setEditing(null)} className="w-9 h-9 rounded-full glass flex items-center justify-center"><X className="w-4 h-4 text-gold" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Nome do prato</label>
                <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold focus:outline-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Descrição</label>
                <textarea rows={3} value={editing.desc} onChange={e => setEditing({ ...editing, desc: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Categoria</label>
                <select value={editing.cat} onChange={e => setEditing({ ...editing, cat: e.target.value })} className="w-full px-3 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold focus:outline-none [color-scheme:dark]">
                  {CATS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Preço</label>
                <input value={editing.price} onChange={e => setEditing({ ...editing, price: e.target.value })} placeholder="R$ 42,90" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Badge</label>
                <select value={editing.tag || ''} onChange={e => setEditing({ ...editing, tag: e.target.value })} className="w-full px-3 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold focus:outline-none [color-scheme:dark]">
                  {TAGS.map(t => <option key={t} value={t}>{t || 'Sem badge'}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Harmoniza com</label>
                <input value={editing.pair || ''} onChange={e => setEditing({ ...editing, pair: e.target.value })} placeholder="ex: American IPA" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold focus:outline-none" />
              </div>
              <div className="col-span-2">
                <ImagePicker value={editing.img} onChange={(v) => setEditing({ ...editing, img: v })} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 py-3 rounded-full btn-gold text-black font-semibold inline-flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Salvar
              </button>
              <button onClick={() => setEditing(null)} className="px-6 py-3 rounded-full glass text-white/70">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryEditor({ api }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/gallery').then(r => r.json());
      setItems(r.items || []);
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!adding.src) { alert('Adicione uma imagem'); return; }
    await api('gallery', { method: 'POST', body: JSON.stringify(adding) });
    setAdding(null);
    await load();
  };

  const del = async (id) => {
    if (!confirm('Excluir esta imagem da galeria?')) return;
    await api(`gallery/${id}`, { method: 'DELETE' });
    await load();
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setAdding({ src: '', span: '' })} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gold text-black font-semibold text-sm">
          <Plus className="w-4 h-4" /> Nova imagem
        </button>
        <span className="text-white/50 text-sm">{items.length} imagens</span>
        <p className="text-white/40 text-xs">Dica: use “Alto” para imagens verticais (span 2 linhas) e crie composições interessantes.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map(it => (
            <div key={it.id} className="relative group rounded-xl overflow-hidden aspect-square glass">
              <img src={it.src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => del(it.id)} className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {it.span && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gold/90 text-black text-[10px] font-bold">Alto</div>
              )}
            </div>
          ))}
        </div>
      )}

      {adding && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass rounded-2xl w-full max-w-lg p-6" style={{ borderColor: 'rgba(200,155,60,0.3)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-white">Nova imagem da galeria</h3>
              <button onClick={() => setAdding(null)} className="w-9 h-9 rounded-full glass flex items-center justify-center"><X className="w-4 h-4 text-gold" /></button>
            </div>
            <div className="space-y-4">
              <ImagePicker value={adding.src} onChange={(v) => setAdding({ ...adding, src: v })} />
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold mb-2">Formato</label>
                <select value={adding.span} onChange={e => setAdding({ ...adding, span: e.target.value })} className="w-full px-3 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none [color-scheme:dark]">
                  <option value="">Padrão (quadrado)</option>
                  <option value="row-span-2">Alto (vertical, ocupa 2 linhas)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 py-3 rounded-full btn-gold text-black font-semibold inline-flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Adicionar
              </button>
              <button onClick={() => setAdding(null)} className="px-6 py-3 rounded-full glass text-white/70">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState('menu');
  const api = apiCall(token);
  const { pendingCount } = useReservationsData(token);

  const resetAll = async () => {
    if (!confirm('Restaurar cardápio e galeria para os dados originais? Todos os itens atuais serão apagados.')) return;
    try {
      await api('menu/reset', { method: 'POST' });
      alert('Restaurado com sucesso. A página será recarregada.');
      window.location.reload();
    } catch (e) { alert('Erro: ' + e.message); }
  };

  return (
    <div className="min-h-screen bg-noir">
      <Toaster theme="dark" position="top-right" richColors />
      <header className="sticky top-0 z-40 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#CDA95C] to-[#7A5E22]">
              <span className="font-display font-bold text-black">B</span>
            </div>
            <div>
              <div className="font-brand text-xl text-white">Burrata</div>
              <div className="text-[9px] tracking-[0.3em] text-gold uppercase not-italic">Painel Admin</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="hidden sm:inline-flex px-4 py-2 text-white/70 text-sm hover:text-gold">Ver site</a>
            <button onClick={resetAll} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/70 text-sm hover:text-gold">
              <RefreshCw className="w-3.5 h-3.5" /> Restaurar
            </button>
            <button onClick={onLogout} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/70 text-sm hover:text-red-400">
              <LogOut className="w-3.5 h-3.5" /> Sair
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-4 flex gap-2">
          {[
            { id: 'menu', label: 'Cardápio', icon: UtensilsCrossed },
            { id: 'gallery', label: 'Galeria', icon: Grid3x3 },
            { id: 'reservations', label: 'Reservas', icon: Calendar, badge: pendingCount },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                tab === t.id ? 'btn-gold text-black' : 'glass text-white/70 hover:text-gold'
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
              {!!t.badge && (
                <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold ${
                  tab === t.id ? 'bg-black/20 text-black' : 'bg-red-500 text-white'
                }`}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {tab === 'menu' && <MenuEditor api={api} />}
        {tab === 'gallery' && <GalleryEditor api={api} />}
        {tab === 'reservations' && <ReservationsPanel token={token} />}
      </main>
    </div>
  );
}

export default function AdminPage() {
  const { token, login, logout } = useAuth();
  if (!token) return <Login onLogin={login} />;
  return <Dashboard token={token} onLogout={logout} />;
}
