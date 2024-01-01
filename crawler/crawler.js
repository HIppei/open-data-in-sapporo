import Crawler from 'crawler';
import fs from 'fs';

const output = {};
const host = 'https://ckan.pf-sapporo.jp';

const groupList = [];
const typeList = [];
const resourceList = [];

let tExecution = 0;
let rExecution = 0;
let pExecution = 0;

/**
 *
 * @param {Error} error
 * @param {Crawler.CrawlerRequestResponse} res
 * @param {() => void} done
 * @returns
 */
const crawleParams = (error, res, done) => {
  pExecution++;

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

  // This notifies all resources crawlering finish and write json out
  if (
    groupList.length === tExecution &&
    typeList.length === rExecution &&
    resourceList.length === pExecution
  ) {
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
const cParams = new Crawler({
  callback: crawleParams,
});

/**
 *
 * @param {Error} error
 * @param {Crawler.CrawlerRequestResponse} res
 * @param {() => void} done
 * @returns
 */
const crawleResource = (error, res, done) => {
  rExecution++;

  if (error) {
    console.log(error);
    done();
    return;
  }
  // Pick all href associated with resource_id
  const group = res.request.uri.path.split('/')[2];
  output[group] = {};

  const reg = new RegExp(`/dataset/${group}/resource/`);

  for (const el of Object.values(res.$('a'))) {
    const href = el.attribs?.href;
    if (href && reg.test(href) && resourceList.indexOf(href) === -1) {
      resourceList.push(href);
      const resourceId = href.split('/')[4];
      output[group][resourceId] = { title: el.attribs?.title };
      cParams.queue(`${host}${href}`);
    }
  }

  done();
};

const cResource = new Crawler({
  callback: crawleResource,
});

/**
 *
 * @param {Error} error
 * @param {Crawler.CrawlerRequestResponse} res
 * @param {() => void} done
 * @returns
 */
const crawleType = (error, res, done) => {
  tExecution++;

  if (error) {
    console.log(error);
    done();
    return;
  }
  const $ = res.$;
  const typeHrefs = $('h2.dataset-heading');

  typeHrefs.find('a').each((_i, el) => {
    const href = el.attribs?.href;
    if (!href || typeList.indexOf(href) > 0) return;
    typeList.push(href);
    cResource.queue(`${host}${href}`);
  });

  done();
};

const cType = new Crawler({
  callback: crawleType,
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

  const $ = res.$;
  const groupHrefs = $('a');

  const reg = /group/;

  for (const el of Object.values(groupHrefs)) {
    const href = el.attribs?.href;
    if (!href || !reg.test(href) || groupList.indexOf(href) > 0) continue;
    groupList.push(href);
    cType.queue(href);
  }

  done();
};

const cGroup = new Crawler({ callback: crawleGroup });

cGroup.queue({ uri: 'https://data.pf-sapporo.jp/' });

export {};
