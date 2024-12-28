export const playerData = {
  id: 1234567890,
  language_code: 'en-us',
  premiumEnabledAt: 1672531200,
  character: {
    id: 1,
    name: 'Hero',
    level: 25,
    abilities: ['fireball', 'shield', 'heal'],
  },
  pet: {
    id: 101,
    name: 'Fluffy',
    type: 'dragon',
    level: 10,
  },
  statusLevel: 15,
  purchased_items: 5,
};

export const translationsData = [
  { id: 'screen00_heading', text: 'Мир, где игровые квесты сочетаются с реальной пользой. Мы создаем экосистему, которая работает для тебя!', category: 'header' },
  { id: 'screen00_subheading', text: 'play learn earn', category: 'subheader' },
];

export const initData = "query_id=AAHO5e9nAAAAAM7l72fwSdso&user=%7B%22id%22%3A1743775182%2C%22first_name%22%3A%22Alex%20Dev%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Xanhadev%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1717573575&hash=ac51630818f4da403aa8692c265c3fa1dd1075048bacb40f2938938a6935830f"

export const initDataUnsafe = {
  query_id: "AAHO5e9nAAAAAM7l72fwSdso",
  user: {
    id: 1743775182,
    first_name: "Alex Dev",
    last_name: "",
    username: "Xanhadev",
    language_code: "en",
    allows_write_to_pm: true,
  },
  receiver: null,
  chat: null,
  chat_type: null,
  chat_instance: null,
  start_param: null,
  can_send_after: null,
  auth_date: 1717573575,
  hash: "ac51630818f4da403aa8692c265c3fa1dd1075048bacb40f2938938a6935830f",
};
