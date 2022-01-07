const arabic = {}

const english = {}

export default function translator(lang){
    switch(lang){
        case "en":
            return english;
        case "ar":
            return arabic
    }
}