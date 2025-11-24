import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header"

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();

        const payload = {
            name: userName,
            email: email,
            password: password
        }

        axios.post('http://localhost:3000/user/register', payload)
            .then((res) => {
                setLoading(false)
                toast("Registration Successful");
                console.log("User register", res);
                setUserName('');
                setEmail('');
                setPassword('');

                setTimeout(() => {
                    navigate('/login');
                }, 700);
            })
            .catch((err) => {
                toast("Registration Failed");
                console.log("Error while reiteration", err)
                setLoading(false)
            })

        setUserName('')
        setEmail('')
        setPassword('')
    };

    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-[90vh] bg-black text-white px-4">
                <form className="w-80 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">Username</label>
                        <input type="text" id="username"
                            className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
                        <input type="email" id="email"
                            className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                        <input type="password" id="password"
                            className="w-full p-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button disabled={loading} type="submit"
                        className={`w-full py-2.5 rounded-lg font-medium text-sm transition 
                            ${loading
                                ? "bg-blue-900 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}>
                        {loading ? "Submitting..." : "Sign Up"}
                    </button>
                </form>
            </div>

        </>
    )
}

export default Registration