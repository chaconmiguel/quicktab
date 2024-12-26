import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import BillClient from './BillClient';

interface BillItem {
  name: string;
  price: number;
  quantity: number;
}

interface Bill {
  id: string;
  restaurant_id: string;
  table_number: string;
  items: BillItem[];
  total: number;
  status: string;
  restaurants: {
    name: string;
    email: string;
  };
}

export default async function BillPage({ params }: { params: { billId: string } }) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: bill, error } = await supabase
    .from('bills')
    .select(`
      *,
      restaurants (
        name,
        email
      )
    `)
    .eq('id', params.billId)
    .single();

  if (error) {
    console.error('Error fetching bill:', error);
    return <BillClient bill={null} />;
  }

  return <BillClient bill={bill} />;
} 