import { useAuth } from '../../../app/hooks/useAuth';
import { Button } from '../../components/Button';

export function Dashboard() {
  const { signout } = useAuth();

  return (
    <div>
      <h1>Dashiboard Page</h1>
      <Button onClick={signout}>
        Sair
      </Button>
    </div>
  );
}
