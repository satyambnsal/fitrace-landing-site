import { AppSupabaseClient, Table } from '@/types';

export const getAllEmails = async (
  supabase: AppSupabaseClient
): Promise<Array<Table<'fitrace_signup_emails'>>> => {
  const { data, error } = await supabase
    .from('fitrace_signup_emails')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const insertEmail = async (
  supabase: AppSupabaseClient,
  item: { name: string; email: string }
): Promise<Table<'fitrace_signup_emails'>> => {
  const { data, error } = await supabase
    .from('fitrace_signup_emails')
    .insert(item)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};
