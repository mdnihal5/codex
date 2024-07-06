import { useState, useContext } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import userContext, { UserContextType } from "../../utils/userContext";
import { useNavigate, Link } from "react-router-dom";

const BlogCard: React.FC<{ blog: any; userId: any; onDelete: () => void }> = ({ blog, onDelete }) => {
    return (
        <div className="border border-gray-200 flex-col items-center gap-2 rounded-md shadow-md p-4">
            <h3 className="text-lg font-semibold light:text-black dark:text-white">{blog.title}</h3>
            <p className="light:text-black dark:text-white">Category: {blog.category}</p>
            <p className="light:text-black dark:text-white">Content: {blog.content}</p>
            <p className="light:text-black dark:text-white mt-4">
                <Link to={blog.link} target="_blank">
                    <Button>Access Resource</Button>
                </Link>
            </p>
            <button onClick={onDelete} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                Delete
            </button>
        </div>
    );
};

const BlogSection: React.FC<{
    category: string;
    blogs: any;
    userId: any;
    deletePost: (postIdToDelete: string, currentUser: string) => void;
}> = ({ category, blogs, userId, deletePost }) => (
    <section className="mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#7c3aed]">{category}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs && blogs.map((blog: any) => <BlogCard key={blog._id} blog={blog} userId={userId} onDelete={() => deletePost(blog?._id, userId)} />)}
        </div>
    </section>
);

const Resources: React.FC = () => {
    const navigate = useNavigate();
    const userContextValue = useContext(userContext) as UserContextType;
    const { blogs, setBlogs, setError, getBlogs, user } = userContextValue;
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [link, setLink] = useState("");

    const deletePost = async (postIdToDelete: string, currentUser: string) => {
        console.log(currentUser, postIdToDelete);
        try {
            const res = await fetch(`https://codex-v2-16i3.onrender.com/api/blog/deletepost/${postIdToDelete}/${currentUser}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setBlogs((prev) => prev.filter((post: any) => post?._id !== postIdToDelete));
                getBlogs();
                toast.success("Post deleted successfully");
            }
        } catch (error) {
            toast.error("Post deletion failed");
            console.log(error);
        }
    };

    const postHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("https://codex-v2-16i3.onrender.com/api/blog/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: category,
                    title: title,
                    content: content,
                    link: link,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message);
                navigate("/error");
            }

            if (res.ok) {
                toast.success("Post created successfully");
                getBlogs();
            }
        } catch (error) {
            setError("Something went wrong");
            navigate("/error");
        }
    };

    const categories = Array.from(new Set(blogs?.map((blog: any) => blog?.category)) || []);

    return categories ? (
        <div className="flex items-center justify-center m-5">
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
                {categories &&
                    categories.map((category) => (
                        <BlogSection key={category} category={category} blogs={blogs.filter((blog: any) => blog?.category === category)} userId={user?._id} deletePost={deletePost} />
                    ))}
            </div>
            <div className="fixed bottom-4 right-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" className="rounded-full p-4 shadow-lg">
                            <Plus className="h-6 w-6" />
                            <span className="sr-only">Add Resume</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Resume</DialogTitle>
                            <DialogDescription>Fill out the form to add your resume.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={postHandler}>
                            <div className="grid gap-4 py-4">
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Category
                                    </Label>
                                    <Input id="category" type="text" placeholder="Enter your category" className="col-span-3" value={category} onChange={(e) => setCategory(e.target.value)} required />
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input id="title" type="text" placeholder="Enter your Title" className="col-span-3" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Input id="description" placeholder="Enter your description" className="col-span-3" value={content} onChange={(e) => setContent(e.target.value)} required />
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="link" className="text-right">
                                        Link
                                    </Label>
                                    <Input id="link" placeholder="Enter your link" className="col-span-3" value={link} onChange={(e: any) => setLink(e.target.value)} required />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Submit</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    ) : (
        <h1>Loading...</h1>
    );
};

export default Resources;
