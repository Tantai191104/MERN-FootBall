import { Carousel } from "antd";
function Banner() {
  const playerImages: string[] = [
    "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1471&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1471&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601987077220-4ec3d0e5f5e5?q=80&w=1471&auto=format&fit=crop",
  ];
  return (
    <section
      className="py-16 px-6 rounded-3xl shadow-lg mt-8 max-w-6xl mx-auto"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="backdrop-blur-sm bg-white/70 rounded-3xl py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Text section */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-green-700 leading-[1.4] text-balance">
              Welcome to <br />
              <span className="text-black">Football Players Hub</span>
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed max-w-xl mx-auto md:mx-0">
              Explore your favorite players, get stats, follow clubs, and stay
              updated with all football action.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById("players-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition cursor-pointer"
            >
              Explore Players
            </button>
          </div>

          {/* Image section */}
          <div className="flex-1 flex justify-center">
            <div className="w-[320px] h-[240px] sm:w-[400px] sm:h-[300px]">
              <Carousel
                autoplay
                dots
                draggable
                pauseOnHover
                effect="fade"
                className="h-full rounded-2xl overflow-hidden"
              >
                {playerImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center h-full"
                  >
                    <img
                      src={imgUrl}
                      alt={`Player ${index + 1}`}
                      className="h-full w-full object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
