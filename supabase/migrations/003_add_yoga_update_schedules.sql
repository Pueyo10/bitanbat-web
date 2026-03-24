-- Migration: Add Yoga & Hatha Vinyasa classes + Yoga schedule in Local 2
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)

-- 1. Add Yoga class
INSERT INTO classes (id, name, slug, description_es, description_eu, color, category, min_age, max_age)
VALUES (
  'a1000000-0000-0000-0000-000000000018',
  'Yoga',
  'yoga',
  'Yoga para el equilibrio de cuerpo y mente. Flexibilidad, fuerza y calma interior.',
  'Yoga gorputzaren eta gogoaren orekarako. Malgutasuna, indarra eta barneko lasaitasuna.',
  '#9C27B0',
  'wellness',
  NULL, NULL
) ON CONFLICT (id) DO NOTHING;

-- 2. Add Hatha Vinyasa class
INSERT INTO classes (id, name, slug, description_es, description_eu, color, category, min_age, max_age)
VALUES (
  'a1000000-0000-0000-0000-000000000019',
  'Hatha Vinyasa',
  'hatha-vinyasa',
  'Fluye con la respiración. Combina posturas dinámicas y estáticas para fortalecer cuerpo y mente.',
  'Arnasketarekin batera mugitu. Postura dinamikoak eta estatikoak konbinatzen ditu gorputza eta gogoa indartzeko.',
  '#9C27B0',
  'wellness',
  NULL, NULL
) ON CONFLICT (id) DO NOTHING;

-- 3. Add Yoga 13:30 in Local 2 (Monday-Friday)
-- The user confirmed: "En el segundo local hay yoga a la 13:30"
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, is_active, notes) VALUES
  ('a1000000-0000-0000-0000-000000000018', '22222222-2222-2222-2222-222222222222', 0, '13:30', '14:30', true, NULL),
  ('a1000000-0000-0000-0000-000000000018', '22222222-2222-2222-2222-222222222222', 1, '13:30', '14:30', true, NULL),
  ('a1000000-0000-0000-0000-000000000018', '22222222-2222-2222-2222-222222222222', 2, '13:30', '14:30', true, NULL),
  ('a1000000-0000-0000-0000-000000000018', '22222222-2222-2222-2222-222222222222', 3, '13:30', '14:30', true, NULL),
  ('a1000000-0000-0000-0000-000000000018', '22222222-2222-2222-2222-222222222222', 4, '13:30', '14:30', true, NULL);
