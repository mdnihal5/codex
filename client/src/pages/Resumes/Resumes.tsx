import { useState, useContext } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import userContext, { UserContextType } from "../../utils/userContext";
import { useNavigate } from "react-router-dom";
import { Github, TextSelect, Linkedin, Mails, Link2, MoveRight } from "lucide-react";
const ResumeCard = ({ resume, onDelete, userId }: { resume: any; userId: any; onDelete: any }) => {
    return (
        <div className="border border-gray-200 rounded-md shadow-md p-4">
            <p className="light:text-black dark:text-white flex gap-1">
                <Mails size="20" />
                {resume.email}
            </p>
            <p className="light:text-black dark:text-white flex gap-1">
                <Github size="20" />{" "}
                <Link to={resume.github} target="_blank">
                    {resume.github}
                </Link>
            </p>
            <p className="light:text-black dark:text-white flex gap-1">
                <TextSelect size="20" />
                {resume.description}
            </p>
            <p className="light:text-black dark:text-white flex gap-1">
                <Linkedin size="20" />
                <Link to={resume.linkdin} target="_blank">
                    {resume.linkdin}
                </Link>
            </p>
            <p className="light:text-black dark:text-white flex gap-1 items-center mt-2">
                <Link2 size="20" />{" "}
                <Link to={resume.link} target="_blank">
                    <Button size="md">
                        Browse <MoveRight size="20" />
                    </Button>
                </Link>
            </p>
            {resume.userId == userId ? (
                <button onClick={onDelete} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                    Delete
                </button>
            ) : null}
        </div>
    );
};
const ResumeSection = ({ resumes, userId, deleteResume }: { resumes: any[]; userId: any; deleteResume: (postIdToDelete: any, currentUser: any) => void }) => (
    <section className="mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#7c3aed]">Resumes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes && resumes.map((resume: any) => <ResumeCard key={resume._id} resume={resume} userId={userId} onDelete={() => deleteResume(resume._id, userId)} />)}
        </div>
    </section>
);

const Resumes = () => {
    const userContextValue = useContext(userContext) as UserContextType;
    const { resumes, setError, getResumes, setResumes, user } = userContextValue;
    const [email, setEmail] = useState("");
    const [github, setGithub] = useState("");
    const [description, setDescription] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [link, setLink] = useState("");
    const navigate = useNavigate();

    const deleteResume = async (postIdToDelete: any, currentUser: any) => {
        try {
            const res = await fetch(`https://codex-v2-16i3.onrender.com/api/resume/deletepost/${postIdToDelete}/${currentUser}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setResumes((prev) => prev.filter((post: any) => post?._id !== postIdToDelete));
                getResumes();
                toast.success("Post deleted successfully");
            }
        } catch (error) {
            toast.error("Resume not deleted");
            console.log("some error occured ", error);
        }
    };

    const postHandler = async (e: any) => {
        e.preventDefault();
        try {
            const formdata = {
                email: email,
                github: github,
                description: description,
                linkdin: linkedin,
                link: link,
            };
            console.log(formdata);
            const res = await fetch("https://codex-v2-16i3.onrender.com/api/resume/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message);
                navigate("/error");
            }

            if (res.ok) {
                toast.success("Post created successfully");
                getResumes();
            }
        } catch (error) {
            setError("Something went wrong");
            navigate("/error");
        }
    };

    return (
        <div className="flex items-center justify-center m-5  ">
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
                <ResumeSection resumes={resumes} userId={user?._id} deleteResume={deleteResume} />
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
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input id="email" type="text" placeholder="Enter your email" className="col-span-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="github" className="text-right">
                                        Github
                                    </Label>
                                    <Input id="github" type="text" placeholder="Enter your Github link" className="col-span-3" value={github} onChange={(e) => setGithub(e.target.value)} required />
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Input id="description" placeholder="Enter your description" className="col-span-3" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="linkedin" className="text-right">
                                        Linkedin
                                    </Label>
                                    <Input id="linkedin" placeholder="Enter your Linkedin link" className="col-span-3" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} required />
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <Label htmlFor="linkedin" className="text-right">
                                        link
                                    </Label>
                                    <Input id="link" placeholder="Enter your Resume link" className="col-span-3" value={link} onChange={(e) => setLink(e.target.value)} required />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={postHandler}>
                                    Submit
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Resumes;
