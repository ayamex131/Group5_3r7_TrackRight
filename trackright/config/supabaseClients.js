
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pzenzlujlhxvdzeznfmo.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZW56bHVqbGh4dmR6ZXpuZm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMjIzODQsImV4cCI6MjA0OTY5ODM4NH0.Xv5sfLQQoGUIfSvwPcPcfoUOMSSTlF8nCCGarEUdmdo"

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;