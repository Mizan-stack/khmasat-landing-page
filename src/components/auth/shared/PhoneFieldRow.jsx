import CountrySelect from '../country-select/CountrySelect'
import { inputClass } from './inputClass'

function PhoneFieldRow({ value, onChange, onBlur, placeholder, error, countryIso, onChangeCountry }) {
  return (
    <div className="flex flex-col-reverse gap-2.5 md:flex-row md:items-start">
      <input
        type="tel"
        inputMode="numeric"
        dir="ltr"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${inputClass(error)} w-full`}
      />
      <CountrySelect value={countryIso} onChange={onChangeCountry} error={error} />
    </div>
  )
}

export default PhoneFieldRow
