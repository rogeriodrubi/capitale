import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl.startsWith("https://")) {
  console.error("Supabase Error: NEXT_PUBLIC_SUPABASE_URL does not look like a valid URL (should start with https://). Value:", supabaseUrl);
}

if (!supabaseKey || supabaseKey === "your-anon-key") {
  console.error("Supabase Error: NEXT_PUBLIC_SUPABASE_ANON_KEY seems invalid or is using the default placeholder.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
