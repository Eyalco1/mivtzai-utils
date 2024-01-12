function encodeImage(src, dest) {
    var f = File(src);
    f.encoding = 'BINARY';
    f.open('e');

    var binary;
    binary = f.read().toSource();

    var myFile = new File(dest);
    myFile.open('w');
    myFile.encoding = 'UTF-8';
    myFile.write(binary.replace('(new String(', '').replace('))', ''));
    myFile.close();

    $.writeln(binary);

    f.close();
    return binary;
}

encodeImage(
    'W:/Personal Projects/Caspion/UI/Export.png',
    'C:/Users/eyalc/OneDrive/Desktop/Binary.txt'
);
