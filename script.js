var doc = document;

var initTextarea = doc.querySelector( '#init' );
var uploadInput = doc.querySelector('#upload');
var resultTextarea = doc.querySelector( '#result' );
var resultCssTextarea = doc.querySelector( '#result-css' );
var resultDemo = doc.querySelector( '#demo' );
var demoWrapper = doc.querySelector( '.demo-wrapper' );
var contrastButtons = doc.querySelectorAll( '.contrast-button' );
var contrastButtonCurrent = null;
var backgroundColor = '';

var expanders = doc.querySelectorAll( '.expander' );
var expandedClass = 'expanded';
var demoContrastClass = 'demo-contrast-on';
var symbols = /[\r\n%#()<>?\[\\\]^`{|}]/g;

const quotesInputs = document.querySelectorAll('.options__input');
let externalQuotesValue = document.querySelector('.options__input:checked').value;
let quotes = getQuotes();

const buttonExample = document.querySelector('.button-example');


// File Select Event

uploadInput.onchange = function(event){
    console.log(event)
    getFile = uploadInput;
    if(getFile.files.length != 0) {
        var reader = new FileReader();
        reader.onload = function(e) {
            resultTextarea.value = 'data:image/svg+xml,' + encodeSVG(e.target.result);
        }
        reader.readAsText(getFile.files[0], "ISO-8859-1");
    }
}



function getResults() {
    if(!initTextarea.value) {
        resultCssTextarea.value = '';
        resultDemo.setAttribute( 'style', '' );
        return;
    }

    var namespaced = addNameSpace( initTextarea.value );
    var escaped = encodeSVG( namespaced );
    resultTextarea.value = 'data:image/svg+xml, ' + escaped;
    var resultCss = `background-image: url(${quotes.level1}data:image/svg+xml,${escaped}${quotes.level1});`;
    resultCssTextarea.value = resultCss;
    resultDemo.setAttribute( 'style', resultCss );
}



// Namespace
//----------------------------------------

function addNameSpace( data ) {
    if ( data.indexOf( 'http://www.w3.org/2000/svg' ) < 0 ) {
        data = data.replace( /<svg/g, `<svg xmlns=${quotes.level2}http://www.w3.org/2000/svg${quotes.level2}` );
    }

    return data;
}


// Encoding
//----------------------------------------

function encodeSVG( data ) {
    // Use single quotes instead of double to avoid encoding.
    if ( externalQuotesValue === 'double') {
        data = data.replace( /"/g, '\'' );
    }
    else {
       data = data.replace( /'/g, '"' );
    }

    data = data.replace( />\s{1,}</g, "><" );
    data = data.replace( /\s{2,}/g, " " );

    return data.replace( symbols, encodeURIComponent );
}


// Get quotes for levels
//----------------------------------------

function getQuotes() {
    const double = `"`;
    const single = `'`;

    return {
        level1: externalQuotesValue === 'double' ? double : single,
        level2: externalQuotesValue === 'double' ? single : double
    };
}

// Common
//----------------------------------------

function out( data ) {
    console.log( data );
}
