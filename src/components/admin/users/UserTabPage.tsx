'use client';
import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import UsersPage from './UsersPage';
import RolsPage from './RolsPage';
import ViewsPage from './ViewsPage';

export default function UserTabPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('event :>> ', event);
    setActiveTab(newValue);
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
