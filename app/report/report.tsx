import logoDark from './logo-dark.svg';
import logoLight from './logo-light.svg';
import { Table } from '~/report/components/Table';

export function Report() {
  return (
    <main className="flex items-start justify-center pt-16 pb-4 px-2 bg-gray-50 box-border">
      <Table />
    </main>
  );
}
