import { Link } from "react-router-dom";
import bgAbout from "@assets/bg_about.png";

type Props = {
    title: string;
    pathname: string;
};

export default function About(props: Props) {
    return (
        <div className="w-full h-[640px] relative flex justify-center items-center">
            <img src={bgAbout} alt="" className="w-full h-full object-cover object-center brightness-50" />
            <div className="absolute text-white">
                <h1 className="text-6xl font-semibold uppercase">{props.title}</h1>
                <div className="text-lg text-center mt-2">
                    <Link to="/">Home</Link>
                    <span className="mx-2 text-zinc-500">/</span>
                    <Link to={props.pathname}>{props.title}</Link>
                </div>
            </div>
        </div>
    );
}
