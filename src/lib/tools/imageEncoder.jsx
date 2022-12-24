function encodeImage(src, dest) {
    var f = File(src);
    f.encoding = 'BINARY';
    f.open('e');

    var binary;
    binary = f.read().toSource();

    var myFile = new File(dest);
    myFile.open('w');
    myFile.encoding = 'UTF-8';
    myFile.write(binary);
    myFile.close();

    $.writeln(binary);

    f.close();
    return binary
}

encodeImage(
    'C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/Logos/IDF_Logo.png',
    'C:/Users/eyalc/OneDrive/Desktop/Binary.txt'
);
