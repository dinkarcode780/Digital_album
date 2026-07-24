import React, { useState } from "react";
import {
  FaCloudUploadAlt,
  FaImages,
  FaVideo,
  FaTrash,
} from "react-icons/fa";

const AdminMedia = () => {
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const previewFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
    }));

    setFiles([...files, ...previewFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Upload Media
        </h1>

        <p className="text-gray-500 mt-2">
          Upload images & videos for an event.
        </p>

      </div>

      {/* Form */}

      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="font-semibold">
              Event
            </label>

            <select className="w-full border rounded-xl p-3 mt-2">

              <option>Select Event</option>

              <option>Rahul Wedding</option>

              <option>Ankit Engagement</option>

            </select>

          </div>

          <div>

            <label className="font-semibold">
              Category
            </label>

            <select className="w-full border rounded-xl p-3 mt-2">

              <option>Wedding</option>

              <option>Birthday</option>

            </select>

          </div>

          <div>

            <label className="font-semibold">
              Sub Category
            </label>

            <select className="w-full border rounded-xl p-3 mt-2">

              <option>Haldi</option>

              <option>Reception</option>

            </select>

          </div>

          <div>

            <label className="font-semibold">
              Download Permission
            </label>

            <select className="w-full border rounded-xl p-3 mt-2">

              <option>Disabled</option>

              <option>Enabled</option>

            </select>

          </div>

        </div>

      </div>

      {/* Upload Box */}

      <label className="border-2 border-dashed border-purple-300 rounded-2xl bg-white p-10 flex flex-col items-center justify-center cursor-pointer hover:border-purple-600 transition">

        <FaCloudUploadAlt className="text-6xl text-purple-600" />

        <h2 className="text-2xl font-bold mt-4">
          Drag & Drop Files
        </h2>

        <p className="text-gray-500 mt-2">
          Upload Multiple Images & Videos
        </p>

        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleChange}
          className="hidden"
        />

      </label>

      {/* Preview */}

      {files.length > 0 && (

        <div>

          <h2 className="text-2xl font-bold mb-5">
            Selected Files
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {files.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >

                {item.type === "image" ? (

                  <img
                    src={item.preview}
                    className="w-full h-52 object-cover"
                  />

                ) : (

                  <video
                    src={item.preview}
                    className="w-full h-52 object-cover"
                  />

                )}

                <div className="p-4">

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2">

                      {item.type === "image" ? (
                        <FaImages className="text-blue-600" />
                      ) : (
                        <FaVideo className="text-red-600" />
                      )}

                      {item.type}

                    </span>

                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500"
                    >

                      <FaTrash />

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* Upload */}

      <div className="flex justify-end">

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold">

          Upload Media

        </button>

      </div>

    </div>
  );
};

export default AdminMedia;