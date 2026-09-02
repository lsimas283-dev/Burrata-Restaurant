'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import {
  UtensilsCrossed, Pizza, Beef, Cookie, Cake, Flame, MapPin, Phone, Clock,
  Instagram, MessageCircle, Star, ChevronUp, Menu, X, Award, Users, Sparkles,
  Calendar, Mail, User, ChevronRight, ArrowRight, Send, Search, Wine, GlassWater, ChefHat, Leaf,
} from 'lucide-react';
import { IMAGES, CATEGORY_IMAGES } from '@/config/images';

const IMG = {
  hero: IMAGES.hero,
  ambience1: IMAGES.ambiente[0],
  ambience2: IMAGES.ambiente[1],
  ambience3: IMAGES.ambiente[2],
  burrata1: IMAGES.pratos.ravioliDeBurrata,
  massa1: IMAGES.pratos.ravioliDeBurrata,
  risoto1: IMAGES.pratos.paletaAoAcafrao,
  carne1: IMAGES.pratos.paletaAoAcafrao,
  pizza1: CATEGORY_IMAGES.pizzas,
  sobremesa1: IMAGES.pratos.detalhe,
  vinho1: IMAGES.vinhos,
  vinho2: IMAGES.ambiente[3],
  drink1: IMAGES.drinks,
};

const WHATS = '5521975372420';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#vinhos', label: 'Vinhos & Drinks' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#contato', label: 'Contato' },
];

function Logo({ size = 'nav' }) {
  const dims = size === 'nav' ? 'w-11 h-11 text-lg' : 'w-11 h-11 text-lg';
  return (
    <div className="flex items-center gap-3">
      <div className={`${dims} rounded-full flex items-center justify-center bg-gradient-to-br from-[#CDA95C] to-[#7A5E22] shadow-lg shadow-[#A9812E]/30 shrink-0`}>
        <span className="font-display font-bold text-black">B</span>
      </div>
      <div className="leading-tight">
        <div className="font-brand text-2xl text-white">Burrata</div>
        <div className="text-[10px] tracking-[0.3em] text-gold uppercase not-italic">Empório &amp; Bistrô</div>
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="group">
          <Logo />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="px-4 py-2 text-sm font-medium text-white/80 hover:text-gold transition-colors relative group">
              {l.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#contato" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gold text-black font-semibold text-sm hover:scale-105 transition-transform">
            <Calendar className="w-4 h-4" /> Reservar
          </a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="lg:hidden w-11 h-11 rounded-full glass flex items-center justify-center">
            {open ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5 text-gold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden overflow-hidden glass mt-3 mx-4 rounded-2xl">
            <div className="flex flex-col p-4">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 px-4 text-white/90 hover:text-gold border-b border-white/5 last:border-0">{l.label}</a>
              ))}
              <a href="#contato" onClick={() => setOpen(false)} className="mt-3 text-center py-3 rounded-full btn-gold text-black font-semibold">Reservar Agora</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-[100vh] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 grain">
        <img src={IMG.hero} alt="Burrata – Empório & Bistrô" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full glass">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-xs md:text-sm tracking-[0.25em] text-gold uppercase font-medium">Teresópolis · Rio de Janeiro</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] max-w-6xl">
          Alta gastronomia italiana<br />
          em um ambiente <span className="text-gradient-gold italic">aconchegante</span>.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-8 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
          Massas artesanais, risotos, burratas e carnes nobres, harmonizados por uma carta de <span className="text-gold font-semibold">vinhos selecionada</span>, no Alto de Teresópolis.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }} className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="#contato" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full btn-gold text-black font-semibold text-base hover:scale-105 transition-transform shadow-2xl">
            <Calendar className="w-5 h-5" /> Reservar Mesa
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#cardapio" className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass text-white font-semibold text-base hover:bg-gold/10 transition-colors" style={{ borderColor: 'rgba(169,129,46,0.4)' }}>
            <UtensilsCrossed className="w-5 h-5 text-gold" /> Ver Cardápio
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] tracking-[0.3em] uppercase">Role para descobrir</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronRight className="w-5 h-5 rotate-90 text-gold" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-14`}>
      {eyebrow && (
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 mb-4">
          <span className="h-px w-8 bg-gold" />
          <span className="text-xs tracking-[0.35em] uppercase text-gold font-semibold">{eyebrow}</span>
          <span className="h-px w-8 bg-gold" />
        </motion.div>
      )}
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-5 text-white/70 text-lg leading-relaxed">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function About() {
  const highlights = [
    { icon: Leaf, text: 'Inspirado na cozinha italiana' },
    { icon: Wine, text: 'Carta de vinhos selecionada' },
    { icon: Award, text: 'Excelente atendimento' },
    { icon: Users, text: 'Ambiente pet friendly' },
    { icon: MapPin, text: 'Alto de Teresópolis' },
  ];
  return (
    <section id="sobre" className="relative py-28 bg-noir overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(110,31,43,0.10)' }} />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-gold/20 to-transparent rounded-3xl blur-xl" />
          <img src={IMG.ambience1} alt="Ambiente Burrata" className="relative rounded-2xl w-full h-[560px] object-cover shadow-2xl" />
          <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-6 hidden md:block" style={{ borderColor: 'rgba(169,129,46,0.4)' }}>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center">
                <Star className="w-6 h-6 text-black fill-black" />
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-white">4.7<span className="text-gold">/5</span></div>
                <div className="text-xs text-white/60 tracking-wider uppercase">+1.000 avaliações</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionTitle eyebrow="Nossa História" title="Conheça o Burrata" subtitle="Um empório e bistrô pensado para quem ama a boa mesa: massas artesanais, risotos cremosos e uma carta de vinhos cuidadosamente escolhida, servidos em um ambiente elegante e ao mesmo tempo acolhedor, no Alto de Teresópolis." center={false} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="flex items-center gap-3 p-4 rounded-xl bg-charcoal/60 border border-white/5 hover:border-gold/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <h.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-white/85 text-sm font-medium">{h.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Specialties() {
  const items = [
    { icon: UtensilsCrossed, title: 'Massas Artesanais', desc: 'Feitas na casa, dia após dia.' },
    { icon: Sparkles, title: 'Burratas', desc: 'Cremosas, servidas de formas variadas.' },
    { icon: ChefHat, title: 'Risotos', desc: 'No ponto certo, com sabor intenso.' },
    { icon: Beef, title: 'Carnes Nobres', desc: 'Cortes selecionados, preparo impecável.' },
    { icon: Pizza, title: 'Pizzas Artesanais', desc: 'Massa fina, ingredientes de qualidade.' },
    { icon: Wine, title: 'Carta de Vinhos', desc: 'Rótulos italianos e do Novo Mundo.' },
  ];
  return (
    <section id="especialidades" className="py-28 bg-gradient-to-b from-noir via-[#221d16] to-noir">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Especialidades" title="Um cardápio que conta histórias" subtitle="Da primeira burrata à última taça de vinho, cada prato é preparado para tornar sua visita inesquecível." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.08, duration: 0.6 }} className="group relative p-8 rounded-2xl bg-charcoal border border-white/5 hover:border-gold/50 transition-all duration-500 overflow-hidden">
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-gold/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#CDA95C] to-[#7A5E22] flex items-center justify-center mb-6 shadow-lg shadow-gold/20 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <it.icon className="w-8 h-8 text-black" strokeWidth={2} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-2">{it.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{it.desc}</p>
                <div className="mt-6 h-px w-12 bg-gold/40 group-hover:w-20 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MENU_CATEGORIES = [
  { id: 'all', label: 'Todos', icon: Sparkles },
  { id: 'entradas', label: 'Entradas', icon: Cookie },
  { id: 'burratas', label: 'Burratas', icon: Sparkles },
  { id: 'massas', label: 'Massas Artesanais', icon: UtensilsCrossed },
  { id: 'risotos', label: 'Risotos', icon: ChefHat },
  { id: 'carnes', label: 'Carnes', icon: Beef },
  { id: 'pizzas', label: 'Pizzas', icon: Pizza },
  { id: 'sobremesas', label: 'Sobremesas', icon: Cake },
];

const MENU_ITEMS = [
  // ENTRADAS
  { cat: 'entradas', name: 'Burrata com Sorbet de Tomate e Parma', desc: 'Burrata cremosa acompanhada de sorbet de tomate e fatias de presunto Parma.', price: 'R$ 74,90', img: IMG.burrata1, tag: 'Chef', pair: 'Prosecco' },
  { cat: 'entradas', name: 'Bruschetta Tradizionale', desc: 'Pão rústico tostado com tomates frescos, manjericão e azeite extravirgem.', price: 'R$ 45,90', img: IMG.ambience3, pair: 'Pinot Grigio' },
  { cat: 'entradas', name: 'Carpaccio di Manzo', desc: 'Finas fatias de filé mignon, lascas de parmesão, alcaparras e rúcula.', price: 'R$ 68,90', img: IMG.carne1, pair: 'Chianti Classico' },
  { cat: 'entradas', name: 'Tábua de Frios Italiana', desc: 'Seleção de embutidos e queijos italianos, geleias e torradas.', price: 'R$ 89,90', img: IMG.burrata1, tag: 'Popular', pair: 'Primitivo di Manduria' },

  // BURRATAS
  { cat: 'burratas', name: 'Burrata Clássica com Tomates Confit', desc: 'Burrata fresca sobre tomates confitados, manjericão e azeite de manjericão.', price: 'R$ 69,90', img: IMG.burrata1, tag: 'Casa', pair: 'Pinot Grigio' },
  { cat: 'burratas', name: 'Burrata com Presunto Parma e Rúcula', desc: 'Burrata acompanhada de presunto Parma, rúcula selvagem e redução de balsâmico.', price: 'R$ 79,90', img: IMG.burrata1, tag: 'Popular', pair: 'Prosecco' },
  { cat: 'burratas', name: 'Burrata com Pesto e Nozes', desc: 'Burrata cremosa com pesto genovese, nozes tostadas e torradas artesanais.', price: 'R$ 72,90', img: IMG.burrata1, pair: 'Chianti Classico' },

  // MASSAS ARTESANAIS
  { cat: 'massas', name: 'Agnolotti de Cordeiro', desc: 'Massa artesanal recheada com cordeiro braseado, servida ao molho de ervas.', price: 'R$ 89,90', img: IMG.massa1, tag: 'Chef', pair: 'Primitivo di Manduria' },
  { cat: 'massas', name: 'Ravioli de Muçarela', desc: 'Ravioli artesanal recheado com muçarela de búfala e molho de tomate da casa.', price: 'R$ 74,90', img: IMG.massa1, tag: 'Popular', pair: 'Chianti Classico' },
  { cat: 'massas', name: 'Ravioli de Espinafre e Ricota', desc: 'Massa fresca recheada com espinafre e ricota, ao molho de manteiga e sálvia.', price: 'R$ 76,90', img: IMG.massa1, pair: 'Pinot Grigio' },
  { cat: 'massas', name: 'Tagliatelle ao Ragù', desc: 'Tagliatelle artesanal com ragù de carnes lentamente cozido, à moda tradicional.', price: 'R$ 82,90', img: IMG.massa1, tag: 'Casa', pair: 'Chianti Classico' },

  // RISOTOS
  { cat: 'risotos', name: 'Risoto Nero com Frutos do Mar', desc: 'Risoto ao negro de tinta de lula, com frutos do mar selecionados.', price: 'R$ 98,90', img: IMG.risoto1, tag: 'Chef', pair: 'Pinot Grigio' },
  { cat: 'risotos', name: 'Risoto do Chef', desc: 'Criação especial do chef, com ingredientes sazonais e finalização em parmesão.', price: 'R$ 94,90', img: IMG.risoto1, tag: 'Popular', pair: 'Chianti Classico' },
  { cat: 'risotos', name: 'Risoto de Cogumelos Porcini', desc: 'Risoto cremoso com cogumelos porcini e um toque de trufa.', price: 'R$ 96,90', img: IMG.risoto1, pair: 'Primitivo di Manduria' },

  // CARNES
  { cat: 'carnes', name: 'Filé Argentino com Batatas', desc: 'Filé mignon argentino grelhado no ponto, acompanhado de batatas rústicas.', price: 'R$ 139,90', img: IMG.carne1, tag: 'Chef', pair: 'Primitivo di Manduria' },
  { cat: 'carnes', name: 'Osso Buco à Milanesa', desc: 'Ossobuco braseado lentamente, servido com risoto de açafrão.', price: 'R$ 128,90', img: IMG.carne1, pair: 'Chianti Classico' },
  { cat: 'carnes', name: 'Costela Braseada ao Vinho Tinto', desc: 'Costela bovina braseada por horas em redução de vinho tinto e ervas.', price: 'R$ 118,90', img: IMG.carne1, tag: 'Popular', pair: 'Primitivo di Manduria' },

  // PIZZAS
  { cat: 'pizzas', name: 'Margherita', desc: 'Molho de tomate, muçarela de búfala, manjericão fresco e azeite extravirgem.', price: 'R$ 64,90', img: IMG.pizza1, tag: 'Casa', pair: 'Prosecco' },
  { cat: 'pizzas', name: 'Quattro Formaggi', desc: 'Combinação de quatro queijos italianos sobre massa fina e crocante.', price: 'R$ 72,90', img: IMG.pizza1, tag: 'Popular', pair: 'Chianti Classico' },
  { cat: 'pizzas', name: 'Prosciutto e Rúcula', desc: 'Presunto Parma, rúcula fresca, lascas de parmesão e azeite trufado.', price: 'R$ 78,90', img: IMG.pizza1, tag: 'Chef', pair: 'Pinot Grigio' },

  // SOBREMESAS
  { cat: 'sobremesas', name: 'Suflê de Chocolate Quente com Sorvete', desc: 'Suflê de chocolate quente com centro cremoso, servido com sorvete de creme.', price: 'R$ 42,90', img: IMG.sobremesa1, tag: 'Chef', pair: '' },
  { cat: 'sobremesas', name: 'Romeu e Julieta à Moda Burrata', desc: 'Releitura do clássico com queijo e goiabada artesanal.', price: 'R$ 36,90', img: IMG.sobremesa1, tag: 'Popular', pair: '' },
  { cat: 'sobremesas', name: 'Tiramisù della Casa', desc: 'A clássica sobremesa italiana, preparada com receita tradicional da casa.', price: 'R$ 38,90', img: IMG.sobremesa1, tag: 'Casa', pair: '' },
];

const WINE_DRINK_ITEMS = [
  { cat: 'vinhos', name: 'Chianti Classico DOCG', desc: 'Tinto italiano encorpado, notas de frutas vermelhas e especiarias.', price: 'R$ 42,90 (taça) / R$ 189,90 (garrafa)', img: IMG.vinho1 },
  { cat: 'vinhos', name: 'Pinot Grigio', desc: 'Branco leve e fresco, ideal para acompanhar massas e frutos do mar.', price: 'R$ 38,90 (taça) / R$ 169,90 (garrafa)', img: IMG.vinho2 },
  { cat: 'vinhos', name: 'Primitivo di Manduria', desc: 'Tinto encorpado do sul da Itália, com notas de frutas maduras.', price: 'R$ 46,90 (taça) / R$ 209,90 (garrafa)', img: IMG.vinho1 },
  { cat: 'vinhos', name: 'Prosecco', desc: 'Espumante italiano leve e frisante, perfeito para começar a refeição.', price: 'R$ 39,90 (taça) / R$ 179,90 (garrafa)', img: IMG.vinho2 },
  { cat: 'drinks', name: 'Aperol Spritz', desc: 'O clássico aperitivo italiano: Aperol, prosecco e água com gás.', price: 'R$ 42,90', img: IMG.drink1 },
  { cat: 'drinks', name: 'Negroni', desc: 'Gin, vermute e Campari em partes iguais, servido com uma casca de laranja.', price: 'R$ 44,90', img: IMG.drink1 },
  { cat: 'drinks', name: 'Bellini', desc: 'Prosecco e purê de pêssego, um clássico veneziano.', price: 'R$ 39,90', img: IMG.drink1 },
];

function BestSellers() {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [items, setItems] = useState(MENU_ITEMS);

  useEffect(() => {
    fetch('/api/menu')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.items) && d.items.length) setItems(d.items); })
      .catch(() => {});
  }, []);

  const filtered = items.filter(it => {
    const matchCat = cat === 'all' || it.cat === cat;
    const matchQ = !q || (it.name + ' ' + it.desc).toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  const tagStyle = (t) => {
    if (t === 'Chef') return 'bg-gradient-to-r from-[#6E1F2B] to-[#8E2B3A] text-white';
    if (t === 'Popular') return 'bg-gold text-black';
    if (t === 'Novo') return 'bg-emerald-600 text-white';
    if (t === 'Casa') return 'bg-white text-black';
    return 'bg-gold text-black';
  };

  const tagIcon = (t) => {
    if (t === 'Chef') return <ChefHat className="w-3 h-3" strokeWidth={2.5} />;
    if (t === 'Popular') return <Flame className="w-3 h-3" strokeWidth={2.5} />;
    return <Sparkles className="w-3 h-3" strokeWidth={2.5} />;
  };

  return (
    <section id="cardapio" className="py-28 bg-noir relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionTitle
          eyebrow="Cardápio Completo"
          title="O menu do Burrata"
          subtitle="Cada prato é preparado com cuidado. Das entradas às sobremesas, tudo pensado para a melhor experiência gastronômica italiana de Teresópolis."
        />

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-gold absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar prato, massa, vinho..."
              className="w-full pl-14 pr-5 py-4 rounded-full glass text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {MENU_CATEGORIES.map((c) => {
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  active
                    ? 'btn-gold text-black shadow-lg scale-105'
                    : 'glass text-white/80 hover:text-gold hover:scale-105'
                }`}
              >
                <c.icon className="w-4 h-4" />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Items grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/50">
            <Search className="w-12 h-12 mx-auto mb-4 text-gold/40" />
            <p>Nenhum item encontrado. Tente outra busca.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((it, i) => (
                <motion.article
                  layout
                  key={`${cat}-${it.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                  className="group relative rounded-2xl overflow-hidden bg-charcoal border border-white/5 hover:border-gold/50 transition-all duration-500 flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={it.img}
                      alt={it.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    {it.tag && (
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1.5 shadow-lg ${tagStyle(it.tag)}`}>
                        {tagIcon(it.tag)} {it.tag}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur text-gold font-bold text-sm">
                      {it.price}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-semibold text-white leading-tight mb-2">{it.name}</h3>
                    <p className="text-white/60 text-xs leading-relaxed mb-4 flex-1">{it.desc}</p>

                    {it.pair && (
                      <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-gold/5 border border-gold/20">
                        <Wine className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span className="text-[11px] text-white/70">
                          Harmoniza com <span className="text-gold font-semibold">{it.pair}</span>
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => window.open(`https://wa.me/${WHATS}?text=Ol%C3%A1!%20Quero%20pedir%20${encodeURIComponent(it.name)}%20-%20${encodeURIComponent(it.price)}`, '_blank')}
                      className="w-full py-2.5 rounded-full text-sm font-semibold btn-gold text-black inline-flex items-center justify-center gap-2 hover:scale-[1.03] transition-transform"
                    >
                      <MessageCircle className="w-4 h-4" /> Pedir via WhatsApp
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="mt-16 text-center">
          <p className="text-white/50 text-sm mb-4">
            Preços podem sofrer alterações. Confira o cardápio completo pelo WhatsApp.
          </p>
          <a
            href={`https://wa.me/${WHATS}?text=Ol%C3%A1!%20Gostaria%20do%20card%C3%A1pio%20completo.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-gold font-semibold hover:bg-gold/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Ver cardápio completo
          </a>
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix, label, delay }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.floor(p * value));
      if (p < 1) requestAnimationFrame(step);
    };
    const to = setTimeout(() => requestAnimationFrame(step), delay * 1000);
    return () => clearTimeout(to);
  }, [inView, value, delay]);
  return (
    <div ref={ref} className="glass rounded-2xl p-6 text-center" style={{ borderColor: 'rgba(169,129,46,0.2)' }}>
      <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">{n}{suffix}</div>
      <div className="mt-1 text-[11px] tracking-[0.3em] uppercase text-white/60">{label}</div>
    </div>
  );
}

function WineAndDrinks() {
  const stats = [
    { value: 40, suffix: '+', label: 'Rótulos' },
    { value: 5, suffix: '', label: 'Países' },
    { value: 8, suffix: '', label: 'Drinks autorais' },
    { value: 4.7, suffix: '', label: 'Nota Google' },
  ];
  const categories = [
    { title: 'Tintos Italianos', desc: 'Chianti, Primitivo e outros clássicos da bota.', img: IMG.vinho1 },
    { title: 'Brancos & Espumantes', desc: 'Pinot Grigio e Prosecco para acompanhar a refeição.', img: IMG.vinho2 },
    { title: 'Aperitivos', desc: 'Aperol Spritz, Negroni e criações autorais.', img: IMG.drink1 },
    { title: 'Curadoria do Sommelier', desc: 'Recomendações harmonizadas com o cardápio.', img: IMG.ambience3 },
  ];
  return (
    <section id="vinhos" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.ambience2} className="w-full h-full object-cover opacity-25" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir via-noir/95 to-noir" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Vinhos & Drinks" title="Uma carta pensada para harmonizar." subtitle="Da primeira taça ao último brinde: uma seleção cuidadosa para acompanhar cada prato." />

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative">
            <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full" />
            <img src={IMG.vinho1} alt="Vinhos" className="relative rounded-3xl w-full h-[520px] object-cover shadow-2xl animate-float-slow" />
          </motion.div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (<Counter key={i} {...s} delay={i * 0.1} />))}
            </div>
            <p className="mt-8 text-white/70 leading-relaxed">
              Nossa carta reúne rótulos italianos e do Novo Mundo, escolhidos para harmonizar com massas, risotos e carnes. Além dos vinhos, uma seleção de drinks clássicos italianos completa a experiência.
            </p>
            <a href="#contato" className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full btn-gold text-black font-semibold text-sm hover:scale-105 transition-transform">
              <Wine className="w-4 h-4" /> Reservar Degustação
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/5 hover:border-gold/50 transition-colors">
              <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="font-display text-2xl font-semibold text-white mb-1">{c.title}</h4>
                <p className="text-white/70 text-xs leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WINE_DRINK_ITEMS.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: (i % 4) * 0.08, duration: 0.6 }} className="rounded-2xl overflow-hidden bg-charcoal border border-white/5 hover:border-gold/50 transition-colors">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={it.img} alt={it.name} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="p-5">
                <h4 className="font-display text-lg font-semibold text-white mb-1">{it.name}</h4>
                <p className="text-white/60 text-xs leading-relaxed mb-3">{it.desc}</p>
                <div className="text-gold font-bold text-sm">{it.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const defaults = [
    { src: IMG.ambience1, span: 'row-span-2' },
    { src: IMG.massa1, span: '' },
    { src: IMG.vinho1, span: '' },
    { src: IMG.ambience3, span: 'row-span-2' },
    { src: IMG.pizza1, span: '' },
    { src: IMG.risoto1, span: '' },
    { src: IMG.carne1, span: 'row-span-2' },
    { src: IMG.burrata1, span: '' },
    { src: IMG.vinho2, span: '' },
    { src: IMG.ambience2, span: '' },
    { src: IMG.sobremesa1, span: '' },
    { src: IMG.drink1, span: '' },
  ];
  const [imgs, setImgs] = useState(defaults);

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.items) && d.items.length) setImgs(d.items); })
      .catch(() => {});
  }, []);

  return (
    <section id="galeria" className="py-28 bg-noir">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Galeria" title="Um passeio pelo Burrata" subtitle="Cliques da cozinha, do salão e da nossa gente." />
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
          {imgs.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: (i % 6) * 0.06, duration: 0.6 }} className={`relative group overflow-hidden rounded-xl ${it.span}`}>
              <img src={it.src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { name: 'Bruno Costa', avatar: 'BC', color: 'from-amber-400 to-yellow-700', text: 'Massas artesanais impecáveis e um ambiente muito aconchegante. Vale muito a pena a visita!', rating: 5 },
    { name: 'Mariana Silva', avatar: 'MS', color: 'from-rose-400 to-pink-800', text: 'Excelente atendimento e uma carta de vinhos muito bem escolhida. Voltarei com certeza.', rating: 5 },
    { name: 'Carlos Ferreira', avatar: 'CF', color: 'from-emerald-500 to-teal-800', text: 'Os risotos são incríveis e o ambiente é elegante sem perder o aconchego.', rating: 5 },
    { name: 'Ana Beatriz', avatar: 'AB', color: 'from-sky-400 to-indigo-800', text: 'Lugar lindo, pet friendly, e as pizzas são deliciosas. Recomendo muito!', rating: 4 },
    { name: 'Rafael Mendes', avatar: 'RM', color: 'from-orange-400 to-red-800', text: 'Melhores burratas de Teresópolis. Ambiente único e serviço atencioso.', rating: 5 },
    { name: 'Patrícia Rocha', avatar: 'PR', color: 'from-purple-400 to-violet-800', text: 'Fomos em família e adoramos. Comida deliciosa e atendimento nota 10.', rating: 5 },
  ];
  return (
    <section id="avaliacoes" className="py-28 bg-gradient-to-b from-noir to-[#141110]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Google Reviews" title="O que dizem nossos clientes" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-14">
          <div className="text-center">
            <div className="font-display text-7xl font-bold text-gradient-gold leading-none">4.7</div>
            <div className="flex justify-center gap-1 mt-3">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className={`w-5 h-5 ${i <= 5 ? 'fill-gold text-gold' : 'fill-gold/50 text-gold/50'}`} />
              ))}
            </div>
            <div className="text-white/60 text-sm mt-2">Baseado em +1.000 avaliações</div>
          </div>
          <div className="hidden md:block h-24 w-px bg-white/10" />
          <div className="max-w-md text-center md:text-left">
            <p className="text-white/70 leading-relaxed">
              Somos avaliados por milhares de clientes no Google e reconhecidos por nossas massas artesanais, ambiente aconchegante, excelente atendimento e carta de vinhos.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: (i % 3) * 0.1, duration: 0.6 }} className="p-7 rounded-2xl glass hover:border-gold/40 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold`}>{r.avatar}</div>
                <div>
                  <div className="text-white font-semibold text-sm">{r.name}</div>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(k => (<Star key={k} className={`w-3 h-3 ${k <= r.rating ? 'fill-gold text-gold' : 'text-white/20'}`} />))}
                  </div>
                </div>
              </div>
              <p className="text-white/75 text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Leaf, title: 'Alta Gastronomia Italiana', desc: 'Receitas autorais inspiradas na cozinha italiana.' },
    { icon: Sparkles, title: 'Ambiente Sofisticado', desc: 'Elegante, acolhedor e pensado nos mínimos detalhes.' },
    { icon: Wine, title: 'Carta de Vinhos', desc: 'Rótulos selecionados para harmonizar cada prato.' },
    { icon: Award, title: 'Serviço Ágil', desc: 'Time atento, atendimento de excelência.' },
    { icon: Users, title: 'Pet Friendly', desc: 'Perfeito para família, amigos e casais — com o pet junto.' },
    { icon: MapPin, title: 'Localização Privilegiada', desc: 'No Alto de Teresópolis, fácil de chegar.' },
  ];
  return (
    <section className="py-28 bg-noir">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Por que nos escolher" title="Feito para ser inesquecível" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1, duration: 0.6 }} className="group p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-charcoal to-noir hover:border-gold/40 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold group-hover:scale-110 transition-all" style={{ border: '1px solid rgba(169,129,46,0.3)' }}>
                <it.icon className="w-8 h-8 text-gold group-hover:text-black transition-colors" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">{it.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="localizacao" className="py-28 bg-gradient-to-b from-noir to-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Localização" title="Venha nos visitar" subtitle="Estamos no Alto, em Teresópolis. Fácil de chegar, difícil de esquecer." />
        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/10 h-[480px]">
            <iframe title="Mapa Burrata" src="https://www.google.com/maps?q=Av.+Oliveira+Botelho,+456+-+Alto,+Teres%C3%B3polis+-+RJ,+25960-004&output=embed" width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.6)' }} allowFullScreen loading="lazy" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0"><MapPin className="w-6 h-6 text-gold" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold mb-1">Endereço</div>
                  <div className="text-white font-medium">Av. Oliveira Botelho, 456</div>
                  <div className="text-white/60 text-sm">Alto · Teresópolis · Rio de Janeiro · CEP 25960-004</div>
                </div>
              </div>
            </div>
            <a href="tel:+5521975372420" className="block p-6 rounded-2xl glass hover:border-gold/60 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0"><Phone className="w-6 h-6 text-gold" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold mb-1">Telefone</div>
                  <div className="text-white font-medium">(21) 97537-2420</div>
                  <div className="text-white/60 text-sm">Reservas &amp; Pedidos</div>
                </div>
              </div>
            </a>
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0"><Clock className="w-6 h-6 text-gold" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold mb-1">Horários</div>
                  <div className="text-white font-medium">Terça a domingo</div>
                  <div className="text-white/60 text-sm">18h às 23h30</div>
                </div>
              </div>
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Av.+Oliveira+Botelho,+456+-+Alto,+Teres%C3%B3polis+-+RJ" target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl btn-gold text-black font-semibold hover:scale-[1.02] transition-transform">
              <MapPin className="w-5 h-5" /> Traçar Rota
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ icon: Icon, label, ...rest }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-gold mb-2">{label}</label>
      <div className="relative">
        <Icon className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input {...rest} className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition [color-scheme:dark]" />
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', time: '', guests: 2, message: '' });
  const [state, setState] = useState('idle');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setState('loading');
    try {
      const r = await fetch('/api/reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!r.ok) throw new Error('fail');
      setState('ok');
    } catch { setState('err'); }
  };

  const openWhats = () => {
    const t = `Ol%C3%A1!%20Quero%20fazer%20uma%20reserva.%20Nome:%20${encodeURIComponent(form.name)}%20|%20Pessoas:%20${form.guests}%20|%20Data:%20${form.date}%20${form.time}`;
    window.open(`https://wa.me/${WHATS}?text=${t}`, '_blank');
  };

  return (
    <section id="contato" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.ambience3} className="w-full h-full object-cover opacity-20" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir via-noir/95 to-noir" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6">
        <SectionTitle eyebrow="Reserve sua mesa" title="Garanta seu lugar no Burrata" subtitle="Reservas para grupos, ocasiões especiais ou para simplesmente celebrar um bom encontro." />
        <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={submit} className="glass rounded-3xl p-8 md:p-10 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Field icon={User} label="Nome completo" value={form.name} onChange={set('name')} required />
            <Field icon={Phone} label="Telefone" value={form.phone} onChange={set('phone')} required type="tel" />
            <Field icon={Mail} label="E-mail" value={form.email} onChange={set('email')} type="email" />
            <Field icon={Users} label="Nº de pessoas" value={form.guests} onChange={set('guests')} type="number" min={1} max={30} required />
            <Field icon={Calendar} label="Data" value={form.date} onChange={set('date')} type="date" required />
            <Field icon={Clock} label="Horário" value={form.time} onChange={set('time')} type="time" required />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gold mb-2">Mensagem</label>
            <textarea rows={3} value={form.message} onChange={set('message')} placeholder="Alguma observação especial? (aniversário, restrição alimentar, etc.)" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button type="submit" disabled={state === 'loading'} className="flex-1 py-4 rounded-full btn-gold text-black font-semibold inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-60">
              {state === 'loading' ? 'Enviando...' : state === 'ok' ? 'Reserva enviada!' : (<><Send className="w-4 h-4" /> Reserve Agora</>)}
            </button>
            <button type="button" onClick={openWhats} className="flex-1 py-4 rounded-full bg-[#25D366] text-black font-semibold inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </button>
          </div>
          {state === 'ok' && <div className="text-green-400 text-sm text-center">Recebemos sua reserva! Entraremos em contato em breve.</div>}
          {state === 'err' && <div className="text-red-400 text-sm text-center">Erro ao enviar. Tente pelo WhatsApp.</div>}
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="mb-4"><Logo /></div>
          <p className="text-white/60 text-sm leading-relaxed">Alta gastronomia italiana em um ambiente elegante e aconchegante, no Alto de Teresópolis.</p>
        </div>
        <div>
          <div className="text-gold text-xs uppercase tracking-widest mb-4">Navegação</div>
          <ul className="space-y-2">
            {NAV_LINKS.slice(1).map(l => (<li key={l.href}><a href={l.href} className="text-white/60 hover:text-gold text-sm transition-colors">{l.label}</a></li>))}
          </ul>
        </div>
        <div>
          <div className="text-gold text-xs uppercase tracking-widest mb-4">Contato</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2 text-white/70"><MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" /> Av. Oliveira Botelho, 456 - Alto, Teresópolis - RJ</li>
            <li className="flex gap-2 text-white/70"><Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" /> (21) 97537-2420</li>
            <li className="flex gap-2 text-white/70"><Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" /> Terça a domingo, 18h às 23h30</li>
          </ul>
        </div>
        <div>
          <div className="text-gold text-xs uppercase tracking-widest mb-4">Siga-nos</div>
          <div className="flex gap-3">
            <a href="https://instagram.com/burrataemporio" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-gold/20 transition-colors"><Instagram className="w-5 h-5 text-gold" /></a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Av.+Oliveira+Botelho,+456+-+Alto,+Teres%C3%B3polis+-+RJ" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-gold/20 transition-colors"><MapPin className="w-5 h-5 text-gold" /></a>
            <a href="tel:+5521975372420" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-gold/20 transition-colors"><Phone className="w-5 h-5 text-gold" /></a>
            <a href={`https://wa.me/${WHATS}`} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-gold/20 transition-colors"><MessageCircle className="w-5 h-5 text-gold" /></a>
          </div>
        </div>
      </div>
      <div className="divider-gold mb-6" />
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
        <div>© {new Date().getFullYear()} Burrata – Empório &amp; Bistrô. Todos os direitos reservados.</div>
        <div>Feito com <span className="text-gold">♦</span> em Teresópolis</div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <motion.a href={`https://wa.me/${WHATS}?text=Ol%C3%A1!%20Quero%20fazer%20uma%20reserva%20no%20Burrata.`} target="_blank" rel="noreferrer" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }} className="fixed bottom-6 right-6 z-40 group" aria-label="WhatsApp">
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
          <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.4} />
        </div>
      </motion.a>
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-black transition-colors" aria-label="Voltar ao topo">
            <ChevronUp className="w-5 h-5 text-gold" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="fixed inset-0 z-[100] bg-noir flex items-center justify-center">
          <div className="text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="w-20 h-20 rounded-full mx-auto mb-6" style={{ border: '2px solid rgba(169,129,46,0.2)', borderTopColor: '#A9812E' }} />
            <div className="font-brand text-3xl text-gold">Burrata</div>
            <div className="text-[10px] tracking-[0.4em] text-white/40 uppercase mt-2 not-italic">Empório &amp; Bistrô</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <main className="bg-noir">
      <LoadingScreen />
      <Nav />
      <Hero />
      <About />
      <Specialties />
      <BestSellers />
      <WineAndDrinks />
      <Gallery />
      <Reviews />
      <WhyUs />
      <Location />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  );
}

export default App;
