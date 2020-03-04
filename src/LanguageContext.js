import React, { createContext, useState } from "react";

// set the defaults
export const LanguageContext = React.createContext({
    language: "en",
    setLanguage: () => {}
});
