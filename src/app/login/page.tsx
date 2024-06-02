import React from 'react';
import LoginForm from '@exchange-gateway/widgets/login-form/LoginForm';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <main className={`${styles['login-page']} flex min-h-screen flex-col items-center justify-between p-24`}>
      <LoginForm />
    </main>
  );
}
