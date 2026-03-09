interface Props {
  onAdd: () => void;
}

const Navbar = ({ onAdd }: Props) => {
  return (
    <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl shadow-lg border border-slate-800">
      <h2 className="text-xl font-semibold text-white">
        Welcome Back 👋
      </h2>

      <button
        onClick={onAdd}
        className="bg-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-500 transition"
      >
        + Add Task
      </button>
    </div>
  );
};

export default Navbar;
