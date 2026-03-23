const Profile = ({ currentUser }) => {
  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{
          border: "1.5px solid #c7d2fe",
          boxShadow: "0 4px 16px rgba(67,56,202,0.12)",
        }}
      >
        <div className="bg-indigo-700 px-6 py-8 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-2xl font-medium text-indigo-700">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-white mb-1">
              {currentUser.name}
            </p>
            <p className="text-sm text-indigo-300">{currentUser.role}</p>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-400">Name</span>
            <span className="text-sm font-medium text-gray-800">
              {currentUser.name}
            </span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-400">Role</span>
            <span className="text-sm font-medium text-indigo-700">
              {currentUser.role}
            </span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-400">ID</span>
            <span className="text-sm font-medium text-gray-800">
              {currentUser.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;