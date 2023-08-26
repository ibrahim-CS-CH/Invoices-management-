import { useLocale } from "../Context/LocalizeContext";

const SelectLng = () => {
  const { locale, setLocale } = useLocale();
  return (
    <div className="mx-3">
      {locale === "en" ? (
        <button 
            title="التغيير الي العربية"
            onClick={() => setLocale("ar")}
        >
          <p>
            العربية
          </p>
        </button>
      ) : (
        <button title="change to english" onClick={() => setLocale("en")}>
          <p
            >
            English
          </p>
        </button>
      )}
    </div>
  );
};

export default SelectLng;
