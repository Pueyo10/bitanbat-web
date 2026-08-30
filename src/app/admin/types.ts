export type ActionResult = { ok: true } | { ok: false; error: string };

/** Mensaje que devuelven las acciones cuando no hay sesión de administrador. */
export const SESION_CADUCADA = "La sesión ha caducado. Vuelve a iniciar sesión.";
