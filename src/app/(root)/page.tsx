import { redirect } from 'next/navigation';

const page = () => {
  redirect('/dashboard/user-metrics');
};

export default page;
