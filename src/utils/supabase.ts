
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_PUBLIC_ANON_KEY || '';

export const supabase = createClient(url, key,
 {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});