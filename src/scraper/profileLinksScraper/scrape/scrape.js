// selectors
const MAIN = '#main';
const PROFILE_LINK = 'div.actions > a';

const profileLinks = async $ => {
  const links = [];
  await $(MAIN)
    .find(PROFILE_LINK)
    .each((i, ele) => {
      const link = $(ele).attr('href');
      links.push(link);
    });
  return links;
};

module.exports = profileLinks;
