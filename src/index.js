import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./Localization/i18n.js"

import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(<App />);
