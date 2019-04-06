const LABEL = "PROFILE"

// selectors
// profile > name & age
const PROFILE_HEADING = '#profileHeadingWrapper'
const NAME = 'div.identity > span'
const AGE = 'div.identity > p > strong';
// profile > phones
const CONTACT_INFO = '#sidebar';
const CONTAINS_PHONE = 'div.inner.contact > ul.phoneContactInfo';
const PHONE = 'div.inner.contact > ul.phoneContactInfo > li';
const IS_CURRENT = 'span.confirmedCurrent';
const IS_MOBILE = 'strong';
// profile > emails
const CONTAINS_EMAIL = 'div.inner.contact > ul:nth-child(4)';
const EMAIL = 'div.inner.contact > ul:nth-child(4) > li';
// profile > addresses
const MAIN = '#main';
const ADDRESS = 'ul.addresses > li';
const NUM = 'span.num';


const getPhone = $ => {
  const phones = [];
  if ($(CONTACT_INFO).find(CONTAINS_PHONE).length > 0) {
    $(CONTACT_INFO)
      .find(PHONE)
      .each((i, ele) => {
        const phone = $(ele).text().trim().split("  ")[0];
        phones.push({
          phone,
          isCurrent: $(ele).find(IS_CURRENT).length > 0,
          isMobile: $(ele).find(IS_MOBILE).length > 0
        });
      });
  }
  return phones;
};
const getEmail = $ => {
  const emails = [];
  if ($(CONTACT_INFO).find(CONTAINS_EMAIL).length > 0) {
    $(CONTACT_INFO)
      .find(EMAIL)
      .each((i, ele) => {
        const email = $(ele).text();
        emails.push(email);
      });
  }
  return emails;
};
const getAddresses = $ => {
  const addresses = [];
  $(MAIN)
    .find(ADDRESS)
    .each((i, ele) => {
      $(ele).find(NUM).remove();
      $(ele).find('br').replaceWith(' ');
      let address = $(ele).text();
      if ($(ele).find(IS_CURRENT).length > 0) {
        address = address.replace('current', '');
      }
      addresses.push(address);
    })
  return addresses;
};

const profile = $ => ({
  name: $(PROFILE_HEADING).find(NAME).text(),
  age: $(PROFILE_HEADING).find(AGE).html(),
  phone: getPhone($),
  email: getEmail($),
  address: getAddresses($)
});

module.exports = profile;