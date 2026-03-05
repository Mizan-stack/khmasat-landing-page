function FlagIcon({ isoCode }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${isoCode.toLowerCase()}.png`}
      alt=""
      className="h-4 w-6 rounded-[2px] object-cover shadow-sm"
      loading="lazy"
      decoding="async"
    />
  )
}

export default FlagIcon
