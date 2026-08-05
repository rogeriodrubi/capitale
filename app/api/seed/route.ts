import { NextResponse } from "next/server";
import { properties } from "@/lib/seed-data";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to seed." },
    { status: 405 },
  );
}

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Seeding not allowed in production" },
      { status: 403 },
    );
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    // Upsert por folder_id: preserva imóveis já cadastrados manualmente
    // (com fotos reais no Storage) e apenas atualiza/insere os itens de mock.
    const { error: upsertError } = await supabaseAdmin
      .from("properties")
      .upsert(properties, { onConflict: "folder_id" });

    if (upsertError) {
      console.error("Error seeding properties:", upsertError);
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      count: properties.length,
      message: "Properties seeded successfully",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
