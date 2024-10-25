import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export type Option = {
    name: string;
    value: string;
};

type Props = {
    placeholder?: string;
    data: Option[];
    onChange?: (data: Option) => void | Promise<void>;
    variant?: "primary" | "secondary";
    fixedPlaceholder?: boolean;
    selected?: string;
};

export default function Dropdown(props: Props) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState("");
    const [displayText, setDisplayText] = useState(props.placeholder ?? props.data[0].name);

    useEffect(() => {
        function handleOnClick(e: MouseEvent) {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(e.target as HTMLElement)) {
                setOpen(false);
            }
        }

        document.addEventListener("click", handleOnClick);

        return () => document.removeEventListener("click", handleOnClick);
    }, []);

    useEffect(() => {
        if (props.selected) {
            const find = props.data.find((d) => d.value == props.selected);
            if (find) {
                setSelected(props.selected);
                if (!props.fixedPlaceholder) setDisplayText(find.name);
            }
        } else {
            setSelected("");
        }
    }, [props.data, props.selected, props.fixedPlaceholder]);

    function handleSelect(data: Option) {
        return () => {
            setOpen(false);
            setSelected(data.value);
            if (!props.fixedPlaceholder) setDisplayText(data.name);

            props.onChange?.(data);
        };
    }

    return (
        <div className="relative ml-auto isolate" ref={dropdownRef}>
            <button
                type="button"
                className={`flex justify-between items-center p-2 rounded-md w-full ${
                    props.variant == "secondary"
                        ? "bg-white text-black border-2"
                        : "bg-sky-400 text-white"
                }`}
                onClick={() => setOpen((s) => !s)}
            >
                {displayText}
                <IoIosArrowDown
                    className={`${open ? "-rotate-180" : "rotate-0"} transition-transform`}
                />
            </button>
            {open && (
                <div className="absolute w-full drop-shadow-xl overflow-hidden rounded-md">
                    <ul>
                        {props.data.map((d) => (
                            <li key={d.value} className="bg-white">
                                <button
                                    className={`w-full hover:bg-opacity-40 text-left p-2 ${
                                        props.variant == "secondary"
                                            ? "hover:bg-black"
                                            : "hover:bg-sky-400"
                                    } ${
                                        selected == d.value
                                            ? props.variant == "secondary"
                                                ? "bg-black/20"
                                                : "bg-sky-400/20"
                                            : "bg-white"
                                    }`}
                                    onClick={handleSelect(d)}
                                >
                                    {d.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
