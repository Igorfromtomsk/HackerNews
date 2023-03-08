import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import s from './styles.module.sass';

const Layout: React.FC = () => {
  return (
    <Container className={s.rootContainer} maxWidth="lg">
      <section className={s.mainSection}>
        <Outlet />
      </section>
      <footer className={s.footer}>
        <span>Test task</span>
        <span>Rights are not protected at all, oh my god!</span>
        <span>Lednev Igor | 2023</span>
      </footer>
    </Container>
  );
};

export default Layout;