'use client';
import { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import UsersPage from './UsersPage';
import RolsPage from './role/RolsPage';
import ViewsPage from './views/ViewsPage';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UserTabPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = useSearchParams().get('tab');
  const router = useRouter();

  useEffect(() => {
    if (tab) {
      const tabIndex =
        tab === 'users' ? 0 : tab === 'roles' ? 1 : tab === 'views' ? 2 : 0;
      setActiveTab(tabIndex);
    }
  }, [tab]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const tabName =
      newValue === 0 ? 'users' : newValue === 1 ? 'roles' : 'views';
    router.replace(`/admin/users?tab=${tabName}`);
  };

  return (
    <div className='container mx-auto px-8'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label='email template tabs'
        >
          <Tab label={'Usuarios'} />
          <Tab label={'Roles'} />
          <Tab label={'Vistas'} />
        </Tabs>
      </Box>

      <div className='mt-4'>
        {activeTab === 0 && <UsersPage />}
        {activeTab === 1 && <RolsPage />}
        {activeTab === 2 && <ViewsPage />}
      </div>
    </div>
  );
}
