import type { Route } from "./+types/home";
import { Report } from "~/report/report";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Report to React Router!" },
  ];
}

export default function Home() {
  return <div> <aside></aside>
    <Report /></div>
}
