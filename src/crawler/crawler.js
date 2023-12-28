import Crawler from 'crawler';
import fs from 'fs';

const output = {};

const host = 'https://ckan.pf-sapporo.jp';
const fixedPath = '/dataset/';
const groupList = ['statistics_sapporo'];

const hrefList = [];

let execution = 0;

/**
 *
 * @param {Error} error
 * @param {Crawler.CrawlerRequestResponse} res
 * @param {() => void} done
 * @returns
 */
const crawleResource = (error, res, done) => {
  if (error) {
    console.log(error);
    done();
    return;
  }

  const $ = res.$;
  const tables = $('table');
  const param = {};

  tables.each((_i, table) => {
    const thList = $(table).find('th');

    // Parameter table must have the following thead
    if (
      $(thList['0']).text() !== '列' ||
      $(thList['1']).text() !== 'タイプ' ||
      $(thList['2']).text() !== 'ラベル' ||
      $(thList['3']).text() !== '説明'
    )
      return;

    $(table)
      .find('tr')
      .each((j, tr) => {
        // Exclude thead
        if (j === 0) return;

        let key = '';
        let val = '';

        $(tr)
          .find('td')
          .each((k, td) => {
            if (k === 0) key = $(td).text();
            if (k === 1) {
              if ($(td).text() === 'text') val = '';
              else if ($(td).text() === 'numeric') val = 0;
              else val = '';
            }
          });
        param[key] = val;
      });
  });

  const [, , group, , resourceId] = res.request.uri.path.split('/');
  if (Object.keys(param).length === 0) {
    delete output[group][resourceId];
  } else {
    output[group][resourceId] = { ...output[group][resourceId], param };
  }

  execution++;
  // This notifies all resources crawlering finish and write json out
  if (execution === hrefList.length) {
    generateJson(JSON.stringify(output));
  }

  done();
};

/**
 *
 * @param {string} content
 */
const generateJson = (content) => {
  fs.writeFile('open-data.json', content, (err) => {
    if (err) return console.log(err);
    console.log('open-data.json was generated!!');
  });
};

// Collect all params corresponding to the resource_id
const cRep = new Crawler({
  callback: crawleResource,
});

/**
 *
 * @param {Error} error
 * @param {Crawler.CrawlerRequestResponse} res
 * @param {() => void} done
 * @returns
 */
const crawleGroup = (error, res, done) => {
  if (error) {
    console.log(error);
    done();
    return;
  }
  // Pick all href associated with resource_id
  const group = res.request.uri.path.split('/')[2];
  output[group] = {};

  const reg = new RegExp(`\/dataset\/${group}\/resource\/`);

  for (const el of Object.values(res.$('a'))) {
    const href = el.attribs?.href;
    if (href && reg.test(href) && hrefList.indexOf(href) === -1) {
      hrefList.push(href);
      const resourceId = href.split('/')[4];
      output[group][resourceId] = { title: el.attribs?.title };
    }
  }

  for (const href of hrefList) cRep.queue(`${host}${href}`);

  done();
};

const c = new Crawler({
  callback: crawleGroup,
});

// Crawle each group such as economics, health and traffic,,,
groupList.forEach((path) => {
  c.queue({ uri: `${host}${fixedPath}${path}` });
});
