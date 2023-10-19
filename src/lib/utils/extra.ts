const containsHebrew = (str: string): boolean => /[\u0590-\u05FF]/.test(str);

const containsArabic = (str: string): boolean =>
    /[\u0600-\u06FF\u0750-\u077F]/.test(str);

const getFontFromLanguage = (lang: Lingo) => {
    if (lang === 'English') {
        return 'TradeGothicLT-BoldCondTwenty';
    } else if (lang === 'Hebrew') {
        return 'NarkisBlockCondensedMF-Bold';
    } else if (lang === 'Arabic') {
        return 'DroidArabicKufi-Bold';
    }
};

const getFontFromName = (name: CaspionFont) => {
    if (name === 'Trade Gothic') {
        return 'TradeGothicLT-BoldCondTwenty';
    } else if (name === 'Narkis') {
        return 'NarkisBlockCondensedMF-Bold';
    } else if (name === 'Almoni') {
        return 'AlmoniNeueDL4.0AAA-Bold';
    } else if (name === 'Droid') {
        return 'DroidArabicKufi-Bold';
    } else if (name === 'Janna') {
        return 'JannaLT-Bold';
    }
};

const detectLanguage = (
    input: string
): 'Hebrew' | 'Arabic' | 'English' | null => {
    // Regular expressions for Hebrew, English, and Arabic
    const hebrewRegExp = /[\u0590-\u05FF]/;
    const englishRegExp = /[A-Za-z]/;
    const arabicRegExp = /[\u0600-\u06FF]/;

    if (hebrewRegExp.test(input)) {
        return 'Hebrew';
    } else if (englishRegExp.test(input)) {
        return 'English';
    } else if (arabicRegExp.test(input)) {
        return 'Arabic';
    } else {
        return null;
    }
};
