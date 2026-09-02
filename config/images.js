/**
 * Fonte única das imagens do site — TODAS as fotos são reais do restaurante,
 * armazenadas em /public/images/burrata.
 *
 * Nenhum componente deve referenciar Unsplash ou qualquer imagem externa/placeholder.
 * Qualquer nova foto deve ser adicionada aqui, nunca direto no componente.
 */

const BASE = '/images/burrata';

/** Acervo bruto de fotos reais disponíveis, na pasta public/images/burrata. */
export const PHOTOS = {
  fachadaAmbiente1: `${BASE}/um-pouco-mais-da-nossa.jpg`,
  fachadaAmbiente2: `${BASE}/um-pouco-mais-da-nossa-2.jpg`,
  fachadaAmbiente3: `${BASE}/um-pouco-mais-da-nossa-3.jpg`,
  fachadaAmbiente4: `${BASE}/um-pouco-mais-da-nossa-4.jpg`,
  fachadaAmbiente5: `${BASE}/um-pouco-mais-da-nossa-5.jpg`,
  fachadaAmbiente6: `${BASE}/um-pouco-mais-da-nossa-6.jpg`,
  ravioliDeBurrata: `${BASE}/ravioli-de-burrata.jpg`,
  paletaAoAcafrao: `${BASE}/paleta-ao-acafrao.jpg`,
  detalhe: `${BASE}/caption.jpg`,
};

/** Imagens por seção do site institucional. */
export const IMAGES = {
  // Hero — a foto mais bonita de ambiente/fachada
  hero: PHOTOS.fachadaAmbiente1,

  // Fotos internas do restaurante (seção "Sobre" e afins)
  ambiente: [
    PHOTOS.fachadaAmbiente1,
    PHOTOS.fachadaAmbiente2,
    PHOTOS.fachadaAmbiente3,
    PHOTOS.fachadaAmbiente4,
    PHOTOS.fachadaAmbiente5,
    PHOTOS.fachadaAmbiente6,
  ],

  // Fotos reais de pratos
  pratos: {
    ravioliDeBurrata: PHOTOS.ravioliDeBurrata,
    paletaAoAcafrao: PHOTOS.paletaAoAcafrao,
    detalhe: PHOTOS.detalhe,
  },

  // O acervo atual não tem foto própria de vinhos/drinks —
  // reaproveitando fotos reais de ambiente/pratos em vez de qualquer placeholder.
  vinhos: PHOTOS.fachadaAmbiente2,
  drinks: PHOTOS.fachadaAmbiente3,

  // Galeria — todas as fotos reais disponíveis
  galeria: [
    PHOTOS.fachadaAmbiente1,
    PHOTOS.fachadaAmbiente2,
    PHOTOS.fachadaAmbiente3,
    PHOTOS.ravioliDeBurrata,
    PHOTOS.paletaAoAcafrao,
    PHOTOS.fachadaAmbiente4,
    PHOTOS.fachadaAmbiente5,
    PHOTOS.fachadaAmbiente6,
    PHOTOS.detalhe,
  ],
};

/**
 * Uma foto real por categoria de cardápio — usada como imagem de cada item.
 * Categorias sem foto própria reaproveitam a foto real mais próxima do tema
 * (nunca um placeholder).
 */
export const CATEGORY_IMAGES = {
  entradas: PHOTOS.detalhe,
  burratas: PHOTOS.ravioliDeBurrata,
  massas: PHOTOS.ravioliDeBurrata,
  risotos: PHOTOS.paletaAoAcafrao,
  carnes: PHOTOS.paletaAoAcafrao,
  pizzas: PHOTOS.fachadaAmbiente4,
  sobremesas: PHOTOS.detalhe,
  vinhos: PHOTOS.fachadaAmbiente2,
  drinks: PHOTOS.fachadaAmbiente3,
};

export default IMAGES;
