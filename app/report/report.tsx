import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import {Table} from "~/report/components/Table";

export function Report() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <Table/>
    </main>
  );
}
