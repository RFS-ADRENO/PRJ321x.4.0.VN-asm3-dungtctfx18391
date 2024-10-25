import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function ProductSearchBar() {
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        navigate("/search?q=" + new FormData(e.currentTarget).get("q"));
    }

    return (
        <form className="flex items-center justify-center border-b mr-auto" onSubmit={handleSubmit}>
            <input
                name="q"
                className="mr-2 font-semibold focus:outline-none w-80 py-2"
                placeholder="Tìm Kiếm"
                required
            />
            <button>
                <IoIosSearch size={24} />
            </button>
        </form>
    );
}
