import ReactDOM from "react-dom/client";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import languages from "./common/localization/languages";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/Store/store";
i18next
	.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		supportedLngs: languages.map(({ code }) => code),
		fallbackLng: "en",
		debug: false,
		// Options for language detector
		detection: {
			order: ["path", "cookie", "htmlTag"],
			caches: ["cookie"],
		},
		//react: { useSuspense: false },
		backend: {
			loadPath: "/assets/locales/{{lng}}/translation.json",
		},
	});



const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(

	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>


);
