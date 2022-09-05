import { ChangeEvent, useContext } from 'react';
import { Locale } from 'utilities/i18n/enums/locale.enum';
import { intl } from 'utilities/i18n/intl.utility';
import { IntlContext } from 'utilities/i18n/IntlContext';
import './App.css';

function App() {
  const intlContext = useContext(IntlContext);

  function handleLocaleChange(evt: ChangeEvent<HTMLSelectElement>) {
    const locale = evt.target.value as Locale;

    intlContext.setLocale(locale);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {intl.translate(
            { id: 'Welcome to the <a>SpaceDev</a> CRA template' },
            {
              a: (label) => (
                <a
                  href="https://www.spacedev.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ),
            },
          )}
        </p>

        <select
          name="locale"
          id="locale-select"
          value={intlContext.locale}
          onChange={handleLocaleChange}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </header>
    </div>
  );
}

export default App;
