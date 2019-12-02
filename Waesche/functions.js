
module.exports = {
    umlautCheck: function(str){
        str = str.replace("ä", "%C3%A4")
        str = str.replace("ö", "%C3%B6")
        str = str.replace("ü", "%C3%BC")
        str = str.replace("Ä", "%C3%84")
        str = str.replace("Ö", "%C3%96")
        str = str.replace("Ü", "%C3%9C")
        str = str.replace("ß", "%C3%9F")
        console.log(str)
        return str
    }
}