function NavBar() {
  return (
    <div className="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div>
        <h1 className="text-white p-8">
          Demo by{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://dbaweja.co.uk/"
            className="text-indigo-400 hover:text-indigo-300 text-xl"
          >
            DavAppler
          </a>
        </h1>
      </div>
    </div>
  );
}

export default NavBar;
