const { useState, useEffect } = require("react")

const useTheme = () => {
    const [theme, setTheme] = useState(null);

    useEffect(()=>{
        // this is initializer useEffect
        if (typeof window == "undefined") return;
        if (theme != null) return;
        const appTheme = localStorage.getItem("appTheme");
        if (appTheme == null) return;
        setTheme(appTheme);
    }, []);

    useEffect(()=>{
        if (typeof window == "undefined") return;
        if (theme == null) return;
        localStorage.setItem("appTheme", theme);
        const bodyRef = document.querySelector("body");
        if (theme == "lightMode") {
            bodyRef.classList.add("lightMode");
            bodyRef.classList.remove("darkMode");
            return;
        }
        if (theme == "darkMode") {
            console.log("switching to darkMode");
            bodyRef.classList.add("darkMode");
            bodyRef.classList.remove("lightMode");
            return;
        }
        return;
    }, [theme]);

    return {theme, setTheme};
}

export default useTheme;