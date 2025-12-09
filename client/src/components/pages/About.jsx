import Navbar from "../shared/Navbar";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="bg-white py-16 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-yellow-500">Nestora</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nestora is your trusted platform to find and list properties with ease.
            We help renters and landlords connect seamlessly with verified listings.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We aim to make the home-searching process faster, safer, and more
              transparent. Nestora delivers high-quality property listings, verified
              users, and a smooth booking experience — so you can focus on finding
              a home you love.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=900&q=60"
              alt="mission"
              className="rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </section>
      <section className="bg-yellow-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                🏡 Verified Properties
              </h3>
              <p className="text-gray-600">
                Every listing is reviewed to ensure accurate details so you can browse confidently.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                ⚡ Fast & Smooth Experience
              </h3>
              <p className="text-gray-600">
                Our platform is optimized for speed, making your search incredibly smooth.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                🤝 Trusted By Users
              </h3>
              <p className="text-gray-600">
                Thousands of renters and landlords trust us for secure and transparent property deals.
              </p>
            </div>

          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Built With ❤️ For Your Home Search
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're a landlord wanting to list your property or a renter looking
            for your next home, Nestora supports you at every step.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
