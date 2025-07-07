const GlowButton = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses = "px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group";
  const variants = {
    primary: "bg-gradient-to-r from-[#f1ca13] to-[#ff7f11] text-[#1d3446] hover:shadow-2xl hover:shadow-[#f1ca13]/50",
    secondary: "bg-gradient-to-r from-[#1d3446] to-[#0a84c1] text-white hover:shadow-2xl hover:shadow-[#0a84c1]/50",
    outline: "border-2 border-[#f1ca13] text-[#f1ca13] hover:bg-[#f1ca13] hover:text-[#1d3446] hover:shadow-2xl hover:shadow-[#f1ca13]/50"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  );
};

export default GlowButton;
