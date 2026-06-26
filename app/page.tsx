// Render on each request so the date always reflects the current day.
export const dynamic = "force-dynamic";

export default function Home() {
  const tanaan = new Date().toLocaleDateString("fi-FI", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="container">
      <h1 className="title">Koeketju toimii</h1>
      <p className="date">{tanaan}</p>
    </main>
  );
}
