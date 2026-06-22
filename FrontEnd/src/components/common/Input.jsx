function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full
        px-4
        py-3
        bg-white
        border
        border-gray-300
        rounded-lg
        text-gray-800
        placeholder-gray-400
        shadow-sm
        transition-all
        duration-200
        outline-none
        hover:border-gray-400
        focus:border-indigo-500
        focus:ring-4
        focus:ring-indigo-100
        focus:shadow-md
        ${className}
      `}
    />
  );
}

export default Input;