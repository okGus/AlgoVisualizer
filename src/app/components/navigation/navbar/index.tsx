import Link from "next/link";

const Navbar = () => {
    return (
    <>
      <div className="w-full h-10 bg-blue-600 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li className="link yap">
                <Link href="/BubbleSort">
                  <p>Bubble Sort</p>
                </Link>
              </li>
              <li className="link yap">
                <Link href="/InsertionSort">
                  <p>Insertion Sort</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
    );
};

export default Navbar;