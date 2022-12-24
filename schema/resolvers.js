import fetch from 'node-fetch';
import { NOTION_TOKEN } from '../config/index.js';

export const resolvers = {
  Query: {
    pages(_, { databaseId, direction }) {
      const option = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-02-22',
        },
        body: JSON.stringify({
          sorts: [
            {
              property: 'Id',
              direction: direction ?? 'ascending',
            },
          ],
        }),
      };
      return fetch(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        option
      )
        .then(res => res.json())
        .then(json => json.results);
    },
  },
};
