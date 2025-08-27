export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[90%] max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to EduPortal
        </h1>
        <p className="text-gray-600 mb-8">
          Choose your role to continue
        </p>

        <div className="flex flex-col gap-4">
          <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Student Login
          </button>
          <button className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
            Teacher Login
          </button>
          <button className="w-full py-3 rounded-xl bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition">
            Staff Login
          </button>
          <button className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition">
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}
