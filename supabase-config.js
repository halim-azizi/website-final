// Supabase configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
// Note: You need to include the Supabase CDN script in your HTML files:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabaseClient = _supabase;
