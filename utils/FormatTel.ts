const formatPhoneNumber = (value: string) => {
  if (!value) return "";
  const phoneNumber = value.replace(/[^\d]/g, "");
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) {
    return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`;
  }
  if (phoneNumber.length < 9) {
    return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7)}`;
  }
  return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 9)}  ${phoneNumber.slice(9, 12)}`;
};

export { formatPhoneNumber };
