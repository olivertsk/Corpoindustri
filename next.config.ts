import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/about', destination: '/nosotros', permanent: true },
      { source: '/contact', destination: '/contacto', permanent: true },
      { source: '/terms', destination: '/terminos', permanent: true },
      { source: '/search/:path*', destination: '/buscar/:path*', permanent: true },
      { source: '/search', destination: '/buscar', permanent: true },
      { source: '/cart', destination: '/carrito', permanent: true },
      { source: '/favorites', destination: '/favoritos', permanent: true },
      {
        source: '/profile/notifications',
        destination: '/perfil/notificaciones',
        permanent: true,
      },
      {
        source: '/profile/orders',
        destination: '/perfil/pedidos',
        permanent: true,
      },
      { source: '/profile', destination: '/perfil', permanent: true },
      {
        source: '/auth/sign-in',
        destination: '/acceso/iniciar-sesion',
        permanent: true,
      },
      {
        source: '/auth/register',
        destination: '/acceso/registro',
        permanent: true,
      },
      {
        source: '/auth/register-difussion',
        destination: '/acceso/registro-difusion',
        permanent: true,
      },
      {
        source: '/auth/forgot-password',
        destination: '/acceso/recuperar-clave',
        permanent: true,
      },
      {
        source: '/auth/confirm-account',
        destination: '/acceso/confirmar-cuenta',
        permanent: true,
      },
      { source: '/logout', destination: '/cerrar-sesion', permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: '/nosotros', destination: '/about' },
      { source: '/contacto', destination: '/contact' },
      { source: '/terminos', destination: '/terms' },
      { source: '/buscar/:path*', destination: '/search/:path*' },
      { source: '/buscar', destination: '/search' },
      { source: '/carrito', destination: '/cart' },
      { source: '/favoritos', destination: '/favorites' },
      { source: '/perfil/notificaciones', destination: '/profile/notifications' },
      { source: '/perfil/pedidos', destination: '/profile/orders' },
      { source: '/perfil', destination: '/profile' },
      { source: '/acceso/iniciar-sesion', destination: '/auth/sign-in' },
      { source: '/acceso/registro', destination: '/auth/register' },
      {
        source: '/acceso/registro-difusion',
        destination: '/auth/register-difussion',
      },
      {
        source: '/acceso/recuperar-clave',
        destination: '/auth/forgot-password',
      },
      {
        source: '/acceso/confirmar-cuenta',
        destination: '/auth/confirm-account',
      },
      { source: '/cerrar-sesion', destination: '/logout' },
    ];
  },
};

export default nextConfig;
