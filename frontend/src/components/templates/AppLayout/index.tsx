import { AppShell, Header } from '@mantine/core';

import NavbarComponent from '@/components/molecules/Navbar';

interface Props {
  children: React.ReactNode;
}

function AppLayout({ children }: Props) {
  return (
    <AppShell
      padding='md'
      navbar={<NavbarComponent />}
      header={
        <Header height={60} p='lg'>
          <h1 className='text-gray-400 font-bold my-auto'>
            Library Management
          </h1>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}

export default AppLayout;
