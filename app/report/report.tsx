import { Table } from '~/report/components/Table';
import { Header } from '~/report/components/Header';
import { Stats } from '~/report/components/Stats';


export function Report() {

  return (
    <main className="flex flex-col w-screen items-start justify-center pt-16 pb-4 px-2 bg-gray-50 box-border">
      <Header />
      <Stats />

      <Table />
    </main>
  );
}
