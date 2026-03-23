-- Seed data: Locations
INSERT INTO locations (id, name, address, description_es, description_eu) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Local 1', 'Hernani, Gipuzkoa', 'Local principal con sala amplia para clases de fitness y danza.', 'Lokal nagusia fitness eta dantza klaseentzako areto zabalarekin.'),
  ('22222222-2222-2222-2222-222222222222', 'Local 2', 'Hernani, Gipuzkoa', 'Segundo local especializado en pilates, barrefit y boxeo.', 'Bigarren lokala pilates, barrefit eta boxeoan espezializatua.');

-- Seed data: Classes
INSERT INTO classes (id, name, slug, description_es, description_eu, color, category, min_age, max_age) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Entrenamiento Funcional', 'entrenamiento-funcional', 'Entrenamiento de alta intensidad basado en movimientos funcionales para mejorar tu condición física general.', 'Intentsitate altuko entrenamendua mugimendu funtzionaletan oinarritua zure egoera fisiko orokorra hobetzeko.', '#FFEB3B', 'fitness', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000002', 'E. Funcional Txikiak', 'e-funcional-txikiak', 'Entrenamiento funcional adaptado para niños de 7 a 9 años.', 'Entrenamendu funtzionala 7-9 urteko haurrentzat egokitua.', '#FFEB3B', 'fitness', 7, 9),
  ('a1000000-0000-0000-0000-000000000003', 'E. Funcional Txiki', 'e-funcional-txiki', 'Entrenamiento funcional adaptado para niños de 10 a 14 años.', 'Entrenamendu funtzionala 10-14 urteko haurrentzat egokitua.', '#FFEB3B', 'fitness', 10, 14),
  ('a1000000-0000-0000-0000-000000000004', 'Sevillanas', 'sevillanas', 'Aprende sevillanas desde nivel iniciación hasta avanzado.', 'Ikasi sevillanoak hasierako mailatik aurreraturaino.', '#E91E63', 'dantza', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000005', 'FitGipsy', 'fitgipsy', 'Clase de fitness con ritmos flamencos y gitanos. ¡Energía pura!', 'Fitness klasea erritmo flamenko eta ijitoekin. Energia hutsa!', '#9C27B0', 'fitness', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000006', 'Predantza', 'predantza', 'Iniciación a la danza para los más pequeños (3-6 años).', 'Dantzaren hastapena txikienentzat (3-6 urte).', '#FF9800', 'dantza', 3, 6),
  ('a1000000-0000-0000-0000-000000000007', 'Boxeo Txiki', 'boxeo-txiki', 'Boxeo adaptado para niños. Disciplina y diversión.', 'Boxeo egokitua haurrentzat. Diziplina eta dibertigarria.', '#F44336', 'fitness', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000008', 'Zumba', 'zumba', 'Baila al ritmo de la música latina y quema calorías sin parar.', 'Dantzatu musika latinoaren erritmora eta erre kaloriak etengabe.', '#FFEB3B', 'fitness', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000009', 'Bungee', 'bungee', 'Fitness con arnés de bungee. Una experiencia única de entrenamiento.', 'Fitness bungee arnesarekin. Entrenamendu esperientzia bakarra.', '#00BCD4', 'fitness', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000010', 'Urbano', 'urbano', 'Danza urbana para todas las edades: hip-hop, street dance y más.', 'Dantza urbanoa adin guztietarako: hip-hop, street dance eta gehiago.', '#9C27B0', 'dantza', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000011', 'Bachata', 'bachata', 'Clases de bachata desde iniciación hasta nivel intermedio/avanzado.', 'Bachata klaseak hasierako mailatik tarteko/aurreratu mailara.', '#E91E63', 'dantza', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000012', 'Salsa', 'salsa', 'Aprende a bailar salsa con nuestras clases de iniciación.', 'Ikasi salsa dantzatzen gure hasierako klaseekin.', '#FF5722', 'dantza', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000013', 'Pilates', 'pilates', 'Pilates para mejorar la flexibilidad, la fuerza del core y la postura.', 'Pilates malgutasuna, core-aren indarra eta jarrera hobetzeko.', '#4CAF50', 'wellness', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000014', 'Barrefit', 'barrefit', 'Combina ballet, pilates y fitness para un cuerpo tonificado y elegante.', 'Konbinatu ballet, pilates eta fitness gorputz tonifikatua eta dotorea lortzeko.', '#4CAF50', 'wellness', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000015', 'Boxeo', 'boxeo', 'Boxeo para adultos: técnica, resistencia y fuerza.', 'Boxeo helduetarako: teknika, erresistentzia eta indarra.', '#F44336', 'fitness', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000016', 'Jumping', 'jumping', 'Entrenamiento cardiovascular sobre mini trampolín. ¡Diversión asegurada!', 'Entrenamendu kardiobaskular mini tranpolinaren gainean. Dibertigarria ziur!', '#00BCD4', 'fitness', NULL, NULL),
  ('a1000000-0000-0000-0000-000000000017', 'Masajes', 'masajes', 'Servicio de masajes terapéuticos y relajantes.', 'Masaje terapeutiko eta lasaigarrien zerbitzua.', '#795548', 'wellness', NULL, NULL);

-- Seed data: Schedules - LOCAL 1 (from the spreadsheet)
-- Monday (day_of_week = 0)
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, notes) VALUES
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 0, '09:00', '10:00', NULL),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 0, '16:00', '17:00', NULL),
  ('a1000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 0, '17:00', '18:00', '7-9 urte'),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 0, '18:00', '19:00', NULL),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 0, '19:00', '19:15', NULL),
  ('a1000000-0000-0000-0000-000000000008', '11111111-1111-1111-1111-111111111111', 0, '19:15', '20:15', NULL),
  ('a1000000-0000-0000-0000-000000000009', '11111111-1111-1111-1111-111111111111', 0, '20:15', '21:15', NULL);

-- Tuesday (day_of_week = 1)
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, notes) VALUES
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 1, '09:30', '10:30', NULL),
  ('a1000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 1, '10:30', '11:30', 'avanz.'),
  ('a1000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 1, '11:30', '12:30', 'nivel medio'),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 1, '13:30', '14:30', NULL),
  ('a1000000-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', 1, '17:00', '18:00', '3-6 urte'),
  ('a1000000-0000-0000-0000-000000000007', '11111111-1111-1111-1111-111111111111', 1, '17:00', '18:00', NULL),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 1, '18:00', '19:00', NULL),
  ('a1000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 1, '19:00', '20:00', 'inc.'),
  ('a1000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 1, '20:15', '21:15', NULL);

-- Wednesday (day_of_week = 2)
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, notes) VALUES
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 2, '09:30', '10:30', NULL),
  ('a1000000-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 2, '11:00', '12:00', NULL),
  ('a1000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 2, '15:00', '16:00', 'avanz.'),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 2, '16:00', '17:00', NULL),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 2, '17:00', '18:00', NULL),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 2, '18:00', '19:00', NULL),
  ('a1000000-0000-0000-0000-000000000011', '11111111-1111-1111-1111-111111111111', 2, '19:00', '20:00', 'inc.'),
  ('a1000000-0000-0000-0000-000000000011', '11111111-1111-1111-1111-111111111111', 2, '20:00', '21:00', 'int./avnz.');

-- Thursday (day_of_week = 3)
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, notes) VALUES
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 3, '09:30', '10:30', NULL),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 3, '13:30', '14:30', NULL),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 3, '16:00', '17:00', NULL),
  ('a1000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 3, '17:00', '18:00', '10-14 urte'),
  ('a1000000-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', 3, '17:00', '18:00', '7-9'),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 3, '18:00', '19:00', NULL),
  ('a1000000-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', 3, '18:00', '19:00', '10-13'),
  ('a1000000-0000-0000-0000-000000000008', '11111111-1111-1111-1111-111111111111', 3, '19:15', '20:15', NULL),
  ('a1000000-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', 3, '20:15', '21:15', 'adultos');

-- Friday (day_of_week = 4)
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, notes) VALUES
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 4, '10:00', '11:00', NULL),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 4, '13:30', '14:30', NULL),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 4, '17:00', '18:00', NULL),
  ('a1000000-0000-0000-0000-000000000012', '11111111-1111-1111-1111-111111111111', 4, '18:30', '19:30', 'inc.');

-- Seed data: Schedules - LOCAL 2 (from the spreadsheet)
-- Monday (day_of_week = 0)
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, notes) VALUES
  ('a1000000-0000-0000-0000-000000000014', '22222222-2222-2222-2222-222222222222', 0, '09:30', '10:30', NULL),
  ('a1000000-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 0, '10:45', '11:45', NULL),
  ('a1000000-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 0, '13:30', '14:30', NULL),
  ('a1000000-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 0, '17:00', '18:00', NULL),
  ('a1000000-0000-0000-0000-000000000014', '22222222-2222-2222-2222-222222222222', 0, '18:05', '19:05', NULL);

-- Tuesday (day_of_week = 1)
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, notes) VALUES
  ('a1000000-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 1, '09:30', '10:30', NULL),
  ('a1000000-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 1, '10:45', '11:45', NULL),
  ('a1000000-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 1, '18:15', '19:15', NULL),
  ('a1000000-0000-0000-0000-000000000015', '22222222-2222-2222-2222-222222222222', 1, '19:15', '20:15', NULL);

-- Wednesday (day_of_week = 2)
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, notes) VALUES
  ('a1000000-0000-0000-0000-000000000014', '22222222-2222-2222-2222-222222222222', 2, '09:30', '10:30', NULL),
  ('a1000000-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 2, '13:30', '14:30', NULL),
  ('a1000000-0000-0000-0000-000000000014', '22222222-2222-2222-2222-222222222222', 2, '17:00', '18:00', NULL),
  ('a1000000-0000-0000-0000-000000000014', '22222222-2222-2222-2222-222222222222', 2, '18:05', '19:05', NULL),
  ('a1000000-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 2, '19:10', '20:10', NULL);

-- Thursday (day_of_week = 3)
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, notes) VALUES
  ('a1000000-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 3, '09:30', '10:30', NULL),
  ('a1000000-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 3, '10:45', '11:45', NULL),
  ('a1000000-0000-0000-0000-000000000015', '22222222-2222-2222-2222-222222222222', 3, '19:15', '20:15', NULL);

-- Friday (day_of_week = 4)
INSERT INTO schedules (class_id, location_id, day_of_week, start_time, end_time, notes) VALUES
  ('a1000000-0000-0000-0000-000000000014', '22222222-2222-2222-2222-222222222222', 4, '10:00', '11:00', NULL);
