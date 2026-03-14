import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://jrndwurqmkhycuvuqkbr.supabase.co"
const supabaseKey = "sb_publishable_-Q1416T6XiIHzap-eJxeAA__u1ZZ0qq"

export const supabase = createClient(supabaseUrl, supabaseKey)