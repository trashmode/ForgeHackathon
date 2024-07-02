import api, { route } from "@forge/api";
import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getUser', async (req) => {
  const response = await api.asUser().requestConfluence(route`/wiki/rest/api/user/current`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  const value = await response.json();

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(value);
  return value;
});

resolver.define('getContent', async(req) => {
  const response = await api.asUser().requestConfluence(route`/wiki/rest/api/content`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  
  const value = await response.json();
  console.log(`Response: ${response.status} ${response.statusText}`);
  let pageId = null;
  for (const page in value) {
    if (page.type === 'type' && page.title === 'volunteer demo') {
      pageId = page.id;
    }
  }

  return pageId;
})

export const handler = resolver.getDefinitions();
