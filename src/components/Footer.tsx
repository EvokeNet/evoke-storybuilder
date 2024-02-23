import Image from "next/image";
import Link from "next/link";

// import Logo from "../../public/ss-logo-color.svg";

const Footer = () => {
    return (
        <footer className="bg-gray-50 mt-8">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex justify-center text-teal-600 sm:justify-start">
                <Link className="block text-teal-600" href="/">
                    <span className="sr-only">Supersala: início</span>
                    {/* <Image alt="Supersala" width="150" src={Logo} /> */}
                </Link>
                </div>

                <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                    Copyright &copy; 2024. All rights reserved.
                </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;