import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";

export default function dashboard() {
  return (
    <main className="px-10">
      <section className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-grow">
          {/* Dashboard content */}
          <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome to your dashboard!</p>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  );
}
