// Supabase configuration - Mulliri Antik
const SUPABASE_URL = 'https://viyhfhfzspazyyrifikx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_W35EJ3ismBfe1uN9sBeDnA_74xtLxpb';

// Initialize Supabase client
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = _supabase;
