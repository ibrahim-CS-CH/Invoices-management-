import { useLocale } from "../Context/LocalizeContext";

const SelectLng = () => {
  const { locale, setLocale } = useLocale();
  return (
    // <div className="mx-3 border w-fit py-1 px-2 rounded-lg hover:bg-gray-400 text-xl cursor-pointer">
      locale === "en" ? (
        <button 
        className="border w-fit p-2 rounded-lg hover:bg-gray-300 text-xl"


            title="التغيير الي العربية"
            onClick={() => setLocale("ar")}
        >
          
            العربية
         
        </button>
      ) : (
        <button 
          className="border w-fit p-2 rounded-lg hover:bg-gray-300 text-xl"
        
        title="change to english" onClick={() => setLocale("en")}>
          
            English
        </button>
      )
    // </div>
  );
};

export default SelectLng;
