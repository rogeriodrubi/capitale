
import { NextResponse } from "next/server";
import { properties } from "@/lib/seed-data";
import { supabase } from "@/lib/supabase";


export async function GET() {
   return NextResponse.json({ error: "Method not allowed. Use POST to seed." }, { status: 405 });
}

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Seeding not allowed in production" },
      { status: 403 }
    );
  }

  try {
    const { error: deleteError } = await supabase
      .from("properties")
      .delete()
      .neq("id", "0"); // Delete all

    if (deleteError) {
      console.error("Error clearing properties:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // Insert new valid properties
    const { error: insertError } = await supabase.from("properties").insert(
      properties.map((p) => ({
        id: p.id,
        title: p.title,
        location: p.location,
        area: p.area,
        price: p.price,
        type: p.type,
        description: p.description,
        features: p.features,
        images: p.images,
        coordinates: p.coordinates, // Will be cast to jsonb
        contact: p.contact,
        availability: p.availability,
        featured: p.featured || false,
      }))
    );

    if (insertError) {
      console.error("Error inserting properties:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      count: properties.length,
      message: "Properties seeded successfully",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
