export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4">
      <h1 className="text-8xl font-bold text-emerald-500">
        404
      </h1>

      <p className="text-2xl font-semibold mt-4 text-zinc-700">
        Page Not Found
      </p>

      <p className="text-zinc-500 mt-2">
        The page you are looking for does not exist.
      </p>

      <a
        href="/"
        className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl transition"
      >
        Go Home
      </a>
    </div>
  );
}