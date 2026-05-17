export default function Navbar() {
  return (
    <div className="w-full h-16 bg-white border-b flex items-center justify-between px-6">
      
      <h1 className="text-2xl font-bold text-emerald-600">
        InstaMind
      </h1>

      <div className="flex items-center gap-4">
        <button

          onClick={() => {

            localStorage.removeItem("token");

            window.location.href = "/login";

          }}

          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

