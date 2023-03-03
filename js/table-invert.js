let taInput = document.getElementById('ta-input')
let taOutput = document.getElementById('ta-output')

function invert() {
    let text = taInput.value;
    let lines = text.split('\n');
    if(!verifyTabular(lines[0], lines[lines.length])) {
        alert('The provided String doesn\'t seem to contain a singular and complete tabular-environment.');
    }
    for (var i = 1; i < lines.length - 1; i++) {
        if (lines[i].includes('\\hline')) {
            continue;
        } else {
            lines[i] = reverseElements(lines[i]);
        }
    }
    let newText = lines.join("\r\n");
    taOutput.value = newText;
}

function verifyTabular(firstLine, lastLine) {
    const firstLineRegex = new RegExp('^\\begin\{tabular\}');
    const lastLineRegex = new RegExp('^\\end\{tabular\}$');

    return !firstLineRegex.test(firstLine) || !lastLineRegex.test(lastLine);
}

function reverseElements(line) {
    // check how many leading spaces
    let spaces = 0;
    while (line.charAt(spaces) === ' ') {
        spaces++;
    }
    line = line.substr(spaces)
    let end = 0;
    while (line.charAt(line.length - end) == " " || line.charAt(line.length - end) == "\\") {
        end++;
        if (line.charAt(line.length - (end - 1)) == "\\") {
            break;
        }
    }
    elements = line.split('&');
    elementsReversed = elements.reverse();
    elementsReversed[0].substr(1);
    elementsReversed[elementsReversed.length] = ' ' + elementsReversed[elementsReversed.length];
    line.substr(0, line.length-end)
    return ' '.repeat(spaces) + elementsReversed.join('&') + '\\';
}