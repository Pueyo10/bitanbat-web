import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "jonpue10@gmail.com";

interface OrderItem {
  name: string;
  size?: string;
  qty: number;
  price: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, note, items } = body as {
      name?: string;
      phone?: string;
      email?: string;
      note?: string;
      items?: OrderItem[];
    };

    if (!name || !phone || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

    const rows = items
      .map(
        (it, i) => `
          <tr${i % 2 ? ' style="background: #f9f9f9;"' : ""}>
            <td style="padding: 8px 12px; color: #1a1a1a;">${it.name}${
              it.size ? ` (${it.size})` : ""
            }</td>
            <td style="padding: 8px 12px; color: #1a1a1a; text-align: center;">x${it.qty}</td>
            <td style="padding: 8px 12px; color: #1a1a1a; text-align: right;">${
              it.price * it.qty
            }€</td>
          </tr>`
      )
      .join("");

    await resend.emails.send({
      from: "BitanBat Web <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      subject: `Nuevo pedido tienda: ${name} (${total}€)`,
      ...(email ? { replyTo: email } : {}),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #C9A96E; padding-bottom: 10px;">
            Nuevo pedido de la tienda
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 100px;">Nombre</td>
              <td style="padding: 8px 12px; color: #1a1a1a;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Teléfono</td>
              <td style="padding: 8px 12px; color: #1a1a1a;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px 12px; color: #1a1a1a;">${email || "No proporcionado"}</td>
            </tr>
          </table>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #eee;">
            <thead>
              <tr style="background: #1a1a1a;">
                <th style="padding: 8px 12px; color: #fff; text-align: left;">Producto</th>
                <th style="padding: 8px 12px; color: #fff; text-align: center;">Cant.</th>
                <th style="padding: 8px 12px; color: #fff; text-align: right;">Importe</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px 12px; font-weight: bold; color: #1a1a1a; border-top: 2px solid #C9A96E;">Total</td>
                <td style="padding: 10px 12px; font-weight: bold; color: #1a1a1a; text-align: right; border-top: 2px solid #C9A96E;">${total}€</td>
              </tr>
            </tfoot>
          </table>
          ${
            note
              ? `<div style="margin-top: 20px; padding: 16px; background: #f5f5f0; border-radius: 8px;">
                   <p style="font-weight: bold; color: #555; margin: 0 0 8px;">Nota:</p>
                   <p style="color: #1a1a1a; white-space: pre-wrap; margin: 0;">${note}</p>
                 </div>`
              : ""
          }
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Pedido enviado desde la tienda de bitanbat.com — pago al recoger en el centro
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order form error:", error);
    return NextResponse.json(
      { error: "Error al enviar el pedido" },
      { status: 500 }
    );
  }
}
