Experigen.initialize = function () {

    var items = this.resource("items")
    var words = []
    var result = []
    var right_answer = []
	var original = []
	var number = []

    function shuffleArray(array) {
        // https://stackoverflow.com/a/12646864/217088
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
	
    items = items.slice(0);
    shuffleArray(items);
    items = items.slice(0, 10);
	
    for(var i = 0, count = 0; i < items.length; i++, count++) {
        //items[i].text = items[i].id + ". " + items[i].text
		words.push(items[i].text.split(/\s*[ ]+\s*/))
        result.push("Введите первое слово")
		original.push(items[i].text)
		right_answer.push(words[count][0])
        number.push(1)
		
		result.push(words[count][0])
        for (var j = 1; j < words[count].length - 1; j++) {
            right_answer.push(words[count][j])
			number.push(j + 1)
			original.push(items[i].text)
			var new_result = result[result.length - 1] + " " + words[count][j]
            result.push(new_result)
        }
		original.push(items[i].text)
		number.push(words[count].length)
        right_answer.push(words[count][words[count].length - 1])
    }

    var block1 = [].concat(result)
			.pairWith("item", result)
            .pairWith("right_answer", right_answer)
            .pairWith("original", original)
            .pairWith("number", number)
			.pairWith("view","stimulus.ejs")
			;

	this.addStaticScreen("intro.ejs")
	this.addStaticScreen("agreement.ejs")
	this.addBlock(block1);
	this.addStaticScreen("finalthanks.ejs")
}
