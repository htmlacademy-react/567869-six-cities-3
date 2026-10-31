import { Helmet } from 'react-helmet-async';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useAppDispatch } from '../../hooks/use-redux';
import { loginAction } from '../../store/action';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRef.current || !passwordRef.current || isSubmitting) {
      return;
    }

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    setError(null);
    setIsSubmitting(true);

    try {
      await dispatch(loginAction({ email, password })).unwrap();
    } catch {
      // eslint-disable-next-line no-console
      console.error('Login failed:', error);
      setError('Authorization error. Please submit the form again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={(evt) => {
              void handleSubmit(evt);
            }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={emailRef}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordRef}
                  disabled={isSubmitting}
                  required
                />
              </div>
              {error && <p role="alert">{error}</p>}
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
