

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kqtqwcnwnfthaolmhzuh.supabase.co'; 


const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxdHF3Y253bmZ0aGFvbG1oenVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NDE3NDcsImV4cCI6MjA3ODExNzc0N30.NDTSQa04c8XW_5CGqrgfdxNYuh4N58IOjmpX_IK3JnU'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);