// Da de alta (o convierte en) administradora del panel a una cuenta.
//
//   node scripts/crear-admin.mjs correo@ejemplo.com
//
// Lee las claves de .env.local. Si la cuenta no existe la crea con una
// contraseña aleatoria que se muestra por pantalla (solo esta vez); si ya
// existe, simplemente le asigna el rol "admin". El rol vive en app_metadata,
// que solo puede modificar la clave de servicio: nadie puede autoasignárselo.
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const email = process.argv[2]?.trim().toLowerCase();
if (!email || !email.includes("@")) {
  console.error("Uso: node scripts/crear-admin.mjs correo@ejemplo.com");
  process.exit(1);
}

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) => {
  const m = env.match(new RegExp(`^${k}=(.*)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : undefined;
};
const supabase = createClient(get("NEXT_PUBLIC_SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"), {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 });
if (listError) throw listError;
const existente = data.users.find((u) => u.email?.toLowerCase() === email);

if (existente) {
  const { error } = await supabase.auth.admin.updateUserById(existente.id, {
    app_metadata: { ...existente.app_metadata, role: "admin" },
  });
  if (error) throw error;
  console.log(`${email} ya existía: ahora es administradora.`);
} else {
  const password = randomBytes(9).toString("base64url");
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: "admin" },
  });
  if (error) throw error;
  console.log(`Administradora creada.\n  Email:      ${email}\n  Contraseña: ${password}\n\nEntra en https://bitanbat.com/admin/login`);
}
