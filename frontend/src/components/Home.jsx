import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />

      <div className="min-h-[90vh] w-full bg-black flex flex-col items-center justify-center text-white px-6 py-10">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-wide text-center">
          Task-Flow System
        </h1>

        <p className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl text-center leading-relaxed">
          🤖 Efficiently assign, track, and manage tasks across your workforce.<br />
          ⚡ Stay organized and boost productivity with real-time task updates.
        </p>

      </div>
    </>
  );
};

export default Home;
