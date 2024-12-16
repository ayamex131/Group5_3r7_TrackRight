// utils/testSupabase.js
import supabase from "./config/supabaseClients";

const testSupabaseQuery = async () => {
  try {
    const { data, error } = await supabase.from('Users').select('*');
    
    if (error) {
      console.log("Error querying Supabase:", error.message);
    } else {
      console.log("Supabase connection successful, data retrieved:", data);
    }
  } catch (error) {
    console.error("Error with Supabase connection:", error);
  }
};

export default testSupabaseQuery;
