import { useState } from "react";
import DownArrow from "../../icons/DownArrow";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

const DOBInput = () => {
    const [dob, setDob] = useState({ month: "", day: "", year: "" });

    const handleChange = (e) => {
        setDob({ ...dob, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <div className="flex gap-3 mt-2">
                {/* Month Dropdown */}
                <div className="relative w-1/3">
                    <select
                        name="month"
                        value={dob.month}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 cursor-pointer appearance-none"
                    >
                        <option value="" disabled>Month</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>

                    {/* Custom Arrow Icon */}
                    <DownArrow />
                </div>

                {/* Day Dropdown */}
                <div className="relative w-1/3">
                    <select
                        name="day"
                        value={dob.day}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 cursor-pointer appearance-none"
                    >
                        <option value="" disabled>Day</option>
                        {days.map((day, index) => (
                            <option key={index} value={day}>{day}</option>
                        ))}
                    </select>

                    {/* Custom Arrow Icon */}
                    <DownArrow />
                </div>

                {/* Year Dropdown */}
                <div className="relative w-1/3">
                    <select
                        name="years"
                        value={dob.day}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 cursor-pointer appearance-none"
                    >
                        <option value="" disabled>Year</option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>

                    {/* Custom Arrow Icon */}
                    <DownArrow />
                </div>
            </div>
        </div>
    );
};

export default DOBInput;
