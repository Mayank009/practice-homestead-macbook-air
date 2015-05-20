// This is a sample mocked DB where I am
// storing translations for each word.
var sampledb = {
	'this': 'this',
	'is': 'is',
	'a': 'a',
	'german': 'bavarian',
	'sentence': 'sentence'
};

// this function mocks the fetching of translated word from db
function getFromDB(word, callback) {
	// because the db calls are async in real situation,
	// we will mock that using setTimeout function with
	// random intervals
	setTimeout(function() {

		// mocking of actual db call
		var translated = sampledb[word.toLowerCase()];

		// calling the callback
		callback(translated);
	
	// making the delay random between 0 and 1000 ms (because actual db will have random delays)
	}, Math.floor(Math.random() * 1000));

}

// This function takes the following arguments:
// 1. splitted: the source array
// 2. translated: the target array
// 3. index: the index of element which needs to be translated
// 4. callback: what to do for each translated word
function translateWord(splitted, translated, index, callback) {
	// We can call the method to get translated word from the db.
	// Since this is an async call, we will pass the callback, that
	// will put the translated word at the correct index.
	getFromDB(splitted[index], function(translatedWord) {
		translated[index] = translatedWord;

		// calling the callback that was passed for each translated word
		callback(translated);
	});
}

// This function takes the sentence to be translated and the callback.
// It translates the sentence and runs the callback on it when done.
function translate(source, callback) {
		// we split the sentence into array
	var splitted = source.split(' '),
		
		// we initialize translated array as blank
		translated = [],

		// because, the db layer is async, we will need to keep track,
		// how many words of the splitted array are still left to be
		// translated. We will initialize it with the length of splitted
		// array to start with.
		wordsLeftToBeTranslated = splitted.length;

	// we will loop over the splitted array
	for(index = 0; index < splitted.length; index++) {

		// and pass these arguments in the translateWord function:
		// 1. the source array (splitted)
		// 2. the target array (translated)
		// 3. the index of the element to be translated (index)
		// 4. callback which will be called after translating
		// 	  each word and pushing it into translated array at
		// 	  the right index
		translateWord(splitted, translated, index, function(translated) {
			// each time this callback is called, we will decrement
			// the words left to be translated. And when the count
			// reaches zero, it would mean that the whole sentence
			// was translated successfully.
			if(--wordsLeftToBeTranslated === 0) {

				// when all the elements are translated, we will call
				// the callback with the translated string (which we will
				// obtain by joining all the elements)
				callback(translated.join(' '));
			}
		});
	}
}

// START: We call the `translate` method with the sentence we want to convert
// and the callback that should be run on the translated sentence.
translate('This is a german sentence', function(translated) {
	console.log('Here\'s the translated string: ', translated);
});