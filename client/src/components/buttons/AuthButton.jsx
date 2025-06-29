import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthButton({ dispatch, userData, action, text, loadingText, clearData }) {
    const { user, status } = useSelector(state => state.user)
    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault()
        try {
            const response = await dispatch(action(userData)).unwrap();
            if (response?.success) {
                clearData({
                    name: "",
                    email: "",
                    password: "",
                })
                toast.success(response?.message)
                navigate("/home")
            }

        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }
    return (
        <button
            // type="submit"
            className="w-full py-3 px-4 my-2 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            onClick={submit}
            disabled={status === "loading"}
        >
            {status === "loading" ? loadingText : text}
        </button>
    )

}