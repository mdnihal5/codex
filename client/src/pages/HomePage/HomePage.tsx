import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
function HomePage() {
    return (
        <div className="flex min-h-screen flex-col dark:text-black">
            <section className="light:bg-[#8B5CF6] py-16 dark:text-white">
                <div className="container mx-auto pt-8 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Unlock Your Potential</h1>
                    <p className="mt-6 text-lg leading-8">Explore our comprehensive resources and tools to enhance your development journey.</p>
                    <div className="mt-10 flex space-x-6">
                        <Link className="rounded-md bg-[#003366] flex gap-1 px-4 py-2 text-sm text-white font-medium hover:bg-[#002147]" to="/resources">
                            Explore Resources <ArrowRight size="20" />
                        </Link>
                    </div>
                </div>
            </section>
            <section className="light:bg-[#F3F4F6] py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl dark:text-white font-bold tracking-tight">Resources</h2>
                    <div className="mt-10 grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-md bg-white p-6 shadow-lg hover:shadow-2xl duration-300 transition-all  hover:scale-105">
                            <h3 className="text-xl font-bold">Web Development</h3>
                            <p className="mt-4 text-gray-600">Explore our collection of web development resources, including tutorials, articles, and tools.</p>
                            <Link className="mt-4 inline-flex items-center text-[#003366] hover:text-[#002147]" to="/resources">
                                Learn More
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                        <div className="rounded-md bg-white p-6 shadow-lg hover:shadow-2xl duration-300 transition-all  hover:scale-105">
                            <h3 className="text-xl font-bold">DSA</h3>
                            <p className="mt-4 text-gray-600">Dive into our data structures and algorithms resources to sharpen your problem-solving skills.</p>
                            <Link className="mt-4 inline-flex items-center text-[#003366] hover:text-[#002147]" to="/resources">
                                Learn More
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                        <div className="rounded-md bg-white p-6 shadow-lg hover:shadow-2xl duration-300 transition-all  hover:scale-105">
                            <h3 className="text-xl font-bold">Competitive Programming</h3>
                            <p className="mt-4 text-gray-600">Explore our competitive programming resources to improve your problem-solving abilities.</p>
                            <Link className="mt-4 inline-flex items-center text-[#003366] hover:text-[#002147]" to="/resources">
                                Learn More
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                        <div className="rounded-md bg-white p-6 shadow-lg hover:shadow-2xl duration-300 transition-all  hover:scale-105">
                            <h3 className="text-xl font-bold">Web3</h3>
                            <p className="mt-4 text-gray-600">Discover our Web3 resources, including tutorials, articles, and tools for blockchain development.</p>
                            <Link className="mt-4 inline-flex items-center text-[#003366] hover:text-[#002147]" to="/resources">
                                Learn More
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="light:bg-[#8B5CF6] py-20 dark:text-white">
                <div className="container mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl dark:text-white font-bold tracking-tight">Help Desk</h2>
                    <p className="mt-6 text-lg leading-8">Get personalized assistance and support for your development needs.</p>
                    <div className="mt-10 flex space-x-6 text-white">
                        <Link className="rounded-md bg-[#003366] px-4 py-2 text-sm font-medium hover:bg-[#002147]" to="/">
                            Contact Us
                        </Link>
                        <Link className="rounded-md bg-[#003366] px-4 py-2 text-sm font-medium hover:bg-[#002147]" to="/chats">
                            Help Desk
                        </Link>
                    </div>
                </div>
            </section>
            <section className="light:bg-[#F3F4F6] py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl dark:text-white font-bold tracking-tight">Roadmaps</h2>
                    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-md bg-white p-6 shadow-lg hover:shadow-2xl duration-300 transition-all  hover:scale-105">
                            <h3 className="text-xl font-bold">Web Development Roadmap</h3>
                            <p className="mt-4 text-gray-600">Follow our comprehensive web development roadmap to guide your learning journey.</p>
                            <Link className="mt-4 inline-flex items-center text-[#003366] hover:text-[#002147]" to="https://roadmap.sh" target="_blank">
                                Explore Roadmap
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                        <div className="rounded-md bg-white p-6 shadow-lg hover:shadow-2xl duration-300 transition-all  hover:scale-105">
                            <h3 className="text-xl font-bold">Frontend Roadmap</h3>
                            <p className="mt-4 text-gray-600">Learn to build awesome frontend designs.</p>
                            <Link className="mt-4 inline-flex items-center text-[#003366] hover:text-[#002147]" to="https://roadmap.sh/frontend" target="_blank">
                                Explore Roadmap
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                        <div className="rounded-md bg-white p-6 shadow-lg hover:shadow-2xl duration-300 transition-all  hover:scale-105">
                            <h3 className="text-xl font-bold">Backend Roadmap</h3>
                            <p className="mt-4 text-gray-600">Learn to build awesome APIs for your backend.</p>
                            <Link className="mt-4 inline-flex items-center text-[#003366] hover:text-[#002147]" to="https://Roadmap.sh/backend" target="_blank">
                                Explore Roadmap
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                        <div className="rounded-md bg-white p-6 shadow-lg hover:shadow-2xl duration-300 transition-all  hover:scale-105">
                            <h3 className="text-xl font-bold">DevOps Roadmap</h3>
                            <p className="mt-4 text-gray-600">Step by step guide for DevOps, SRE, or any other Operations Role in 2024</p>
                            <Link className="mt-4 inline-flex items-center text-[#003366] hover:text-[#002147]" to="https://roadmap.sh/frontend" target="_blank">
                                Explore Roadmap
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-[#8B5CF6] py-2 dark:text-white">
                <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row sm:items-start sm:px-6 lg:px-8">
                    <div>
                        <Link className="text-2xl font-bold" to="/">
                            CodeX
                        </Link>
                        <p className="mt-4 text-gray-300">Empowering developers with comprehensive resources and tools.</p>
                    </div>
                    <div className="mt-6 flex space-x-6 sm:mt-0">
                        <Link className="text-gray-300 hover:text-gray-200" to="/">
                            Twitter
                        </Link>
                        <Link className="text-gray-300 hover:text-gray-200" to="https://github.com/mdnihal5" target="_blank">
                            GitHub
                        </Link>
                        <Link className="text-gray-300 hover:text-gray-200" to="/" target="_blank">
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
