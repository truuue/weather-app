import React from "react";

interface LocaleProps {
  city: string;
}

const Locale: React.FC<LocaleProps> = ({ city }) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-2">{city}</h2>
      <p className="text-2xl font-semibold">
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </p>
      <p className="text-sm">
        {new Date().toLocaleDateString("en-EN", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
};

export default Locale;
