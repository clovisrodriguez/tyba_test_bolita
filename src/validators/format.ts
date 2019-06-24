export const formatPhoneNumber = phone => {
  if (!phone.includes('+57')) {
    const cleaned = `${phone.replace(/\D/g, '')}`;
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+57 (${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  }
  return phone;
};
