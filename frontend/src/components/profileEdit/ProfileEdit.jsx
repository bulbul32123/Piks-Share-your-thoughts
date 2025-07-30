import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { IoClose } from "react-icons/io5";

import DOBInput from "./DOBInput";

const ProfileEdit = ({ setIsEditProfileModalOpen, isEditProfileModalOpen }) => {
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    location: "",
    website: "",
    dob: "",
    userImage: "",
    bannerImage: "",
  });

  const bannerFileInput = useRef(null);
  const avatarFileInput = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({
        ...formData,
        [name]: URL.createObjectURL(files[0]),
      });
    }
  };

  const handleRemoveImage = (imageType, inputRef) => {
    setFormData({
      ...formData,
      [imageType]: "",
    });

    inputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center relative">
      <div className="fixed inset-0 z-[10] bg-gray-500/40 transition-opacity"></div>

      <div
        className="w-full md:w-[40rem] fixed h-[80%]  overflow-hidden z-20 top-20 p-6 dark:bg-black dark:text-white rounded-lg shadow-xl"
        ref={useClickOutside(setIsEditProfileModalOpen, isEditProfileModalOpen)}
      >
        <div className="flex justify-between items-center px-5  pb-4">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <button
            type="submit"
            className="py-2 px-4 bg-black dark:bg-white hover:bg-gray-200 text-white dark:text-black font-semibold rounded-full"
          >
            Save
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pb-14 overflow-x-hidden h-[100%] scrollbar-hide w-full">
   
          <div className="relative w-full h-[13.5rem] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
            {formData.bannerImage ? (
              <>
                <img
                  src={formData.bannerImage}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
             
                <button
                  onClick={() => handleRemoveImage("bannerImage", bannerFileInput)}
                  className="absolute top-2 z-10 right-2 bg-black/60 p-1 rounded-full hover:bg-black/80 transition"
                >
                  <IoClose size={20} className="text-white" />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Upload Banner
              </div>
            )}
            <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <input
                type="file"
                accept="image/*"
                name="bannerImage"
                className="hidden"
                ref={bannerFileInput}
                onChange={handleImageChange}
              />
              <span className="text-white text-sm font-medium">Change Banner</span>
            </label>
          </div>

          <div className="relative w-32 h-32 !mt-[-3rem] mx-auto rounded-full border-4 border-black dark:border-gray-900 bg-gray-200 dark:bg-gray-800 overflow-hidden">
            {formData.userImage ? (
              <>
                <img
                  src={formData.userImage}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemoveImage("userImage", avatarFileInput)}
                  className="absolute top-5 z-10 right-2 bg-black/60 p-1 rounded-full hover:bg-black/80 transition"
                >
                  <IoClose size={18} className="text-white" />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                +
              </div>
            )}
            <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full">
              <input
                type="file"
                accept="image/*"
                name="userImage"
                className="hidden"
                ref={avatarFileInput}
                onChange={handleImageChange}
              />
              <span className="text-white text-xs font-medium">Edit</span>
            </label>
          </div>

          <div className="!-mt-3">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-gray-100 dark:bg-black dark:text-white outline-none rounded-sm"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-gray-100 dark:bg-black dark:text-white outline-none rounded-sm"
              placeholder="Tell us something about yourself"
            />
          </div>

          <DOBInput />

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-gray-100 dark:bg-black dark:text-white outline-none rounded-sm"
              placeholder="Your current location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-gray-100 dark:bg-black dark:text-white outline-none rounded-sm"
              placeholder="Your personal or business website"
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
