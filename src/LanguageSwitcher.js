import {LanguageContext} from "./LanguageContext";
import React from "react";

class LanguageSwitcher extends Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {({ language, setLanguage }) => (
                    <button onClick={() => setLanguage("jp")}>
                        Switch Language (Current: {language})
                    </button>
                )}
            </LanguageContext.Consumer>
        );
    }
}