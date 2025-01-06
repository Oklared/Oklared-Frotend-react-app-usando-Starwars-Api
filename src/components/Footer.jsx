export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-gray-800 to-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo y descripción breve */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 hover:text-yellow-400 transition-all">
            May the Force Be With You
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-2">
            Explore the galaxy of Star Wars data and lore.
          </p>
        </div>

        {/* Información adicional */}
        <div className="text-center text-gray-500 text-sm md:text-base">
          <p className="mb-2">© {new Date().getFullYear()} Star Wars API. All rights reserved.</p>
          <p className="italic">
            Developed in the outer rim, inspired by the Jedi Code and the Galactic Republic.
          </p>
        </div>

        {/* Barra decorativa */}
        <div className="mt-8 w-full h-0.5 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500" />
      </div>
    </footer>
  );
}
