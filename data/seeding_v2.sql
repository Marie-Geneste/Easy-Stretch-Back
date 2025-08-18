\c easystretch_db;
BEGIN;

/* vider dans un ordre sûr */
TRUNCATE TABLE "order_item" CASCADE;
TRUNCATE TABLE "order" CASCADE;
TRUNCATE TABLE "product" CASCADE;

TRUNCATE TABLE "user_stretch" CASCADE;
TRUNCATE TABLE "stretch" CASCADE;
TRUNCATE TABLE "category" CASCADE;
TRUNCATE TABLE "user" CASCADE;
TRUNCATE TABLE "role" CASCADE;

/* ====== role ====== */
INSERT INTO "role" ("id","name") VALUES
  (1,'admin'),
  (2,'user');

/* ====== user ====== */
INSERT INTO "user" ("id","email","password","username","role_id")
VALUES (1,'marie.e.geneste@gmail.com','$2b$10$7WDPLMcEOov3yv8fC2kJUOXSEz93/tGTRU8J4V51E3d69kb/dRA1e','Stretchy', 1);

/* ====== category ====== */
INSERT INTO "category" ("id","name") VALUES
  (1, 'Cou'),
  (2, 'Bras'),
  (3, 'Avant-bras'),
  (4, 'Poitrine'),
  (5, 'Ventre'),
  (6, 'Dos'),
  (7, 'Hanche'),
  (8, 'Fessier'),
  (9, 'Cuisse'),
  (10,'Jambe'),
  (11,'Pied');

/* ====== stretch ====== */
INSERT INTO "stretch" ("id","name","description","main_image","description_image","category_id") VALUES
    (1, 'Trapèze', 'Poser une main sur une épaule afin de la maintenir vers le bas. Incliner la tête du côté opposé et ,tout en gardant l''inclinaison, pencher la tête en avant.', 'https://i.ibb.co/BKN2SBB/1.webp', '', 1),
    (2, 'SCOM (Sterno-Cléïdo-Occipito-Mastoïdien)', 'Pour étirer le SCOM droit (par exemple) : Poser les doigts de la main gauche sur la clavicule droite (partie centrale). Basculer la tête en arrière (extension) et tourner la tête à droite.', 'https://i.ibb.co/CM7vWQ3/2.webp', '', 1),
    (3, 'Biceps', 'Tendre le bras devant soi et tendre la main vers le bas. Avec l''autre main, maintenir les doigts de la main dont le bras est tendu vers le bas.', 'https://i.ibb.co/gZwCLZT/3.webp', '', 2),
    (4, 'Triceps', 'Lever le bras au dessus de la tête, plier le coude et atteindre, avec la main, l''épaule opposé en ayant le bras derrière la tête. Poser les doigts de l''autre main sur le coude du bras en l''air et tirer vers le haut.', 'https://i.ibb.co/XZ9BSCv/4.webp' ,'' , 2),
    (5, 'Deltoïde','Tendre un bras vers l''avant et ramenez le vers l''intérieur. Attraper le coude avec l''autre main et maintenir une pression qui tire le bras.', ' https://i.ibb.co/k1Yhh2W/5.webp','',2),
    (6, 'Épicondyliens','Tendre le bras devant soi et avec l''autre main maintenir la main tendue vers le bas','https://i.ibb.co/3hpG29D/6.webp','', 3),
    (7, 'Épitrochléens','Tendre le bras devant soi et avec l''autre main maintenir la main tendue vers le haut.','https://i.ibb.co/cbZKVzg/7.webp','', 3),
    (8, 'Pectoraux', 'Étendre son bras vers l''arrière (mieux si on peut prendre un appui avec la main).', 'https://i.ibb.co/3WydZ8r/8.webp','', 4),
    (9, 'Abdos','S''allonger sur le ventre et se redresser sur les mains en étirant le tronc vers le haut.','https://i.ibb.co/qy6sQfd/9.webp','', 5),
    (10, 'Obliques','Debout, lever le bras vers le ciel et pencher le tronc du côté opposé.','https://i.ibb.co/3zhRRGt/10.webp','', 5),
    (11, 'Grand dorsal','Se mettre dans la posture de l''enfant (au sol, recroquevillé, les genoux et cuisses en dessous du tronc).Tendre les bras au dessus de la tête, le plus loin possible.','https://i.ibb.co/3186M99/11.webp','', 6),
    (12, 'Psoas','Faire une fente avec la jambe arrière assez loin en gardant le dos droit. Mettre une main derrière la hanche de la jambe arrière et mettre une pression pour engager cette hanche vers l''avant.','https://i.ibb.co/wpbbH7q/12.webp','', 7),
    (13, 'Fessiers','Assis au sol, croiser les jambes avec une tendus et l''autre pliée avec le pied à côté du genou de la jambe tendue. Tourner le tronc du côté de la jambe pliée et poser le coude opposé sur le genou de la jambe pliée.','https://i.ibb.co/dcJSX9N/13.webp','', 8),
    (14, 'Piriforme (pyramidal)','Allongé sur le dos, croiser une jambe sur l''autre : une cheville posée sur le genou de l''autre. Attraper la jambe d''appui en dessous et derrière le genou afin de la faire basculer au dessus du tronc.','https://i.ibb.co/7yHFd7f/14.webp','', 8),
    (15, 'Adducteur','Assis au sol, écarter les jambes en papillon. Poser les coudes sur les genoux et abaisser le tronc.','https://i.ibb.co/rM9HnyL/15.webp','', 9),
    (16, 'Quadriceps','Plier le genou et agripper la cheville avec la main du même côté, puis tirer doucement en direction du fessier. Le genou doit pointer vers le sol.','https://i.ibb.co/02GH3V9/16.webp','', 9),
    (17, 'Ischio-jambier','Assis sur le sol, tendre une jambe et plier l''autre. Essayer d''attraper le pied de la jambe tendue avec la main.','https://i.ibb.co/N9YRhMN/17.webp','', 9),
    (18, 'Triceps sural (mollet)','Debout, tendre une jambe et se pencher en avant pour attraper avec la main le pied de la jambe tendue.','https://i.ibb.co/zZ4s1G6/18.webp','',10),
    (19, 'Inversion','Faire une pointe avec le pied avec les orteils vers l''intérieur','https://i.ibb.co/VTyJHV6/19.webp','', 11 ),
    (20, 'Eversion ','Basculer le pied côté externe en faisant une flexion dorsale (orienté le pied vers l''extérieur et le haut).','https://i.ibb.co/2W8yYvL/20.webp','', 11);

/* ====== produits ====== */
INSERT INTO "product" ("id","name","description","price","stock","image") VALUES
  (1, 'Élastique de traction', 'Bandes élastiques pour assistance aux tractions.', 14.90, 50, 'https://pics.example.com/elastic-traction.webp'),
  (2, 'Tapis de sol', 'Tapis antidérapant pour étirements et yoga.', 24.90, 30, 'https://pics.example.com/yoga-mat.webp'),
  (3, 'Roue d’étirement du dos', 'Roue pour ouverture thoracique et étirement du dos.', 39.90, 20, 'https://pics.example.com/back-wheel.webp');

/* ====== commande démo ====== */
/* total_price calculé dès l'INSERT : 2*14.90 + 1*24.90 = 54.70 */
INSERT INTO "order" ("id","user_id","total_price","delivery_address","billing_address","payment_status","order_status")
VALUES (1, 1, 54.70, '12 rue des Étirements, 75000 Paris', '12 rue des Étirements, 75000 Paris', 'paid', 'processing');

INSERT INTO "order_item" ("order_id","product_id","quantity","price") VALUES
  (1, 1, 2, 14.90),
  (1, 2, 1, 24.90);

/* ====== réalignement des séquences ====== */
SELECT setval('role_id_seq',      (SELECT COALESCE(MAX(id),1) FROM "role"));
SELECT setval('user_id_seq',      (SELECT COALESCE(MAX(id),1) FROM "user"));
SELECT setval('category_id_seq',  (SELECT COALESCE(MAX(id),1) FROM "category"));
SELECT setval('stretch_id_seq',   (SELECT COALESCE(MAX(id),1) FROM "stretch"));
SELECT setval('product_id_seq',   (SELECT COALESCE(MAX(id),1) FROM "product"));
SELECT setval('"order_id_seq"',   (SELECT COALESCE(MAX(id),1) FROM "order"));

COMMIT;
