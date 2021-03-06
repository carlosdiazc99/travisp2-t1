'use stric'

let cheerio = require('cheerio');

module.exports = rdf => {
  let $= cheerio.load(rdf);
	let book = {};

  book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/','');
	book.title = $('dcterms\\:title').text();
  book.authors = $('pgterms\\:agent pgterms\\:name')
	  .toArray().map(elem => $(elem).text());

  book.subjects = $('[rdf\\:resource$="/LCSH"]')
	  .parent().find('rdf\\:value')
		.toArray().map(elem => $(elem).text());

  book.lcc = $('[rdf\\:resource$="/LCC"]')
	  .parent().find('rdf\\:value').text();

	return book;
};
