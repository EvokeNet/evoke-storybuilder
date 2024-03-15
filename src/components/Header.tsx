const Header = ({ title, alignment = "mx-auto" }) => {
  return (
    <header className="mt-0.5 bg-gray-50 py-6">
      <div className="container mx-auto mx-auto mb-4 flex max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h1
          className={`text-3xl font-bold tracking-tight text-gray-900 ${alignment}`}
        >
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
