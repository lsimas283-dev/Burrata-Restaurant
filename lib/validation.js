import { z } from 'zod';

const text = (max) => z.string().trim().max(max);

export const reservationSchema = z.object({
  name: text(120).min(1),
  phone: text(30).min(6),
  email: z.string().trim().email().max(160).or(z.literal('')),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  guests: z.coerce.number().int().min(1).max(30),
  message: text(1000),
}).strict();

export const menuSchema = z.object({
  cat: text(40).min(1),
  name: text(120).min(1),
  desc: text(1000),
  price: text(120),
  img: z.string().trim().max(200000).refine((v) => !v || /^(https?:\/\/|data:image\/)/i.test(v), 'Imagem inválida'),
  tag: text(40),
  pair: text(120),
  order: z.coerce.number().int().min(0).max(100000),
});

export const gallerySchema = z.object({
  src: z.string().trim().max(200000).refine((v) => /^(https?:\/\/|data:image\/)/i.test(v), 'Imagem inválida'),
  span: z.enum(['', 'row-span-2']),
  order: z.coerce.number().int().min(0).max(100000),
});

export const menuUpdateSchema = menuSchema.partial().strict();
export const galleryUpdateSchema = gallerySchema.partial().strict();
export const reservationUpdateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).optional(),
  seen: z.boolean().optional(),
}).strict().refine((v) => Object.keys(v).length > 0, 'nothing to update');
