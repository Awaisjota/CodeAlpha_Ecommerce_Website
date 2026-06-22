const Button = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center
        px-4 py-2 rounded-lg font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-400
        active:scale-95

        bg-[#2563EB] text-white
        hover:bg-blue-700

        disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70

        ${className}
      `}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;