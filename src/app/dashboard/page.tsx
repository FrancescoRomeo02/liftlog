export default async function PrivatePage() {
  const user = false;

  return <p>Hello {user ? user : "unknown"}</p>;
}
