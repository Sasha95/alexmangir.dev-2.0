import siteMetadata from '@/data/siteMetadata';
import { ButtonType } from '@/lib/types';
import { Button } from './Button';

export function AuthButton({ supabase }) {
  function handleGitHubLogin() {
    supabase.auth.signIn(
      { provider: 'github' },
      { redirectTo: `${siteMetadata.siteUrl}/community-wall` }
    );
  }
  return (
    <div>
      <Button buttonType={ButtonType.PRIMARY} onButtonClick={handleGitHubLogin}>
        Log in
      </Button>
    </div>
  );
}
