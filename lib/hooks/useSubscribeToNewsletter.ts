import { SyntheticEvent, useRef, useState } from 'react';
import { Form, FormState } from '../types';

import { usePlausible } from 'next-plausible';
import { baseFetch } from 'pages/api/baseFetch';

export function useSubscribeToNewsletter() {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const plausible = usePlausible();
  const inputEl = useRef(null);

  async function subscribe(e: SyntheticEvent) {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const response = await baseFetch<{ email: string }, { error: string }>(
      '/api/subscribe',
      { email: inputEl.current.value },
      'POST'
    );

    if (!response.ok) {
      setForm({
        state: Form.Error,
        message: response.result.error
      });
      return;
    }

    plausible('Subscribe');

    inputEl.current.value = '';
    setForm({
      state: Form.Success,
      message: `Success! You've been added to the list!`
    });
  }

  return { subscribe, inputEl, form };
}
