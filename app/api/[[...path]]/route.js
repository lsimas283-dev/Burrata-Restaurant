import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { IMAGES, CATEGORY_IMAGES } from '@/config/images';

const uri = process.env.MONGO_URL;
let clientPromise;
async function getDb() {
  if (!clientPromise) {
    const c = new MongoClient(uri);
    clientPromise = c.connect();
  }
  const c = await clientPromise;
  return c.db(process.env.DB_NAME || 'burrata');
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-admin-password',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors });
}

const checkAuth = (request) => {
  const pw = request.headers.get('x-admin-password');
  return pw && pw === process.env.ADMIN_PASSWORD;
};

// SEED DATA (cardápio Burrata – Empório & Bistrô) — fotos reais via config/images.js
const IMG = {
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

const SEED_MENU = [
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
  // VINHOS
  { cat: 'vinhos', name: 'Chianti Classico DOCG', desc: 'Tinto italiano encorpado, notas de frutas vermelhas e especiarias.', price: 'R$ 42,90 (taça) / R$ 189,90 (garrafa)', img: IMG.vinho1, pair: '' },
  { cat: 'vinhos', name: 'Pinot Grigio', desc: 'Branco leve e fresco, ideal para acompanhar massas e frutos do mar.', price: 'R$ 38,90 (taça) / R$ 169,90 (garrafa)', img: IMG.vinho2, pair: '' },
  { cat: 'vinhos', name: 'Primitivo di Manduria', desc: 'Tinto encorpado do sul da Itália, com notas de frutas maduras.', price: 'R$ 46,90 (taça) / R$ 209,90 (garrafa)', img: IMG.vinho1, pair: '' },
  { cat: 'vinhos', name: 'Prosecco', desc: 'Espumante italiano leve e frisante, perfeito para começar a refeição.', price: 'R$ 39,90 (taça) / R$ 179,90 (garrafa)', img: IMG.vinho2, pair: '' },
  // DRINKS
  { cat: 'drinks', name: 'Aperol Spritz', desc: 'O clássico aperitivo italiano: Aperol, prosecco e água com gás.', price: 'R$ 42,90', img: IMG.drink1, tag: 'Popular', pair: '' },
  { cat: 'drinks', name: 'Negroni', desc: 'Gin, vermute e Campari em partes iguais, servido com uma casca de laranja.', price: 'R$ 44,90', img: IMG.drink1, pair: '' },
  { cat: 'drinks', name: 'Bellini', desc: 'Prosecco e purê de pêssego, um clássico veneziano.', price: 'R$ 39,90', img: IMG.drink1, pair: '' },
];

const SEED_GALLERY = [
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

async function seedIfEmpty(db) {
  const menuCount = await db.collection('menu_items').countDocuments();
  if (menuCount === 0) {
    const docs = SEED_MENU.map((it, i) => ({ ...it, id: uuidv4(), order: i, createdAt: new Date().toISOString() }));
    await db.collection('menu_items').insertMany(docs);
  }
  const galleryCount = await db.collection('gallery').countDocuments();
  if (galleryCount === 0) {
    const docs = SEED_GALLERY.map((it, i) => ({ ...it, id: uuidv4(), order: i, createdAt: new Date().toISOString() }));
    await db.collection('gallery').insertMany(docs);
  }
}

export async function GET(request, { params }) {
  try {
    const path = ((await params).path || []).join('/');
    const db = await getDb();

    if (path === '' || path === 'health') {
      return NextResponse.json({ ok: true, service: 'Burrata Empório & Bistrô API' }, { headers: cors });
    }
    if (path === 'menu') {
      await seedIfEmpty(db);
      const items = await db.collection('menu_items').find({}).sort({ order: 1, createdAt: 1 }).project({ _id: 0 }).toArray();
      return NextResponse.json({ items }, { headers: cors });
    }
    if (path === 'gallery') {
      await seedIfEmpty(db);
      const items = await db.collection('gallery').find({}).sort({ order: 1, createdAt: 1 }).project({ _id: 0 }).toArray();
      return NextResponse.json({ items }, { headers: cors });
    }
    if (path === 'reservations') {
      if (!checkAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: cors });
      const items = await db.collection('reservations').find({}).sort({ createdAt: -1 }).limit(200).project({ _id: 0 }).toArray();
      return NextResponse.json({ items }, { headers: cors });
    }
    return NextResponse.json({ error: 'not found' }, { status: 404, headers: cors });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: cors });
  }
}

export async function POST(request, { params }) {
  try {
    const path = ((await params).path || []).join('/');
    const db = await getDb();
    const body = await request.json().catch(() => ({}));

    if (path === 'reservations') {
      const doc = {
        id: uuidv4(),
        name: body.name || '',
        phone: body.phone || '',
        email: body.email || '',
        date: body.date || '',
        time: body.time || '',
        guests: body.guests || 1,
        message: body.message || '',
        status: 'pending',
        seen: false,
        createdAt: new Date().toISOString(),
      };
      await db.collection('reservations').insertOne(doc);
      return NextResponse.json({ ok: true, reservation: doc }, { headers: cors });
    }

    if (path === 'admin/login') {
      if (body.password === process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ ok: true, token: body.password }, { headers: cors });
      }
      return NextResponse.json({ error: 'invalid' }, { status: 401, headers: cors });
    }

    // Admin-only endpoints below
    if (!checkAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: cors });

    if (path === 'menu') {
      const doc = {
        id: uuidv4(),
        cat: body.cat || 'entradas',
        name: body.name || 'Novo item',
        desc: body.desc || '',
        price: body.price || '',
        img: body.img || '',
        tag: body.tag || '',
        pair: body.pair || '',
        order: body.order ?? 9999,
        createdAt: new Date().toISOString(),
      };
      await db.collection('menu_items').insertOne(doc);
      return NextResponse.json({ ok: true, item: doc }, { headers: cors });
    }

    if (path === 'gallery') {
      const doc = {
        id: uuidv4(),
        src: body.src || '',
        span: body.span || '',
        order: body.order ?? 9999,
        createdAt: new Date().toISOString(),
      };
      await db.collection('gallery').insertOne(doc);
      return NextResponse.json({ ok: true, item: doc }, { headers: cors });
    }

    if (path === 'menu/reset') {
      await db.collection('menu_items').deleteMany({});
      await db.collection('gallery').deleteMany({});
      await seedIfEmpty(db);
      return NextResponse.json({ ok: true }, { headers: cors });
    }

    return NextResponse.json({ error: 'not found' }, { status: 404, headers: cors });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: cors });
  }
}

export async function PUT(request, { params }) {
  try {
    const path = ((await params).path || []).join('/');
    if (!checkAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: cors });
    const db = await getDb();
    const body = await request.json().catch(() => ({}));

    const parts = path.split('/');
    if (parts[0] === 'menu' && parts[1]) {
      const id = parts[1];
      const update = {};
      ['cat','name','desc','price','img','tag','pair','order'].forEach(k => {
        if (body[k] !== undefined) update[k] = body[k];
      });
      await db.collection('menu_items').updateOne({ id }, { $set: update });
      const item = await db.collection('menu_items').findOne({ id }, { projection: { _id: 0 } });
      return NextResponse.json({ ok: true, item }, { headers: cors });
    }

    if (parts[0] === 'gallery' && parts[1]) {
      const id = parts[1];
      const update = {};
      ['src','span','order'].forEach(k => { if (body[k] !== undefined) update[k] = body[k]; });
      await db.collection('gallery').updateOne({ id }, { $set: update });
      return NextResponse.json({ ok: true }, { headers: cors });
    }

    if (parts[0] === 'reservations' && parts[1]) {
      const id = parts[1];
      const update = {};
      if (body.status !== undefined) update.status = body.status;
      if (body.seen !== undefined) update.seen = body.seen;
      if (Object.keys(update).length === 0) {
        return NextResponse.json({ error: 'nothing to update' }, { status: 400, headers: cors });
      }
      update.updatedAt = new Date().toISOString();
      await db.collection('reservations').updateOne({ id }, { $set: update });
      const item = await db.collection('reservations').findOne({ id }, { projection: { _id: 0 } });
      return NextResponse.json({ ok: true, item }, { headers: cors });
    }

    return NextResponse.json({ error: 'not found' }, { status: 404, headers: cors });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: cors });
  }
}

export async function DELETE(request, { params }) {
  try {
    const path = ((await params).path || []).join('/');
    if (!checkAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: cors });
    const db = await getDb();

    const parts = path.split('/');
    if (parts[0] === 'menu' && parts[1]) {
      await db.collection('menu_items').deleteOne({ id: parts[1] });
      return NextResponse.json({ ok: true }, { headers: cors });
    }
    if (parts[0] === 'gallery' && parts[1]) {
      await db.collection('gallery').deleteOne({ id: parts[1] });
      return NextResponse.json({ ok: true }, { headers: cors });
    }
    if (parts[0] === 'reservations' && parts[1]) {
      await db.collection('reservations').deleteOne({ id: parts[1] });
      return NextResponse.json({ ok: true }, { headers: cors });
    }
    return NextResponse.json({ error: 'not found' }, { status: 404, headers: cors });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: cors });
  }
}
