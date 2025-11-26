type HomePageProps = {
  onStart: () => void;
};

function HomePage({ onStart }: HomePageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 text-center px-4">
      <h1 className="text-4xl font-bold text-slate-900">
        Hello and welcome to your ToDo List!
      </h1>
      <p className="text-base text-slate-600 max-w-md">
        Keep track of everything you need to do in one place. Press start
        whenever you are ready to build your list.
      </p>
      <button
        className="rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        onClick={onStart}
      >
        Start
      </button>
    </div>
  );
}

export default HomePage;

